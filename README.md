# Dummy API Server

Dummy API Server is an API mocking server with UI console to manage your mock APIs. It helps you develop and test your front-end application without having to rely on the backend services.

![Dummy API Server console](https://user-images.githubusercontent.com/6456051/102369949-7e196e80-3ff7-11eb-978c-2993b66ee6d6.png)

- [Dummy API Server](#dummy-api-server)
  - [Environment](#environment)
  - [Run](#run)
    - [Server](#server)
    - [Web](#web)
  - [Dummy API](#dummy-api)
    - [Create an API](#create-an-api)
      - [API Path with URL Parameters](#api-path-with-url-parameters)
      - [API Path with Query Parameters](#api-path-with-query-parameters)
      - [Adding delays](#adding-delays)
    - [Select API responses](#select-api-responses)
    - [Disable an API](#disable-an-api)
  - [Routing Strategy](#routing-strategy)
  - [Database Schema](#database-schema)
    - [Database](#database)
    - [Config](#config)
    - [API](#api)
    - [Response](#response)

## Environment

- node 10.16.0

## Run

### Server

```sh
cd dummy-api-server/server
yarn # first time running the server
yarn start
```

Dummy API Server will default run on http://localhost:8888 and use `dummy-api-server/db/db.json` as the default database.

Use variables to configure the port and database.
```sh
PORT=8080 DB=../db/db2.json yarn start
```

Set DEBUG scope to display debug logs.
```sh
DEBUG=ds* yarn start
```

### Web

Dummy API Server will serve the built web files so you won't have to run any command inside the web folder.

For Dummy API Server web development, run the commands below and it will run a webpack-dev-server at http://localhost:3000.
```sh
cd dummy-api-server/web
yarn # first time running the web dev server
yarn start
```

## Dummy API

You can open http://locahost:8888 to manage your APIs on the Dummy API web page.

### Create an API

Click the "Add API" button on the bottom-right of the web console, choose a method, fill the path and create at least one response to create a new API. Note that you should avoid creating APIs with `/_ds` as the path prefix. It is reserved for the management APIs of the Dummy API Server.

#### API Path with URL Parameters

The Dummy API Server uses [url-pattern](https://github.com/snd/url-pattern) to match patterns so you could create an API path with URL parameters e.g. `/api/users/:userId`. Note that every API should have unique patterns of paths. If an API `/api/:a` exists, you cannot create APIs like `/api/:b`, the server will regard it as conflict.

If an API has path: `/api/users/:userId`
- `/api/users/1` (matched)
- `/api/users/any` (matched)
- `/api/users/1/` (unmatched)
- `/api/users` (unmatched)
- `/api/users/1/permission` (unmatched)

#### API Path with Query Parameters

The API can accept any query parameters if no query parameters are defined on its path. If you want to matching an API only if the request URL has one or more specific query parameters, you can defined them on its API path.

Loose query parameter is defined without a value. The API path `/api/users?page` will be matched when you request the dummy server with URLs that contain a `page` parameter with a value. For example:
- `/api/users?page=1` (matched)
- `/api/users?page=1&size=10` (matched)
- `/api/users?size=10` (unmatched)

Strict query parameter is defined with a value. The API path `/api/users?page=10` will be matched when you call the dummy server with URLs that contain a `page=10` parameter. For example:
- `/api/users?page=10` (matched)
- `/api/users?page=1` (unmatched)

#### Adding delays

You can add delay for all APIs by clicking the top-right config button and set global delay, or set the delay on API editor for each API. It will override the global value if it is set > 0.

### Select API responses

If you create an API with multiple responses, you can select one of them as the "current response" on the response dropdown. If the API matches, the dummy server returns the selected response.

### Disable an API

Click the eye icon on the actions of an API. It toggles the visibility of the API.

## Routing Strategy

If multiple dummy APIs match the request URL, it will use a "strict first" routing strategy to sort the APIs
1. Less URL parameters
2. More strict query parameters
3. More loose query parameters

For example: A request with URL `/api/10/3?page=1` matches these four dummy API paths
1. (1) `/api/:schoolId/:classId`
2. (2) `/api/10/:classId?page`
3. (3) `/api/:schoolId/:classId?page=1`
4. (4) `/api/:schoolId/:classId?page`

With "strict first" routing strategy, it will be ordered to:
1. (2) `/api/10/:classId?page`
1. (3) `/api/:schoolId/:classId?page=1`
1. (4) `/api/:schoolId/:classId?page`
1. (1) `/api/:schoolId/:classId`

And finally returns the response of (2) API.

## Database Schema

Dummy API Server use lowdb which is a light weight database. All of your data will be saved in a json file inside the `db` folder.

### Database

|Key|Type|Default|Description|
|---|---|---|---|
|config|Config||Dummy API config|
|apis|API[]|[]|Dummy API list|

### Config
|Key|Type|Default|Description|
|---|---|---|---|
|name|string||The filename of the db JSON|
|delay|number|0|Milliseconds delay added to all APIs|

### API

|Key|Type|Default|Description|
|---|---|---|---|
|id|string||An unique ID of the API|
|method|string, one of: `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`||HTTP method|
|path|string||Path of the API. Use `url-pattern` to match patterns|
|normalizedPath|string||Normalize the url parameters of the path|
|description|string||Some description of the API|
|responses|Response[]|[]|Possible responses that can be selected|
|currentResponseID|string|null|Current response that server returns when API is called|
|disabled|bool|false|Is this API disabled or not. If a disabled API is called, server will response 404|
|delay|number|0|Milliseconds delay added to API. Will override the global delay|

Example:
```json
{
  "id": "23TplPdS",
  "method": "GET",
  "path": "/user/:userId?page",
  "normalizedPath": "/user/:0?page",
  "description": "Get an user by its ID",
  "responses": [],
  "currentResponseID": null,
  "disabled": false,
  "delay": 0
}
```

### Response

|Key|Type|Default|Description|
|---|---|---|---|
|id|string||An unique ID of the response|
|name|string||A string to display on the selector|
|status|number, one of valid http statuses||HTTP status code of this response|
|body|string, number, object||JSON body of the response|

Example:
```json
{
  "id": "7oet_d9Z",
  "name": "user: skyduck",
  "status": 200,
  "body": {
    "username": "skyduck",
    "email": "skyduck0205@gmail.com"
  }
}
```
