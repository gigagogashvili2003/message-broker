import { Broker, Publisher, Queue } from "./classes";
import { INode } from "./interfaces";

const broker = new Broker(8900, "localhost");

const publisher = new Publisher();

publisher.connect(8900, "localhost");
console.log(broker);
