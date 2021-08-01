// add an environmental variable during bootup or change the string to your api url
const url = process.env.API_URL || 'http://localhost:5000';

// where different error codes will redirect, used throughout app to handle errors
const errorRoutes = {
  401: '/forbidden',
  404: '/notfound',
  500: '/error',
};

export { url, errorRoutes };
