import { Request, Response } from "express";

export class BarberController {
  testFunc(req: Request, res: Response) {
    console.log("This is a test function of barber.");
    return res
      .status(200)
      .json({ message: "Barber Test function executed successfully." });
  }
}
