import { Broker } from "./broker";
import { Builder } from "./builder";
import { Consumer } from "./consumer";
import { Publisher } from "./publisher";

const broker = new Broker(8900, "localhost");

const publisher1 = new Publisher();
const publisherBuilder1 = new Builder(publisher1)
  .setPort(8900)
  .setHost("localhost")
  .setQueueName("auth_queue")
  .connect();

const publisher2 = new Publisher();
const publisherBuilder2 = new Builder(publisher2)
  .setPort(8900)
  .setHost("localhost")
  .setQueueName("users_queue")
  .connect();

const consumer1 = new Consumer();
const consumerBuilder1 = /**/ new Builder(consumer1)
  .setPort(8900)
  .setHost("localhost")
  .setQueueName("auth_queue")
  .connect();

const consumer2 = new Consumer();
const consumerBuilder2 = new Builder(consumer2)
  .setPort(8900)
  .setHost("localhost")
  .setQueueName("users_queue")
  .connect();
