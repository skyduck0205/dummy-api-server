# Dummy API Server

- [Dummy API Server](#dummy-api-server)
  - [Environment](#environment)
  - [Run](#run)
    - [Server](#server)
    - [Web](#web)
  - [Dummy API](#dummy-api)
  - [Database Schema](#database-schema)
    - [Database](#database)
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

(Documentation WIP)

## Database Schema

Dummy API Server use lowdb which is a light weight database. All of your data will be saved in a json file inside the `db` folder.

### Database

|Key|Type|Default|Description|
|---|---|---|---|
|apis|API[]|[]|Dummy API list|

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
  "disabled": false
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
