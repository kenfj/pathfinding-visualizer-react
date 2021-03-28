import { NodeType } from "./NodeType";

export class Vertex {
  constructor(
    readonly i: number,
    readonly j: number,
    public nodeType: NodeType = NodeType.Default,
    public distance: number = Infinity,
    public prevNode: Vertex | null = null,
    public isVisited: boolean = false,
  ) { }

  public reset() {
    this.distance = Infinity
    this.prevNode = null
    this.isVisited = false
  }

  public isWall() {
    return this.nodeType === NodeType.Wall
  }
}
