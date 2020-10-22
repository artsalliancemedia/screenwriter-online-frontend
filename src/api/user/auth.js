import axios from 'axios';

const v1 = '/p2/user/api/v1/auth';

export const login = data => axios({ url: `${v1}/login`, method: 'POST', data });
// the origin is login
export const refresh = () => axios({ url: `${v1}/login/refresh`, method: 'POST' });
// just clear the sessionStorage and the cookie
export const logout = () => axios({ url: `${v1}/logout`, method: 'POST' });
// Endpoint to ask for password reset. {{ user_service_recover_password }}
export const recoverPassword = data =>
  axios({ url: `${v1}/password/recover`, method: 'POST', data });
// Endpoint to submit a new password. {{ user_service_reset_password }}
export const resetPassword = data => axios({ url: `${v1}/password/reset`, method: 'POST', data });
