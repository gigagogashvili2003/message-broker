import { Consumer } from "src/consumer";
import { Publisher } from "src/publisher";
import { IBuilder } from "./builder.interface";

export class Builder implements IBuilder {
  public constructor(public builder: Publisher | Consumer) {}

  public setPort(port: number): Builder {
    this.builder.port = port;
    return this;
  }

  public setHost(host: string): Builder {
    this.builder.host = host;
    return this;
  }

  public connect(): Builder {
    this.builder.connect();
    return this;
  }

  public setQueueName(queueName: string): Builder {
    this.builder.queueName = queueName;
    return this;
  }
}
