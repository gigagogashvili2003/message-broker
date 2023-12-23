import { Broker } from "./broker";
import { Builder } from "./builder";
import { Consumer } from "./consumer";
import { Publisher } from "./publisher";

const broker = new Broker(8900, "localhost");

const publisher = new Publisher();
const publisherBuilder = new Builder(publisher).setPort(8900).setHost("localhost").setQueueName("auth_queue").connect();

publisher.send({ name: "Giga" });
publisher.send({ name: "Gigaa" });
publisher.send({ name: "Gigaaa" });

const consumer = new Consumer();
const consumerBuilder = new Builder(consumer).setPort(8900).setHost("localhost").setQueueName("auth_queue").connect();
