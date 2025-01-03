import { IUser } from "../modules/user/interfaces/user.interface"; // Adjust the path to where your IUser interface is located

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Add the user property to the Request interface
    }
  }
}
