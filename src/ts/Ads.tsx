import React, { VFC } from 'react'
import { DateTime } from './DateTime'
import styled from 'styled-components'
import { useFetch } from './useFetch'

export const Ads: VFC = () => {
  const { data, error } = useAds()
  if (error) {
    return <p>{error.message}</p>
  }
  if (!data) {
    return null
  }
  return (
    <>
      <h2>Ads</h2>
      <List>
        {data.content.map((ad) => (
          <li key={ad.uuid}>
            <div>
              <h3>{ad.title}</h3>
              <small>
                <DateTime value={ad.published} dateStyle="medium" timeStyle="short" hour12={false} />
              </small>
            </div>
          </li>
        ))}
      </List>
    </>
  )
}

const List = styled.ul`
  padding: 0;
  list-style: none;

  li > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dashed #222;

    h3 {
      font-size: 1rem;
      margin: 5px 0;
    }
  }
`

const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdWJsaWMudG9rZW4udjFAbmF2Lm5vIiwiYXVkIjoiZmVlZC1hcGktdjEiLCJpc3MiOiJuYXYubm8iLCJpYXQiOjE1NTc0NzM0MjJ9.jNGlLUF9HxoHo5JrQNMkweLj_91bgk97ZebLdfx3_UQ\n'

export function useAds() {
  return useFetch<
    {
      content: Array<{
        uuid: string
        published: string
        title: string
      }>
    },
    Error
  >('https://arbeidsplassen.nav.no/public-feed/api/v1/ads', {
    cache: 'no-cache',
    headers: {
      authorization: `Bearer ${TOKEN}`,
    },
  })
}
