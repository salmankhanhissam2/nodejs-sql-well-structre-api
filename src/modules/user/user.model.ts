import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/dbConnection";
import { IUser } from "../interfaces/user.interface";

class User extends Model<IUser> implements IUser {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Username is required",
        },
        len: {
          args: [3, 255],
          msg: "Username must be between 3 and 255 characters",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required",
        },
        len: {
          args: [6, 100],
          msg: "Password must be at least 6 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Please provide a valid email",
        },
      },
    },
    createdAt: "",
    updatedAt: "",
  },
  {
    sequelize, // passing the `sequelize` instance
    modelName: "User",
    tableName: "users", // Name of the table in the DB
    timestamps: true, // Sequelize will automatically handle `createdAt` & `updatedAt`
  }
);

export default User;
