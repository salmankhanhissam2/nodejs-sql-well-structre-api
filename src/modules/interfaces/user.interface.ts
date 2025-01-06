// src/modules/user/interfaces/user.interface.ts
export interface IUser {
  id?: number; // id is optional during creation
  username?: string;
  email: string;
  password?: string;
  createdAt?: Date; // createdAt is handled by Sequelize
  updatedAt?: Date; // updatedAt is handled by Sequelize
}

export interface ILoginCredentials {
  email: string;
  password: string;
}
