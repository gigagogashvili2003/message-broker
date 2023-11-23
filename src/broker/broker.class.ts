import net from "net";
import { INode } from "src/node";
import { Queue } from "src/queue";

export class Broker<T extends INode> {
  public _queues: Map<string, Queue<T>> = new Map();
  public _consumers: Map<string, net.Socket> = new Map();
  public _publishers: Map<string, net.Socket> = new Map();
  private _server: net.Server;

  public constructor(public port: number, public host: string) {
    this._server = net.createServer();
    this._server.listen({ port, host }, this.onListen.bind(this));
    this._server.on("connection", this.onSocketConnect.bind(this));
  }

  public onListen() {
    console.log(`Server is listening on port: ${this.port} ${this.host}`);
  }

  public onSocketConnect(socket: net.Socket) {
    console.log(`New Socket Connected`);
    socket.on("data", this.onSocketData.bind(this, socket));
  }

  public onSocketData(socket: net.Socket, data: Buffer) {
    const strData = data.toString();

    const dataParts = strData.split(";");

    const queueEntry = dataParts.find((item) => item.startsWith("QUEUE="));
    const handShakeEntry = dataParts.find((item) => item.startsWith("handShake="));

    if (queueEntry && handShakeEntry) {
      const queueName = queueEntry.split("=")[1];
      const handShakeName = handShakeEntry.split("=")[1];

      if (handShakeName === "publisher") {
        if (this._queues.get(queueName)) {
          throw new Error("Duplicate queue");
        }

        if (this._publishers.get(queueName)) {
          throw new Error("Duplicate socket instances");
        }

        const newQueue = new Queue<T>();

        this._publishers.set(queueName, socket);
        this._queues.set(queueName, newQueue);
      } else {
        if (this._consumers.get(queueName)) {
          throw new Error("Duplicate socket instances");
        }

        this._consumers.set(queueName, socket);
      }
    }
    console.log(this);
  }

  public get publishers() {
    return this._publishers;
  }
  public get consumers() {
    return this._consumers;
  }

  public get queues() {
    return this._queues;
  }
}
