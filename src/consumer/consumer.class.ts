import { Handshake } from "src/common/enums";
import { TcpSocket } from "src/socket/tcp-socket.class";
export class Consumer extends TcpSocket {
  private _queueName!: string;

  public constructor() {
    super();
  }

  public onSocketConnect() {
    this._socket.write(`HEADERS={"queue":"${this._queueName}","handshake":"${Handshake.CONSUMER}"}`);
  }

  public set queueName(queueName: string) {
    this._queueName = queueName;
  }
}
