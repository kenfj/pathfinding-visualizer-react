import { Button, makeStyles, Theme } from '@material-ui/core';
import React, { createRef, RefObject, useEffect, useState } from 'react';
import { backtrackToStart, Dijkstra } from '../algorithms/Dijkstra';
import { NodeType } from '../algorithms/NodeType';
import { Vertex } from '../algorithms/Vertex';
import useMouseEventHandlers from '../hooks/useMouseEventHandlers';
import { Coordinates } from './Coordinates';
import Node from './Node';

const useStyles = makeStyles<Theme, Props>((theme) => ({
  container: props => ({
    display: 'grid',
    gridTemplateRows: `repeat(${props.nRows}, 20px)`,
    gridTemplateColumns: `repeat(${props.nCols}, 20px)`,
    justifyContent: 'center',
    margin: '50px auto',
  }),
  visited: {
    backgroundColor: 'lightgreen'
  },
  shortestPath: {
    backgroundColor: 'yellow'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: '10px auto',
  },
}));

const initialStartEnd = (p: Props): Coordinates[] => {
  return [
    { i: Math.trunc(p.nRows / 2), j: Math.trunc(p.nCols / 5) },
    { i: Math.trunc(p.nRows / 2), j: Math.trunc(p.nCols * 4 / 5) - 1 }
  ]
}

const initialNodeType = (i: number, j: number, start: Coordinates, end: Coordinates) => {
  return (
    i === start.i && j === start.j ? NodeType.Start :
      i === end.i && j === end.j ? NodeType.End :
        NodeType.Default
  )
}

type Props = {
  nRows: number
  nCols: number
}

function PathfindingVisualizer(props: Props) {
  const classes = useStyles(props);

  const startEnd = initialStartEnd(props)
  const [start, setStart] = useState<Coordinates>(startEnd[0]);
  const [end, setEnd] = useState<Coordinates>(startEnd[1]);

  const initialRefs =
    Array.from({ length: props.nRows }, _ =>
      Array.from({ length: props.nCols }, _ =>
        createRef<HTMLDivElement>()
      )
    )
  const [refs] = useState<RefObject<HTMLDivElement>[][]>(initialRefs);

  const initialGrid =
    Array.from({ length: props.nRows }, (_, i) =>
      Array.from({ length: props.nCols }, (_, j) => {
        const nodeType = initialNodeType(i, j, start, end)
        return new Vertex(i, j, nodeType)
      })
    )
  const [grid, setGrid] = useState<Vertex[][]>(initialGrid);

  const resetGrid = () => {
    refs.forEach((row, i) =>
      row.forEach((ref, j) => {
        grid[i][j].reset()
        ref.current?.classList.remove(classes.visited, classes.shortestPath)
      })
    )
  }

  const resetWall = (probWall: number) => {
    refs.forEach((row, i) =>
      row.forEach((ref, j) => {
        if (grid[i][j].isStartOrEnd()) return

        if (Math.random() < probWall) {
          grid[i][j].setWall()
        } else {
          grid[i][j].clearWall()
        }
      })
    )

    resetGrid()
    setStart({ i: start.i, j: start.j }) // force re-render
  }

  useEffect(() => {
    resetWall(0.35)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlers = useMouseEventHandlers(grid, start, end, setGrid, setStart, setEnd, resetGrid)

  const visualize = () => {
    resetGrid()

    const startNode = grid[start.i][start.j]
    const endNode = grid[end.i][end.j]
    const visitedNodes = Dijkstra(grid, startNode, endNode);
    const shortestPath = backtrackToStart(endNode);

    animate(visitedNodes, shortestPath);
  }

  const animate = (visitedNodes: Vertex[], shortestPath: Vertex[]) => {
    for (let i = 1; i < visitedNodes.length - 1; i++) {
      setTimeout(() => {
        const node = visitedNodes[i];
        const ref = refs[node.i][node.j].current!
        ref.classList.add(classes.visited)
      }, 10 * i);

      if (i === visitedNodes.length - 2) {
        setTimeout(() => {
          animateShortestPath(shortestPath);
        }, 10 * i);
        return;
      }
    }
  }

  const animateShortestPath = (shortestPath: Vertex[]) => {
    for (let i = 1; i < shortestPath.length - 1; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        const ref = refs[node.i][node.j].current!
        ref.classList.add(classes.shortestPath)
      }, 50 * i);
    }
  }

  return (
    <>
      <div className={classes.buttons}>
        <Button variant="contained" style={{ textTransform: 'none' }} onClick={() => resetWall(0.35)}>
          Random Wall
        </Button>
        <Button variant="contained" style={{ textTransform: 'none' }} onClick={() => resetWall(0)}>
          Clear Wall
        </Button>
      </div>
      <Button variant="contained" style={{ textTransform: 'none' }} onClick={visualize}>
        Visualize Dijkstra's Algorithm
      </Button>
      <div className={classes.container}>
        {
          refs.map((row, i) =>
            row.map((node, j) =>
              <Node
                i={i} j={j}
                key={`node-${i}-${j}`}
                nodeRef={node}
                vertex={grid[i][j]}
                handleMouseDown={handlers.handleMouseDown}
                handleMouseEnter={handlers.handleMouseEnter}
                handleMouseUp={handlers.handleMouseUp}
              />
            )
          )
        }
      </div>
    </>
  )
}

export default PathfindingVisualizer
