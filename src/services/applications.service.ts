import { PrismaClient, Status } from '@prisma/client';

interface IApplicationInput {
    name: string,
    email: string,
    phone: string,
    resume: string,
    coverLetter: string,
}

const ITEMS_PER_PAGE = 10;

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

const findAllApplications = async (page: number) => {
  let offset = 0;
  if (page > 1) {
    offset = (page - 1) * ITEMS_PER_PAGE;
  }

  const total = await prisma.application.count();
  const pages = Math.ceil(total / ITEMS_PER_PAGE);

  const applications = await prisma.application.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
    orderBy: {
      name: 'asc',
    },
  });

  return {
    applications,
    total,
    pages,
    page,
  };
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
