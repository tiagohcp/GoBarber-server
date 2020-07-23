export default {
  jwt: {
    secret: process.env.APP_SECRET || 'defual',
    expiresIn: '1d',
  },
};
