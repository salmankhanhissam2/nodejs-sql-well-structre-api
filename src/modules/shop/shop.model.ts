import { DataTypes, Model } from "sequelize";
import { IShop } from "../interfaces/shop.interface";
import sequelize from "../../config/dbConnection";
import User from "../user/user.model";
class Shop extends Model<IShop> implements IShop {
  static find(arg0: { where: { userId: any } }) {
    throw new Error("Method not implemented.");
  }
  id!: number;
  userId!: number;
  shop_name!: string;
  location!: string;
  status!: string;
  createdAt?: Date; // Optional fields for timestamps
  updatedAt?: Date;
}

Shop.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shop_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
    },
  },
  {
    sequelize, // Link to the database connection
    modelName: "Shop", // Internal name for the model
    tableName: "shop", // Name of the table in the database
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);
Shop.belongsTo(User, {
  foreignKey: "userId", // The field in the Shop model that references the User
  as: "user", // Alias for the relationship
});

export default Shop;
