import { Builder } from "./builder.class";

export interface IBuilder {
  setPort(port: number): Builder;
  setHost(host: string): Builder;
  setQueueName(queueName: string): Builder;
  connect(): Builder;
}
