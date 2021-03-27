import { Button, makeStyles, Theme } from '@material-ui/core';
import React, { createRef, RefObject, useState } from 'react';
import { backtrackToStart, Dijkstra } from '../algorithms/Dijkstra';
import { NodeType } from '../algorithms/NodeType';
import { Vertex } from '../algorithms/Vertex';
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
}));

type Coordinates = { i: number, j: number }

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

  const [isMousePressed, setIsMousePressed] = useState<boolean>(false);
  const [isDraggingStart, setIsDraggingStart] = useState<boolean>(false);
  const [isDraggingEnd, setIsDraggingEnd] = useState<boolean>(false);
  const [isUpdatingToWall, setIsUpdatingToWall] = useState<boolean>(false);

  const updateStart = (i: number, j: number) => {
    if (grid[i][j].nodeType === NodeType.End) return

    const newGrid = grid.slice()

    newGrid[start.i][start.j] = new Vertex(start.i, start.j, NodeType.Default)
    newGrid[i][j] = new Vertex(i, j, NodeType.Start)

    setGrid(newGrid)
    setStart({ i, j })
  }

  const updateEnd = (i: number, j: number) => {
    if (grid[i][j].nodeType === NodeType.Start) return

    const newGrid = grid.slice()

    newGrid[end.i][end.j] = new Vertex(end.i, end.j, NodeType.Default)
    newGrid[i][j] = new Vertex(i, j, NodeType.End)

    setGrid(newGrid)
    setEnd({ i, j })
  }

  const updateWall = (i: number, j: number) => {
    if (isStartOrEnd(i, j)) return

    const newType = isUpdatingToWall ? NodeType.Wall : NodeType.Default
    const newNode = new Vertex(i, j, newType)

    const newGrid = grid.slice()
    newGrid[i][j] = newNode

    setGrid(newGrid)
  }

  const isStartOrEnd = (i: number, j: number) => {
    const currentType = grid[i][j].nodeType
    return (currentType === NodeType.Start || currentType === NodeType.End)
  }

  const handleMouseDown = (i: number, j: number) => {
    setIsMousePressed(true)

    if (grid[i][j].nodeType === NodeType.Start) {
      setIsDraggingStart(true)
    } else if (grid[i][j].nodeType === NodeType.End) {
      setIsDraggingEnd(true)
    } else {
      updateWall(i, j)
    }
  }

  const handleMouseEnter = (i: number, j: number) => {
    setIsUpdatingToWall(grid[i][j].nodeType !== NodeType.Wall)
    if (!isMousePressed) return

    if (isDraggingStart) {
      updateStart(i, j)
    } else if (isDraggingEnd) {
      updateEnd(i, j)
    } else {
      updateWall(i, j)
    }
  }

  const handleMouseUp = (i: number, j: number) => {
    setIsMousePressed(false)

    if (isDraggingStart || isDraggingEnd)
      clear()

    setIsDraggingStart(false)
    setIsDraggingEnd(false)
    setIsUpdatingToWall(grid[i][j].nodeType !== NodeType.Wall)
  }

  const clear = () => {
    refs.forEach((row, i) =>
      row.forEach((ref, j) => {
        grid[i][j].reset()
        ref.current?.classList.remove(classes.visited, classes.shortestPath)
      })
    )
  }

  const visualize = () => {
    clear()

    const startNode = grid[start.i][start.j]
    const endNode = grid[end.i][end.j]
    const visitedNodes = Dijkstra(grid, startNode, endNode);
    const shortestPath = backtrackToStart(endNode);

    animate(visitedNodes!, shortestPath);
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
                handleMouseDown={handleMouseDown}
                handleMouseEnter={handleMouseEnter}
                handleMouseUp={handleMouseUp}
              />
            )
          )
        }
      </div>
    </>
  )
}

export default PathfindingVisualizer
