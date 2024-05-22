let config = {
  url: 'https://swapi.py4e.com/api',
  logsEnabled: true,
};

if (__DEV__) {
  config = {
    ...config,
  };
}

if (!__DEV__) {
  config = {
    ...config,
    logsEnabled: false,
  };
}

export default config;
