import { checkSchema } from 'express-validator';

export default checkSchema({
  name: {
    isEmpty: {
      errorMessage: 'Name is required',
      negated: true,
    },
    escape: true,
  },
});
