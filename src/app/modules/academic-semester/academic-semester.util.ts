export const getAcademicSemesterCode = (title: string) => {
  switch (title) {
    case 'Spring':
      return '01';
    case 'Summer':
      return '02';
    case 'Fall':
      return '03';
    default:
      return '01';
  }
};
