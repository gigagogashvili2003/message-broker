import net from "net";
import { TCPHeader } from "src/common";
import { Handshake } from "src/common/enums";
import { Message } from "src/common/interfaces/messages";
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
    socket.on("data", this.onSocketData.bind(this, socket));
  }

  public onSocketData(socket: net.Socket, data: Buffer) {
    const strData = data.toString();
    const dataParts = strData.split(";");

    const headers = dataParts.find((item) => item.startsWith("HEADERS="));
    const messages = dataParts.filter((item) => item.startsWith("MESSAGE="));

    if (headers) {
      const [_, headerObj] = headers.split("=");
      const headerToJSON: TCPHeader = JSON.parse(headerObj);
      if (headerToJSON.handshake === Handshake.PUBLISHER) {
        this.processPublisherConnection(headerToJSON.queue, socket);
      } else if (headerToJSON.handshake === Handshake.CONSUMER) {
        this.processConsumerConnection(headerToJSON.queue, socket);
      } else {
        throw new Error("Unsupported handshake");
      }
    }

    if (messages.length > 0) {
      const messagesToJson = messages.map((message) => {
        const [_, messageObj] = message.split("=");
        const messageToJSON: Message = JSON.parse(messageObj);
        return messageToJSON;
      });

      for (let i = 0; i < messagesToJson.length; i++) {
        const { handshake, publish, payload } = messagesToJson[i];

        if (handshake === Handshake.PUBLISHER) {
          console.log("SHEVEDI");
          if (this._queues.has(publish)) {
            const queue = this._queues.get(publish);
            if (!queue) {
              throw new Error("Queue not found!");
            }
          }
        }
      }
      console.log(this._queues.get("auth_queue")?.printPretty());
    }
  }

  private processPublisherConnection(queueName: string, socket: net.Socket) {
    if (this._queues.get(queueName)) {
      throw new Error("Duplicate queue");
    }
    if (this._publishers.get(queueName)) {
      throw new Error("Duplicate socket instances");
    }

    const newQueue = new Queue<T>();

    this._publishers.set(queueName, socket);
    this._queues.set(queueName, newQueue);
  }

  private processConsumerConnection(queueName: string, socket: net.Socket) {
    if (this._consumers.get(queueName)) {
      throw new Error("Duplicate socket instances");
    }

    this._consumers.set(queueName, socket);
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
