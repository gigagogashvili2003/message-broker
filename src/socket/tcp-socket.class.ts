import net from "net";

export abstract class TcpSocket {
  protected _socket!: net.Socket;
  private _port!: number;
  private _host!: string;

  public constructor() {
    this._socket = new net.Socket();
    this.registerSocketListeners();
  }

  public connect() {
    this._socket.connect({ port: this.port, host: this.host });
  }

  public registerSocketListeners() {
    this._socket.on("connect", this.onSocketConnect.bind(this));
  }

  public get port() {
    return this._port;
  }

  public get host() {
    return this._host;
  }

  public set port(port: number) {
    this._port = port;
  }

  public set host(host: string) {
    this._host = host;
  }

  public get socket() {
    return this._socket;
  }

  public abstract onSocketConnect(): void;
}
