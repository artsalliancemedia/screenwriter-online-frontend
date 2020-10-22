import axios from 'axios';

// get the countries data
export const getCountries = params => axios({ url: '/p2/complex/api/v3/base_data/countries', params });
