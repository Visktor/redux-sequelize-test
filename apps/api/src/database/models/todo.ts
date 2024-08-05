import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../lib/sequelize/config";
import { User } from "./user";

export class Todo extends Model {}

Todo.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    sequelize,
  },
);

Todo.belongsTo(User);
