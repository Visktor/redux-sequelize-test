import { Model, DataTypes, InferAttributes } from "sequelize";
import { sequelize } from "../../lib/sequelize/config";

export class Todo extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
}

export type TodoFields = InferAttributes<Todo>;

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
