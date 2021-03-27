import { Vertex } from "./Vertex";

export function Dijkstra(grid: Vertex[][], startNode: Vertex, endNode: Vertex) {
  const openSet = [startNode]
  const visited: Vertex[] = []
  startNode.distance = 0

  while (!!openSet.length) {
    const current = pop(openSet)

    if (current === endNode) return visited

    current.isVisited = true
    visited.push(current)

    updateNeighbors(current)
  }

  // works like a priority queue
  function pop(nodes: Vertex[]) {
    nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
    return nodes.shift()!
  }

  function updateNeighbors(node: Vertex) {
    const neighbors = getNeighbors(node)

    for (const neighbor of neighbors) {
      neighbor.distance = node.distance + 1
      neighbor.prevNode = node

      if (!openSet.includes(neighbor))
        openSet.push(neighbor)
    }
  }

  function getNeighbors(node: Vertex) {
    const neighbors = []
    const { i, j } = node

    if (i > 0)
      neighbors.push(grid[i - 1][j])
    if (i < grid.length - 1)
      neighbors.push(grid[i + 1][j])
    if (j > 0)
      neighbors.push(grid[i][j - 1])
    if (j < grid[0].length - 1)
      neighbors.push(grid[i][j + 1])

    return neighbors.filter(neighbor =>
      !neighbor.isWall() &&
      !neighbor.isVisited
    )
  }
}

export function backtrackToStart(node: Vertex) {
  const path = [node]

  while (node.prevNode) {
    path.unshift(node.prevNode)
    node = node.prevNode!
  }

  return path
}
