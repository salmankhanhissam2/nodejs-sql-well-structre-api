import { IUser } from "../modules/interfaces/user.interface"; // Adjust the path to where your IUser interface is located

// declare global {
//   namespace Express {
//     interface Request {
//       user?: IUser; // Add the user property to the Request interface
//     }
//   }
// }

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
