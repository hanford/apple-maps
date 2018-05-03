import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import { Motion, spring, presets } from 'react-motion'

export default class extends PureComponent {
  state = {
    begin: 0,
    position: 0,
    listenersAdded: false,
    ref: null
  }

  componentWillUnmount () {
    const { listenerAdded, ref } = this.state

    if (listenerAdded) {
      ref.removeEventListener('touchstart', this.tap)
      ref.removeEventListener('touchmove', this.drag)
      ref.removeEventListener('touchend', this.release)
    }
  }

  componentDidMount () {
    this.setState({ max: -(window.innerHeight / 5 * 3.5) })
  }

  applyScrollListener = (ref) => {
    const { listenerAdded } = this.state

    if (!ref || !listenerAdded) {
      ref.addEventListener('touchstart', this.tap)
      ref.addEventListener('touchmove', this.drag)
      ref.addEventListener('touchend', this.release)

      this.setState({ listenerAdded: true, ref })
    }
  }

  tap = event => {
    const { pageY } = event.touches[0]

    this.setState({ begin: pageY })
  }

  drag = event => {
    const { begin, position, max } = this.state
    const { pageY } = event.touches[0] || event.touches[0]

    const newPosition = position + (pageY - begin)

    if (max < newPosition && newPosition < 50) {
      this.setState(() => {
        return {
          begin: pageY,
          position: newPosition
        }
      })
    }

    event.stopPropagation()
    event.preventDefault()
  }

  release = (e) => {
    const { position, max } = this.state

    this.setState({ begin: 0, position: (max / 2) > position ? max : 0 })
  }

  render () {
    return (
      <Motion
        defaultStyle={{
          translateY: 500
        }}
        style={{
          translateY: spring(this.state.position, presets.stiff)
        }}
      >
        {({ translateY }) => (
          <Container innerRef={this.applyScrollListener} style={{ transform: `translateY(${translateY}px)`}}>
            <List>
              Yo!
            </List>
          </Container>
        )}
      </Motion>
    )
  }
}

const Container = styled('div')`
  background-color: white;
  width: 100%;
  border-radius: 4px;
  height: 100%;
  position: absolute;
  top: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;

  @supports (-webkit-overflow-scrolling: touch) {
    border-bottom: none;
    -webkit-backdrop-filter: saturate(200%) blur(20px);
    backdrop-filter: saturate(200%) blur(20px);
    background-color: rgba(255, 255, 255, 0.75);
  }
`

const List = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`
