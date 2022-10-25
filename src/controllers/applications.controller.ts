import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v2 as cloudinary } from 'cloudinary';
import {
  addApplication, findAllApplications, findApplicationById, IApplicationInput,
} from '../services/applications.service';

const getApplications = async (
  req: Request<Record<string, never>>,
  res: Response,
): Promise<Response> => {
  const applications = await findAllApplications();

  return res.status(200).json({
    success: true,
    message: 'Applications retrieved successfully',
    applications,
  });
};

const createApplication = async (
  req: Request<Record<string, never>, Record<string, never>, IApplicationInput>,
  res: Response,
): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }

  const upload = await cloudinary.uploader.upload(req.body.resume, {
    folder: 'resumes',
  });

  const application = await addApplication({ ...req.body, resume: upload.secure_url });

  return res.status(200).json({
    success: true,
    message: 'Application submitted successfully',
    data: {
      ...application,
    },
  });
};

const getApplication = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;

  const application = await findApplicationById(Number(id));

  if (!application) {
    return res.status(404).json({
      success: false,
      message: 'Application not found',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Application retrieved successfully',
    data: {
      ...application,
    },
  });
};

export { getApplications, createApplication, getApplication };
