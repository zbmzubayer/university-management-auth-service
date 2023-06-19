import { RequestHandler } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterService } from './academic-semester.service';

const create: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await academicSemesterService.create(data);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Academic Semester Created Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const academicSemesterController = { create };
