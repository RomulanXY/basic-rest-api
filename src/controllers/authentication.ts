import express from "express";
import { createUser, geUserByEmail } from "./../database/users";
import { random, authentication } from "./../helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) res.sendStatus(400);

    const existingUser = await geUserByEmail(email);
    if (existingUser) res.sendStatus(400);

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) res.sendStatus(400);

    const user = await geUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) res.sendStatus(400);

    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) res.sendStatus(403);

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("ROMULANXY-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
