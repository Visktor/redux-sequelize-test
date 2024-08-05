import { Model, DataTypes, InferAttributes } from "sequelize";
import { sequelize } from "../../lib/sequelize/config";
import { Todo } from "./todo";

export type UserFields = InferAttributes<User>;

export class User extends Model {
  declare id: string;
  declare name: string;
  declare username: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    sequelize,
    name: {
      singular: "User",
      plural: "users",
    },
  },
);

User.hasMany(Todo);
