import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import { Motion, spring, presets } from 'react-motion'

export default class extends PureComponent {
  state = {
    begin: 0,
    position: 0
  }

  componentDidMount () {
    this.setState({ max: -(window.innerHeight / 5 * 3.5) })
  }

  tap = event => {
    // override drag image on desktop
    if (event.type === 'dragstart') {
      let img = new Image()
      img.src = ''
      event.dataTransfer.setDragImage(img, 0, 0)
    }

    const { y } = getCoordinates(event)

    this.setState({ begin: y })
  }

  drag = event => {
    const { begin, position, max } = this.state
    const { y } = getCoordinates(event)

    const newPosition = position + (y - begin)

    if (max < newPosition && newPosition < 50) {
      this.setState(() => {
        return {
          begin: y,
          position: newPosition
        }
      })
    }

    event.preventDefault()
    event.stopPropagation()
  }

  release = () => {
    const { position, max } = this.state

    this.setState({ begin: 0, position: (max / 2) > position ? max : 0 })
  }

  render () {
    const list = new Array(500).fill(true)

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
          <Container
            draggable="true"

            onTouchStart={this.tap}
            onTouchMove={this.drag}
            onTouchEnd={this.release}

            onDragStart={this.tap}
            onDrag={this.drag}
            onDragEnd={this.release}
            style={{ transform: `translateY(${translateY}px)`}}
          >
            <List>
              {list.map((_, i) => <div>{i}</div>)}
            </List>
          </Container>
        )}
      </Motion>
    )
  }
}

function getCoordinates (event) {
  if (event.type.includes('drag')) {
    return { x: event.clientX, y: event.clientY };
  }

  const touch = event.targetTouches[0]
  return { x: touch.clientX, y: touch.clientY };
}

const Container = styled('div')`
  background-color: white;
  width: 100%;
  border-radius: 4px;

  position: absolute;
  top: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  height: 100%;
`

const List = styled('div')`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  overflow: hidden;
  width: 100%;
  text-align: center;
`
