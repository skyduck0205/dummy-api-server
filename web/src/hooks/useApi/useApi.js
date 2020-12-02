import { useState, useCallback, useRef } from 'react';

/**
 * Hook for handling api call state.
 * apiFetch is a wrapped API call which changes apiStatus and handles race condition.
 * apiStatus includes loading state, response data, response error.
 * @param {function} api - The async function for handling the actual API call.
 * @param {object} [defaultStatus={}] - A default status to override the initial apiStatus
 * @returns {object} - objects that contains apiFetch, apiStatus
 */
export default function useApi(api, defaultStatus = {}) {
  const [apiStatus, setApiStatus] = useState({
    isLoading: false,
    response: null,
    error: null,
    ...defaultStatus,
  });

  // Id of the last called api
  const lastCallIdRef = useRef(0);

  const apiFetch = useCallback(
    async function _apiFetch(...args) {
      const callId = lastCallIdRef.current + 1;
      lastCallIdRef.current = callId;

      // Set loading state
      setApiStatus((prevState) => {
        return {
          ...prevState,
          isLoading: true,
        };
      });

      try {
        const response = await api(...args);
        // Drop non-latest calls and set response
        if (callId === lastCallIdRef.current) {
          setApiStatus({
            isLoading: false,
            response,
            error: null,
          });
        }
      } catch (error) {
        // Drop non-latest calls and set error
        if (callId === lastCallIdRef.current) {
          setApiStatus({
            isLoading: false,
            response: null,
            error,
          });
        }
      }
    },
    [api]
  );

  return [apiStatus, apiFetch];
}
