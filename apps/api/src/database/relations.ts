import { User } from "./models/user";
import { Todo } from "./models/todo";

User.hasMany(Todo);
Todo.belongsTo(User);
