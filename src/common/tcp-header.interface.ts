import { Handshake } from "./enums";

export interface TCPHeader {
  queue: string;
  handshake: Handshake;
}
