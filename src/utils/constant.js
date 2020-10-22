import Config from '@/Configuration';

export const AAMORGUUID = 'af455987-24ab-45da-9fd3-aaac38a48616';
export const HEADER_SWITCH_DATA = [
  {
    name: 'HUB',
    icon: 'aam',
    action: () => {
      window.open(Config('hubUrl'), '_blank');
    },
  },
  {
    name: 'PRODUCER',
    icon: 'producer',
    action: () => {
      window.open(Config('producerUrl'), '_blank');
    },
  },
];

export const ICON = {};

export const STATUS_TEXT = {
  offline: 'Offline',
  online: 'Online',
  not_enabled: 'Not enabled',
  active: 'Active',
  disabled: 'Disabled',
  requested: 'Requested',
  unrequested: 'Unrequested',
  ignored: 'Ignored',
  unknown: 'Unknown',
  invalid_cert: 'Invalid certificate',
  not_matching_cert: 'Not matching certificate',
  unavailable_cert: 'Unavailable certificate',
};

export const ADDRESS_TYPE = [
  {
    name: 'Physical',
    value: 'Physical',
  },
  {
    name: 'Shipping',
    value: 'Shipping',
  },
  {
    name: 'Billing',
    value: 'Billing',
  },
];

export const SCREENCONNECT_TYPE = [
  { text: 'Online', value: 'online' },
  { text: 'Offline', value: 'offline' },
  // { text: 'Unknown', value: 'unknown' },
  { text: 'Not enabled', value: 'not_enabled' },
  { text: 'Not matching certificate', value: 'not_matching_cert' },
  { text: 'Invalid certificate', value: 'invalid_cert' },
  // { text: 'Unavailable certificate', value: 'unavailable_cert' },
];

export const SCREENWRITER_TYPE = [
  { text: 'Online', value: 'online' },
  { text: 'Offline', value: 'offline' },
  { text: 'Unknown', value: 'unknown' },
];

export const KDM_TYPE = [
  {
    label: 'Enabled',
    value: true,
  },
  {
    label: 'Not enabled',
    value: false,
  },
];

export const DEFAULT_VALUE = '-';

export const SORT_NAME = {
  Name: {
    value: 'name',
    asc: { selected: true, tips: 'A - Z' },
    desc: { selected: false, tips: 'Z - A' },
  },
};

export const SORT_ORGANIZATION = {
  Organization: {
    value: 'organization',
    asc: { selected: false, tips: 'A - Z' },
    desc: { selected: false, tips: 'Z - A' },
  },
};

export const SORT_TERRITORY = {
  Territory: {
    value: 'territory',
    asc: { selected: false, tips: 'A - Z' },
    desc: { selected: false, tips: 'Z - A' },
  },
};

export const SORT_STATUS = {
  Status: {
    value: 'status',
    asc: { selected: false, tips: 'A - Z' },
    desc: { selected: false, tips: 'Z - A' },
  },
};

export const SORT_SITES = {
  Sites: {
    value: 'sites',
    asc: { selected: true, tips: 'A - Z' },
    desc: { selected: false, tips: 'Z - A' },
  },
};

export const SORT_SITE = {
  Sites: {
    value: 'site',
    asc: { selected: true, tips: 'A - Z' },
    desc: { selected: false, tips: 'Z - A' },
  },
};

export const SORT_SCREENS = {
  Screens: {
    value: 'screens',
    asc: { selected: true, tips: 'A - Z' },
    desc: { selected: false, tips: 'Z - A' },
  },
};
export const SORT_SEATS = {
  Seats: {
    value: 'seats',
    asc: { selected: true, tips: 'A - Z' },
    desc: { selected: false, tips: 'Z - A' },
  },
};

export const LANGUAGES = {
  'en-US': 'English',
  'zh-CN': '简体中文',
};

export const LANGUAGES_FOR_VUETIFY = {
  'en-US': 'en',
  'zh-CN': 'zhHans',
};
