import { Request, Response } from "express";

export class UserController {
  testFunc(req: Request, res: Response) {
    console.log("This is a test function of User.");
    return res
      .status(200)
      .json({ message: "User Test function executed successfully." });
  }
}
