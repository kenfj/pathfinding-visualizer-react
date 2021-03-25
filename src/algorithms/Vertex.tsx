import { NodeType } from "./NodeType";

export class Vertex {
  constructor(
    readonly i: number,
    readonly j: number,
    public nodeType: NodeType,
  ) { }
}
