import axios from 'axios';
import LocalStorage from './localStorage';
import router from '../router';

class HttpService {
  constructor() {
    this.storage = new LocalStorage('user');
    this.client = axios.create({
      baseURL: import.meta.env.VUE_APP_API_URL || 'http://localhost:3000/',
    });

    this.client.interceptors.request.use(
      (config) => {
        let user = this.storage.get();
        if (user) {
          config.headers['Authorization'] = user.token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          this.storage.clear();
          router.push('/');
        }
        return Promise.reject(error);
      }
    );
  }
}

export default HttpService;