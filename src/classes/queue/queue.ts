import { Node } from "@src/classes/node";
import { INode } from "@src/interfaces";

export class Queue<T extends INode> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private _size: number;

  public constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  public enqueue(data: T) {
    const newNode = new Node<T>(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }
    this._size++;
  }

  public dequeue() {
    if (this.head) {
      let nodeToReturn = this.head;
      this.head = this.head.next;

      if (!this.head) {
        this.tail = null;
      }

      this._size--;
      return nodeToReturn;
    }

    return null;
  }

  public get size() {
    return this._size;
  }

  public printPretty() {
    let curr = this.head;
    if (!curr) {
      return "Queue is empty";
    }

    let pretty: string = ``;
    while (curr !== null) {
      const message: string = curr.data.message;

      pretty += `${message} ${curr.next !== null ? "--> " : ""}`;
      curr = curr.next;
    }

    return pretty;
  }

  public isEmpty() {
    return this.size === 0;
  }

  public getPeek() {
    return this.head || null;
  }
}
