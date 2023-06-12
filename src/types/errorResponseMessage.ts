export type GenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: GenericErrorMessages[];
};

export type GenericErrorMessages = {
  path: string;
  message: string;
};
