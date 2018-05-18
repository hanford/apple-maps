import { Fragment, PureComponent } from 'react'
import Link from 'next/link'
import styled from 'react-emotion'

import Container from '../components/container'
import Head from '../components/head'

export default class Index extends PureComponent {
  render () {
    return (
      <Fragment>
        <Head />
        <Body />

        <Container />
      </Fragment>
    )
  }
}

const Body = styled('div')`
  background-image: url(static/map.png);
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  position: fixed;
`
