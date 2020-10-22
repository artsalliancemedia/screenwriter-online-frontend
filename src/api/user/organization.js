import axios from 'axios';

const v1 = '/p2/user/api/v1/organization';

// Endpoint used to create an organization. {{ user_service_create_organization }}
export const postOrganization = data => axios({ url: v1, method: 'POST', data });

// Endpoint used to list all organizations. {{ user_service_detail_organization }}
export const getOrganizations = params => axios({ url: v1, params });

export const getOrganization = ({ organization_uuid }) =>
  axios({ url: `${v1}/${organization_uuid}` });

// Endpoint used to edit an organization. {{ user_service_edit_organization }}
export const patchOrganization = ({ organization_uuid, ...data }) =>
  axios({ url: `${v1}/${organization_uuid}`, method: 'PATCH', data });

export const getComplexGroupsByOrganization = ({ organization_uuid, ...params }) =>
  axios({ url: `${v1}/${organization_uuid}/complex-groups`, params });

// Endpoint to invite user to join your organization {{ user_service_organization_invite }}
export const inviteUserToOrganization = ({ organization_uuid, language, ...data }) => {
  return axios({
    url: `${v1}/${organization_uuid}/invite`,
    method: 'POST',
    data,
    headers: {
      'Accept-Language': language,
    },
  });
};

export const acceptInviteOrganization = ({ organization_uuid, ...data }) =>
  axios({ url: `${v1}/${organization_uuid}/invite/accept`, method: 'POST', data });

export const editOrganizationPrimaryGroup = ({ organization_uuid, ...data }) =>
  axios({ url: `${v1}/${organization_uuid}/primary_group`, method: 'POST', data });

// Endpoint used to list all users in the organization. {{ user_service_organization_users }}
export const getUsersByOrganization = ({ organization_uuid, ...params }) =>
  axios({ url: `${v1}/${organization_uuid}/users`, params });

// Endpoint for adding a user to an organization. {{ user_service_organization_add_user }}
export const addUserToOrganization = ({ organization_uuid, user_uuid }) =>
  axios({ url: `${v1}/${organization_uuid}/users/${user_uuid}`, method: 'PATCH' });

export const getOrganizationsWithMeta = params => axios({ url: `${v1}/metadata`, params });

export const getOrganizationWithMeta = ({ organization_uuid }) =>
  axios({ url: `${v1}/${organization_uuid}/metadata` });

export const getOrganizationProduction = ({ organization_uuid }) =>
  axios({ url: `${v1}/${organization_uuid}/production` });

export const patchComplexOrganization = ({ organization_uuid, complex_uuid }) =>
  axios({ url: `${v1}/${organization_uuid}/complex/${complex_uuid}`, method: 'PATCH' });
