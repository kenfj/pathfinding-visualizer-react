import { makeStyles, Theme } from '@material-ui/core';
import React, { RefObject } from 'react';

const useStyles = makeStyles<Theme, Props>((theme) => ({
  item: props => ({
    border: "1px solid lightgray",
    gridRow: `${props.i + 1}`,
    gridCol: `${props.j + 1}`,
  }),
}));

type Props = {
  i: number
  j: number
  nodeRef: RefObject<HTMLDivElement>
}

function Node(props: Props) {
  const classes = useStyles(props);

  return (
    <div
      className={classes.item}
      ref={props.nodeRef}
      title={`${props.i}, ${props.j}`}
    />
  )
}

export default Node
