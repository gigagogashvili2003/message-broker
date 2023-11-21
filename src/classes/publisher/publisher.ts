import { TcpSocketConnection } from "../connection";

export class Publisher extends TcpSocketConnection {
  public constructor() {
    super();
  }

  public onConnect(): void {
    // throw new Error("Method not implemented.");
  }
  public onMessage(): void {
    // throw new Error("Method not implemented.");
  }
  public onError(): void {
    // throw new Error("Method not implemented.");
  }
  public onClose(): void {
    // throw new Error("Method not implemented.");
  }
}
