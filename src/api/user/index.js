import axios from 'axios';

const v1 = '/p2/user/api/v1/user';

export const getUsers = params => axios({ url: `${v1}`, params });

// Endpoint for creating users {{ user_service_user_create }}
export const postUser = data => axios({ url: `${v1}`, method: 'POST', data });

// Return a list of user's organizations {{ user_service_list_organizations }}
export const getUserOrganizations = params => axios({ url: `${v1}/organizations`, params });

// Endpoint for registering users {{ user_service_user_register }}
export const registerUser = data => axios({ url: `${v1}/register`, method: 'POST', data });

// Endpoint for validating user email
export const validateUserEmail = data => axios({ url: `${v1}/validate`, method: 'POST', data });

// Endpoint to request email_address validation email. {{ user_service_email_resend }}
export const emailResend = data => axios({ url: `${v1}/validate/resend`, method: 'POST', data });

// get user by uuid
export const getUser = ({ user_uuid }) => axios({ url: `${v1}/${user_uuid}` });

// Endpoint for updating users.
export const editUser = ({ user_uuid, ...data }) =>
  axios({ url: `${v1}/${user_uuid}`, method: 'PATCH', data });

// Endpoint for getting User's ComplexGroups {{ user_service_user_get_user_complex_groups }}
export const getComplexGroupsByUser = ({ user_uuid, ...params }) =>
  axios({ url: `${v1}/${user_uuid}/complex-groups`, params });

// Endpoint for updating user's own password.
export const updateUserPassword = ({ user_uuid, ...data }) =>
  axios({ url: `${v1}/${user_uuid}/password`, method: 'PATCH', data });

// Endpoint for getting a user's roles {{ user_service_user_get_user_roles }}
export const getRolesByUser = ({ user_uuid, ...params }) =>
  axios({ url: `${v1}/${user_uuid}/roles`, params });

// Endpoint for deleting a role from a user.
export const removeRoleFromUser = ({ user_uuid, role_uuid }) =>
  axios({ url: `${v1}/${user_uuid}/roles/${role_uuid}`, method: 'DELETE' });

// Endpoint for adding a role to a user.
export const addRoleToUser = ({ user_uuid, role_uuid }) =>
  axios({ url: `${v1}/${user_uuid}/roles/${role_uuid}`, method: 'PATCH' });

export const changeOrganization = data =>
  axios({ url: '/p2/user/api/v1/changeOrganization', method: 'POST', data });

export const assignRoles = ({ user_uuid, ...data }) =>
  axios({ url: `/p2/user/api/v1/user/${user_uuid}/roles`, method: 'PATCH', data });
