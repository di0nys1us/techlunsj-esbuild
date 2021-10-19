import React, { VFC } from 'react'
import styled from 'styled-components'
import { Ads } from './Ads'

export const App: VFC = () => (
  <main>
    <Heading>Hello, esbuild!</Heading>
    <p>This is awesome!</p>
    <Ads />
  </main>
)

const Heading = styled.h1`
  color: #fff;
  background-color: #343;
  padding: 10px 20px;
`
