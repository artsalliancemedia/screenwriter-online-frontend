import axios from 'axios';

export const getCsrfToken = () => axios({ url: '/p2/base/ct' });

export const initToken = () => axios({ url: '/p2/base/init' });

export const verifyReCAPTCHA = data => axios({ url: '/p2/base/recaptcha', method: 'POST', data });

export const updateCookie = data => axios({ url: '/p2/base/update_c', method: 'PATCH', data });
