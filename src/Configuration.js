const CONFIG = {
  baseUrl: '$VUE_APP_BASE_URL',
  producerUrl: '$VUE_APP_PRODUCER_URL',
  hubUrl: '$VUE_APP_HUB_URL',
  env: '$VUE_APP_ENV',
  version: '$VUE_APP_VERSION',
};

export default function Configuration(name) {
  if (!(name in CONFIG)) {
    console.log(`Configuration: There is no key named "${name}"`);
    return;
  }

  const value = CONFIG[name];

  if (!value) {
    console.log(`Configuration: Value for "${name}" is not defined`);
    return;
  }

  if (value.startsWith('$VUE_APP_')) {
    // value was not replaced, it seems we are in development.
    // Remove $ and get current value from process.env
    const envName = value.substr(1);
    const envValue = process.env[envName];
    if (envValue) {
      return envValue;
    }
    console.log(`Configuration: Environment variable "${envName}" is not defined`);
  } else {
    // value was already replaced, it seems we are in production.
    return value;
  }
}
