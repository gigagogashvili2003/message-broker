import { Handshake } from "src/common/enums";

export interface Message {
  publish: string;
  handshake: Handshake;
  payload: unknown;
}
