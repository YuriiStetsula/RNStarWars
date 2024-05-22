let config = {
  url: '',
};

if (__DEV__) {
  config = {
    ...config,
    url: 'https://swapi.py4e.com/api',
  };
}

if (!__DEV__) {
  config = {
    ...config,
    url: 'https://swapi.py4e.com/api',
  };
}

export default config;
