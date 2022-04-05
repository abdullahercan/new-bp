import { UserEntity } from "./user.entity";
import userService from "./user.service";

const index = (): Promise<UserEntity[]> => {
  return userService.getAllUser();
};

export default { index };
