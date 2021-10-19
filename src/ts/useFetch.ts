import { useEffect, useState } from 'react'

export interface IUseFetchPending {
  data: false
  error: false
}

export interface IUseFetchSuccess<T> {
  data: T
  error: false
}

export interface IUseFetchFailure<E extends Error = Error> {
  data: false
  error: E
}

export type UseFetchResult<T, E extends Error = Error> = IUseFetchPending | IUseFetchSuccess<T> | IUseFetchFailure

export function useFetch<T, E extends Error = Error>(input: RequestInfo, init?: RequestInit): UseFetchResult<T, E> {
  const [result, setResult] = useState<UseFetchResult<T, E>>({
    data: false,
    error: false,
  })
  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(input, init)
        if (response.ok) {
          setResult({
            data: await response.json(),
            error: false,
          })
        } else {
          const err = new Error(`fetch failed with status ${response.status}`)
          console.error(err)
          setResult({
            data: false,
            error: err,
          })
        }
      } catch (err: unknown) {
        console.error(err)
        setResult({
          data: false,
          error: err instanceof Error ? err : new Error(String(err)),
        })
      }
    })()
  }, [input])
  return result
}
