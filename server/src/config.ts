function getEnvironmentVariable(name: string) {
  const envVar = process.env[name];
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
  port: Number(getEnvironmentVariable('API_SERVER_PORT')),
  host: '0.0.0.0',
};
