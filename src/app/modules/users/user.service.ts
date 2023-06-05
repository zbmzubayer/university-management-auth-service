import { IUser } from './user.interface';
import { User } from './user.model';
import { generatePassword, generateUserId } from './user.util';
const createUser = async (user: IUser) => {
  const userId = await generateUserId();
  user.id = userId;
  user.password = generatePassword();
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new Error('Error creating user');
  }
  return createUser;
};

export default {
  createUser,
};
