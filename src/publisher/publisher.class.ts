import { TcpSocket } from "src/socket/tcp-socket.class";
export class Publisher extends TcpSocket {
  private _queueName!: string;

  public constructor() {
    super();
  }

  public onSocketConnect() {
    this._socket.write(`QUEUE=${this._queueName};handShake=publisher`);
  }

  public set queueName(queueName: string) {
    this._queueName = queueName;
  }

  public get socket() {
    return this._socket;
  }
}
