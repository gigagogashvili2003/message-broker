import net from "net";
export abstract class TcpSocketConnection {
  protected socket: net.Socket;

  public constructor() {
    this.socket = new net.Socket();
  }

  public connect(port: number, host: string) {
    this.socket.connect({ port, host });
    this.registerListeners();
  }
  private registerListeners() {
    this.socket.on("connect", this.onConnect);
    this.socket.on("data", this.onMessage);
    this.socket.on("error", this.onError);
    this.socket.on("close", this.onClose);
  }

  public abstract onConnect(): void;
  public abstract onMessage(): void;
  public abstract onError(): void;
  public abstract onClose(): void;
}
