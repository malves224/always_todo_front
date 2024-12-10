import axios from 'axios';
import LocalStorage from './localStorage';

class HttpService {
  constructor() {
    this.storage = new LocalStorage('user')
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
  }

}

export default HttpService;