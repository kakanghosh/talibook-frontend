import Axios from 'axios';

const urls = {
  development: `http://192.168.0.120:8000`,
};
console.log(`process.env.NODE_ENV`, process.env.NODE_ENV);

const client = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default client;
