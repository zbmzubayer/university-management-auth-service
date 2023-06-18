import { RequestHandler } from 'express';
import { academicSemesterService } from './academic-semester.service';

const create: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await academicSemesterService.create(data);
    res.status(201).json({
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const academicSemesterController = { create };
