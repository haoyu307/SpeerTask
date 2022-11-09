import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'https://api.github.com',
});

axiosConfig.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default axiosConfig;

const configBearerToken = token => {
  return {
    headers: {
      Authorization: 'Bearer ' + (token ?? ''),
    },
  };
};

export {configBearerToken};
