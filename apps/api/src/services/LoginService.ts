import { AbstractService } from "#/core/service";
import { User, UserFields } from "#/database/models/user";
import { ServiceResult } from "#/types/global";
import { comparePasswords } from "#/util/encryption";

class LoginService extends AbstractService {
  async login(
    email: string,
    password: string,
  ): ServiceResult<Omit<UserFields, "password">> {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw "User not found.";
      }

      const { password: dbPassword, ...userData } = user;

      const isPasswordValid = comparePasswords(password, dbPassword);

      if (!isPasswordValid) {
        throw "Invalid password.";
      }

      return {
        success: true,
        data: userData,
      };
    } catch (err) {
      return {
        success: false,
        error: err,
        message: "Error while trying to login",
      };
    }
  }
}

export { LoginService };
