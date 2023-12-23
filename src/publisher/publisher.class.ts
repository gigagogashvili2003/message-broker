import { Handshake } from "src/common/enums";
import { TcpSocket } from "src/socket/tcp-socket.class";
export class Publisher extends TcpSocket {
  private _queueName!: string;

  public constructor() {
    super();
  }

  public onSocketConnect() {
    this._socket.write(`HEADERS={"queue":"${this._queueName}","handshake":"${Handshake.PUBLISHER}"}`);
  }

  public send<T>(payload: T) {
    this._socket.write(
      `MESSAGE={"publish":"${this._queueName}","handshake":"${Handshake.PUBLISHER}","payload":${JSON.stringify(
        payload
      )}};`
    );
  }

  public set queueName(queueName: string) {
    this._queueName = queueName;
  }
}
