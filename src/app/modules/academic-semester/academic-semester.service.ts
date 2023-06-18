import { IAcademicSemester } from './academic-semester.interface';
import { AcademicSemester } from './academic-semester.model';
import { getAcademicSemesterCode } from './academic-semester.util';

const create = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
  payload.code = getAcademicSemesterCode(payload.title);
  const createdAcademicSemester = AcademicSemester.create(payload);
  return createdAcademicSemester;
};

export const academicSemesterService = { create };
