type AcademicSemesterTitles = 'Spring' | 'Summer' | 'Fall';
type AcademicSemesterCodes = '01' | '02' | '03';
type AcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export interface IAcademicSemester {
  title: AcademicSemesterTitles;
  code: AcademicSemesterCodes;
  year: string;
  startMonth: AcademicSemesterMonths;
  endMonth: AcademicSemesterMonths;
}
