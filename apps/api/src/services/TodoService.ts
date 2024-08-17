import { AbstractService } from "#/core/service";
import { Todo, TodoFields } from "#/database/models/todo";
import { OperationResult } from "#/types/global";
import { AsOptional } from "#/types/util";
import logger from "logger";
import { WhereOptions } from "sequelize";

export class TodoService extends AbstractService {
  async insert(properties: {
    title: string;
    description: string;
  }): Promise<OperationResult<Todo>> {
    try {
      const createdTodo = await Todo.create({
        ...properties,
      });

      return {
        success: true,
        data: createdTodo,
      };
    } catch (err) {
      return {
        success: false,
        message: "Unable to create new todo.",
        error: err,
      };
    }
  }

  public async update(
    properties: AsOptional<Omit<TodoFields, "id">> & { id: string },
  ): Promise<OperationResult<never>> {
    const { id, ...rest } = properties;

    try {
      const updatedTodos = await Todo.update(
        {
          ...rest,
        },
        {
          where: {
            id: properties.id,
          },
        },
      );

      if (!updatedTodos) {
        throw "No todos were updated.";
      }

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        error: "",
      };
    }
  }

  public async getMany({
    attributes,
    where,
  }: {
    attributes?: (keyof TodoFields)[];
    where: WhereOptions<Todo>;
  }): Promise<OperationResult<Todo[]>> {
    try {
      const todos = await Todo.findAll({
        where,
        attributes: attributes?.length ? attributes : undefined,
      });

      return {
        success: true,
        data: todos,
      };
    } catch (err) {
      logger.error(err);
      return {
        success: false,
        error: err,
      };
    }
  }

  public async getById({ id }: { id: string }): Promise<OperationResult<Todo>> {
    try {
      const todo = await Todo.findOne({
        where: {
          id,
        },
      });

      if (!todo) {
        throw "Unable to find todo.";
      }

      return {
        success: true,
        data: todo,
      };
    } catch (err) {
      return {
        success: false,
        error: err,
      };
    }
  }
}
