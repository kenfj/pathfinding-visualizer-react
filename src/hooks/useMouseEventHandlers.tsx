import { Dispatch, SetStateAction, useState } from "react";
import { NodeType } from "../algorithms/NodeType";
import { Vertex } from "../algorithms/Vertex";
import { Coordinates } from "../components/Coordinates";

const useMouseEventHandlers = (
  grid: Vertex[][],
  start: Coordinates,
  end: Coordinates,
  setGrid: Dispatch<SetStateAction<Vertex[][]>>,
  setStart: Dispatch<SetStateAction<Coordinates>>,
  setEnd: Dispatch<SetStateAction<Coordinates>>,
  resetGrid: () => void,
) => {
  const [isMousePressed, setIsMousePressed] = useState<boolean>(false);
  const [isDraggingStart, setIsDraggingStart] = useState<boolean>(false);
  const [isDraggingEnd, setIsDraggingEnd] = useState<boolean>(false);
  const [isUpdatingToWall, setIsUpdatingToWall] = useState<boolean>(false);

  const updateStart = (i: number, j: number) => {
    const newGrid = grid.slice()

    newGrid[start.i][start.j] = new Vertex(start.i, start.j)
    newGrid[i][j] = new Vertex(i, j, NodeType.Start)

    setGrid(newGrid)
    setStart({ i, j })
  }

  const updateEnd = (i: number, j: number) => {
    const newGrid = grid.slice()

    newGrid[end.i][end.j] = new Vertex(end.i, end.j)
    newGrid[i][j] = new Vertex(i, j, NodeType.End)

    setGrid(newGrid)
    setEnd({ i, j })
  }

  const updateWall = (i: number, j: number) => {
    const newType = isUpdatingToWall ? NodeType.Wall : NodeType.Default
    const newNode = new Vertex(i, j, newType)

    const newGrid = grid.slice()
    newGrid[i][j] = newNode

    setGrid(newGrid)
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
      resetGrid()

    setIsDraggingStart(false)
    setIsDraggingEnd(false)
    setIsUpdatingToWall(grid[i][j].nodeType !== NodeType.Wall)
  }

  return {
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  }
}

export default useMouseEventHandlers
