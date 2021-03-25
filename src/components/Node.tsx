import { makeStyles, Theme } from '@material-ui/core';
import React, { RefObject } from 'react';
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

  const handleMouseDown = () => {
    props.handleMouseDown(props.i, props.j)
  }

  const handleMouseEnter = () => {
    props.handleMouseEnter(props.i, props.j)
  }

  const handleMouseUp = () => {
    props.handleMouseUp(props.i, props.j)
  }

  return (
    <div
      className={`${classes.item} ${props.vertex.nodeType === NodeType.Wall ? classes.wall : ''}`}
      ref={props.nodeRef}
      title={`${props.i}, ${props.j}`}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
    />
  )
}

export default Node
