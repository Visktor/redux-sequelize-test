import { AbstractService } from "#/core/service";
import { User, UserFields } from "#/database/models/user";
import { OperationResult } from "#/types/global";
import { AsOptional } from "#/types/util";

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
    try {
      const updatedUsers = await User.update(
        {
          ...properties,
        },
        {
          where: {
            id: properties.id,
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
        error: "",
      };
    }
  }

  public async getMany(properties: (keyof UserFields)[]) {
    try {
    } catch (err) {}
  }
}
