import { User } from './user.model';

// Get the last user id
const lastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
  return lastUser?.id;
};
// Generate a new user id
export const generateUserId = async () => {
  const currentId = (await lastUserId()) || '0'.padStart(5, '0');
  const newUserId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return newUserId;
};
// Generate a random password
export const generatePassword = (): string => {
  const randomPassword = Math.floor(10000000 + Math.random() * 90000000);
  return randomPassword.toString();
};
