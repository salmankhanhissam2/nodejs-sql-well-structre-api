export interface IShop {
  id?: number; // Optional because it will be auto-generated by Sequelize
  shop_name: string;
  location: string;
  status: string;
  userId: number; // Add user_id to link the shop with a user
  createdAt?: Date; // Optional, handled by Sequelize
  updatedAt?: Date; // Optional, handled by Sequelize
}
