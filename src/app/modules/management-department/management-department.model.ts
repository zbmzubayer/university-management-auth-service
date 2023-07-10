import { Schema, model } from 'mongoose';
import { IManagementDepartment, ManagementDepartmentModel } from './management-department.interface';

const managementDepartmentSchema = new Schema<IManagementDepartment, ManagementDepartmentModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const ManagementDepartment = model<IManagementDepartment, ManagementDepartmentModel>(
  'ManagementDepartment',
  managementDepartmentSchema
);
