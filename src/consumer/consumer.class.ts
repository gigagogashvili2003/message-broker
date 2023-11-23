import { TcpSocket } from "src/socket/tcp-socket.class";
export class Consumer extends TcpSocket {
  private _queueName!: string;

  public constructor() {
    super();
  }

  public onSocketConnect() {
    this._socket.write(`QUEUE=${this._queueName};handShake=consumer`);
  }

  public set queueName(queueName: string) {
    this._queueName = queueName;
  }
}
