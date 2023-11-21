import { Queue } from "@src/classes/queue";
import { INode } from "@src/interfaces";
import net from "net";

export class Broker<T extends INode> {
  public _queues: Map<string, Queue<T>> = new Map();
  private _server: net.Server;

  public constructor(port: number, host: string) {
    this._server = net.createServer();
    this._server.listen({ port, host }, this.onListen);

    this.registerListeners();
  }

  public onListen() {
    console.log("Server is Listening");
  }

  public registerListeners() {
    this._server.on("connection", this.onSocketConnect);
  }

  public onSocketConnect() {
    console.log("Some socket connected!");
  }
}
