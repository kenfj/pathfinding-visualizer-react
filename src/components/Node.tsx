import { makeStyles, Theme } from '@material-ui/core';
import React, { RefObject, useEffect } from 'react';
import { NodeType } from '../algorithms/NodeType';
import { Vertex } from '../algorithms/Vertex';

const useStyles = makeStyles<Theme, Props>((theme) => ({
  item: props => ({
    border: "1px solid lightgray",
    gridRow: `${props.i + 1}`,
    gridCol: `${props.j + 1}`,
    backgroundColor: `${props.vertex.nodeType === NodeType.Start ? 'green' : props.vertex.nodeType === NodeType.End ? 'red' : ''}`
  }),
  wall: {
    backgroundColor: 'black'
  },
}));

type Props = {
  i: number
  j: number
  nodeRef: RefObject<HTMLDivElement>
  vertex: Vertex
  handleMouseDown: (i: number, j: number) => void
  handleMouseEnter: (i: number, j: number) => void
  handleMouseUp: (i: number, j: number) => void
}

function Node(props: Props) {
  const classes = useStyles(props);

  // How to prevent default handling of touch events?
  // https://stackoverflow.com/questions/49541173
  // Replace passive addEventListener to onTouchStart method
  // https://stackoverflow.com/questions/55903247
  useEffect(() => {
    props.nodeRef.current!.addEventListener(
      "touchstart", handleTouchStart, { passive: false }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMouseDown = () => {
    props.handleMouseDown(props.i, props.j)
  }

  const handleMouseEnter = () => {
    props.handleMouseEnter(props.i, props.j)
  }

  const handleMouseUp = () => {
    props.handleMouseUp(props.i, props.j)
  }

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault()
    props.handleMouseDown(props.i, props.j)
  }

  // onTouchEnter equivalent
  // convert the last touch point to element
  // https://egashira.jp/drag-drop-in-touch-device
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0]
    const x = touch.pageX - window.pageXOffset
    const y = touch.pageY - window.pageYOffset

    var elm = document.elementFromPoint(x, y) as HTMLElement;
    const i = Number(elm.dataset.i)
    const j = Number(elm.dataset.j)

    props.handleMouseEnter(i, j)
  }

  const handleTouchEnd = (_: React.TouchEvent) => {
    props.handleMouseUp(props.i, props.j)
  }

  const classWall = props.vertex.nodeType === NodeType.Wall ? classes.wall : ''

  return (
    <div
      className={`${classes.item} ${classWall}`}
      ref={props.nodeRef}
      data-i={props.i}
      data-j={props.j}
      title={`${props.i}, ${props.j}`}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
      // avoid warning Unable to preventDefault inside passive event listener invocation.
      // onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  )
}

export default Node
