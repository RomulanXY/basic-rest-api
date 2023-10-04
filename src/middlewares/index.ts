import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "./../database/users";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["ROMULANXY-AUTH"];
    if (!sessionToken) res.sendStatus(403);

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) res.sendStatus(403);

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity_id") as string;

    if (!currentUserId) res.sendStatus(403);
    if (currentUserId.toString() !== id) res.sendStatus(403);

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
