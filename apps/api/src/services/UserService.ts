import { AbstractService } from "#/core/service";
import { User, UserFields } from "#/database/models/user";
import logger from "logger";
import { OperationResult } from "#/types/global";
import { AsOptional } from "#/types/util";
import { WhereOptions } from "sequelize";

export class UserService extends AbstractService {
  async insert(properties: {
    name: string;
    username: string;
    password: string;
  }): Promise<OperationResult<User>> {
    try {
      const createdUser = await User.create({
        ...properties,
      });

      return {
        success: true,
        data: createdUser,
      };
    } catch (err) {
      return {
        success: false,
        message: "Unable to create new user.",
        error: err,
      };
    }
  }

  public async update(
    properties: AsOptional<Omit<UserFields, "id">> & { id: string },
  ): Promise<OperationResult<never>> {
    const { id, ...rest } = properties;

    try {
      const updatedUsers = await User.update(
        {
          ...rest,
        },
        {
          where: {
            id,
          },
        },
      );

      if (!updatedUsers) {
        throw "No users were updated.";
      }

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        error: err,
      };
    }
  }

  public async getMany(cfg?: {
    attributes?: (keyof UserFields)[];
    where?: WhereOptions<User>;
  }): Promise<OperationResult<User[]>> {
    try {
      const users = await User.findAll({
        where: cfg?.where,
        attributes: cfg?.attributes?.length ? cfg.attributes : undefined,
      });

      return {
        success: true,
        data: users,
      };
    } catch (err) {
      logger.error(err);
      return {
        success: false,
        error: err,
      };
    }
  }

  public async getById({ id }: { id: string }): Promise<OperationResult<User>> {
    try {
      const user = await User.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        throw "Unable to find user.";
      }

      return {
        success: true,
        data: user,
      };
    } catch (err) {
      return {
        success: false,
        error: err,
      };
    }
  }
}
