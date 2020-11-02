import axios from 'axios';
import qs from 'qs';
import cookie from 'js-cookie';
import store from '@/store';
import Configuration from '@/Configuration';

// create an axios instance
export default function setupRequest() {
  // request int erceptor
  axios.interceptors.request.use(
    config => {
      config.baseURL = Configuration('baseUrl') || '/'; // url = base url + request url
      config.withCredentials = true; // send cookies when cross-domain requests
      config.headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Cache-Control': 'no-cache',
        'X-Frame-Options': 'deny',
        'X-AAM-VERSION': Configuration('version'),
        Env: Configuration('env'),
        'Accept-Language': cookie.get('locale') || 'en-US',
        ...config.headers
      };
      config.paramsSerializer = params => qs.stringify(params, { skipNulls: true, arrayFormat: 'comma' });
      config.timeout = 30 * 1000;
      if (config.responseType) {
        config.headers.responseType = config.responseType;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  // response interceptor
  axios.interceptors.response.use(
    ({ data, config }) => {
      // const res = response.data;
      const { url } = config;
      if (url.match('auth/login') || url.match('auth/logout') || url.match('auth/password/recover')) {
        return data;
      }
      return data;
    },
    error => {
      const { response } = error;
      const { status, data: originData } = response;
      const { message } = originData;
      // 有refresh token 刷新后重新访问页面
      if (originData.status === 'invalid') {
        return store
          .dispatch('auth/refresh')
          .then(() => axios.request(error.config))
          .catch(e => Promise.reject(e));
      }
      if (originData.message === 'invalid csrf token') {
        return axios
          .request({ url: '/p2/base/ct' })
          .then(() => axios.request(error.config))
          .catch(e => Promise.reject(e));
      }
      if (originData.status === 'not_present') {
        return store.dispatch('auth/redirect');
      }
      if (error && response) {
        error.message = message || 'Unknown error';
        switch (status) {
          case 401:
            store.dispatch('auth/updateAuthSource', { authed: false });
            if (!window.location.pathname.match('login') && !window.location.pathname.match('/')) {
              window.history.back();
              return Promise.resolve();
            }
            break;
          default:
            break;
        }
      }
      return Promise.reject(error);
    }
  );
}
