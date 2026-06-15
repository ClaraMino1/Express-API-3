import { env } from "../config/env.js";

export function getHealth(req, res) {
  return res.status(200).json({
    status: 'ok',
    environment: env.nodeEnv,
    store: env.storeName,
  });
};