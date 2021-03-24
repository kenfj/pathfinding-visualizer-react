import { makeStyles, Theme } from '@material-ui/core';
import React, { createRef, RefObject, useState } from 'react';
import Node from './Node';

const useStyles = makeStyles<Theme, Props>((theme) => ({
  container: props => ({
    display: 'grid',
    gridTemplateRows: `repeat(${props.nRows}, 20px)`,
    gridTemplateColumns: `repeat(${props.nCols}, 20px)`,
    justifyContent: 'center',
    margin: '50px auto',
  }),
}));

type Props = {
  nRows: number
  nCols: number
}

function PathfindingVisualizer(props: Props) {
  const classes = useStyles(props);

  const refs =
    Array.from({ length: props.nRows }, _ =>
      Array.from({ length: props.nCols }, _ =>
        createRef<HTMLDivElement>()
      )
    )
  const [grid] = useState<RefObject<HTMLDivElement>[][]>(refs);

  return (
    <div className={classes.container}>
      {
        grid.map((row, i) =>
          row.map((node, j) =>
            <Node
              i={i} j={j}
              key={`node-${i}-${j}`}
              nodeRef={node}
            />
          )
        )
      }
    </div>
  )
}

export default PathfindingVisualizer
