function getEnvironmentVariable(name: string) {
  const envVar = process.env['REACT_APP_' + name];
  if (envVar !== undefined) {
    return envVar;
  } else {
    throw new Error(`
      Error parsing environmental config from .env
      Unable to get value for variable name: ${name}
      Once this is fixed you will need to re-build/restart the server
    `);
  }
}

export const Config = {
  serverBaseUrl: getEnvironmentVariable('API_SERVER_HOST'),
};
