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
// Find the last faculty id
const findLastFacultyId = async () => {
  const lastFacultyId = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
  return lastFacultyId?.id;
};
// Generate a new faculty id
export const generateFacultyId = async () => {
  const initialId = `F-1${'0'.padStart(5, '0')}`;
  const currentId = (await findLastFacultyId()) || initialId;
  const incrementId = (parseInt(currentId.substring(2)) + 1).toString().padStart(5, '0');
  return `F-${incrementId}`;
};
// Find the last admin id
export const findLastAdminId = async () => {
  const lastAdminId = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
  return lastAdminId?.id;
};
// Generate a new admin id
export const generateAdminId = async () => {
  const initialId = `A-1${'0'.padStart(5, '0')}`;
  const currentId = (await findLastAdminId()) || initialId;
  const incrementId = (parseInt(currentId.substring(2)) + 1).toString().padStart(5, '0');
  return `A-${incrementId}`;
};
// Generate a random password
export const generatePassword = (): string => {
  const randomPassword = Math.floor(10000000 + Math.random() * 90000000);
  return randomPassword.toString();
};
