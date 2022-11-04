import { Status } from '@prisma/client';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v2 as cloudinary } from 'cloudinary';
import {
  addApplication,
  changeApplicationStatus,
  findAllApplications,
  findApplicationById,
  IApplicationInput,
} from '../services/applications.service';

const getApplications = async (
  req: Request<{ page: string }>,
  res: Response,
): Promise<Response> => {
  const { page } = req.query;

  const applications = await findAllApplications(page ? Number(page) : 1);

  return res.status(200).json({
    success: true,
    message: 'Applications retrieved successfully',
    ...applications,
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

  let resumeUrl = '';
  try {
    const upload = await cloudinary.uploader.upload(req.body.resume, {
      folder: 'resumes',
    });
    resumeUrl = upload.secure_url;
  } catch (error) {
    resumeUrl = '';
  }

  const application = await addApplication({ ...req.body, resume: resumeUrl });

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

const updateApplicationStatus = async (
  req: Request<{ id: number }, Record<string, never>, { status: string }>,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const { status } = req.body;

  const application = await findApplicationById(Number(id));

  if (!application) {
    return res.status(404).json({
      success: false,
      message: 'Application not found',
    });
  }

  let newStatus: Status = Status.PENDING;
  if (status === 'accepted') { newStatus = Status.PASSED; }
  if (status === 'rejected') { newStatus = Status.DROPPED; }

  const updatedApplication = await changeApplicationStatus(Number(id), newStatus);

  return res.status(200).json({
    success: true,
    message: 'Application status updated successfully',
    data: {
      ...updatedApplication,
    },
  });
};

export {
  getApplications, createApplication, getApplication, updateApplicationStatus,
};
