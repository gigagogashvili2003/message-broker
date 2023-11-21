export class Node<T> {
  public data: T;
  public next: Node<T> | null;

  public constructor(data: T) {
    this.next = null;
    this.data = data;
  }
}
