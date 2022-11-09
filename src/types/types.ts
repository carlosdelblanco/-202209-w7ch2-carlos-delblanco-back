import type { JwtPayload } from "jsonwebtoken";
import type { request } from "express";
interface RobotsFeatures {
  _id: string;
  name: string;
  image: string;
  creation: string;
  resistance: number;
  speed: number;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface UserTokenPayload extends JwtPayload {
  id: string;
  username: string;
}

export default RobotsFeatures;
