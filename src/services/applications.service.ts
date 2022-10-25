import { PrismaClient, Status } from '@prisma/client';

interface IApplicationInput {
    name: string,
    email: string,
    phone: string,
    resume: string,
    coverLetter: string,
}

const prisma = new PrismaClient();

const addApplication = async (input: IApplicationInput) => {
  const application = await prisma.application.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      resume: input.resume,
      coverLetter: input.coverLetter,
      position: 'Software Engineer',
      status: Status.PENDING,
    },
  });
  return application;
};

const findApplicationById = async (id: number) => {
  const application = await prisma.application.findUnique({
    where: {
      id,
    },
  });
  return application;
};

const findAllApplications = async () => {
  const applications = await prisma.application.findMany();
  return applications;
};

const changeApplicationStatus = async (id: number, status: Status) => {
  const application = await prisma.application.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
  return application;
};

export {
  IApplicationInput,
  addApplication,
  findApplicationById,
  findAllApplications,
  changeApplicationStatus,
};
