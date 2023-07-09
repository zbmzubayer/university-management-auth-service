import { IAcademicSemester } from '../academic-semester/academic-semester.interface';
import { User } from './user.model';

// Find the last student id
const findLastStudentId = async () => {
  const lastStudentId = await User.findOne({ role: 'student' }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
  return lastStudentId?.id;
};
// Generate a new student id
export const generateStudentId = async (academicSemester: IAcademicSemester) => {
  const initialId = `${academicSemester.year.substring(2, 4)}-1${'0'.padStart(5, '0')}-${academicSemester.code}`;
  const currentId = (await findLastStudentId()) || initialId;
  const idArray = currentId.split('-');
  const middleId = (parseInt(idArray[1]) + 1).toString().padStart(5, '0');
  return `${academicSemester.year.substring(2, 4)}-${middleId}-${academicSemester.code}`;
};
// Generate a random password
export const generatePassword = (): string => {
  const randomPassword = Math.floor(10000000 + Math.random() * 90000000);
  return randomPassword.toString();
};
