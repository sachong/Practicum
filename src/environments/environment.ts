export const environment = {
  production: false,
  DefaultRoute: '/map',
  Uri: 'http://localhost:4200',
  IssuerUri: 'https://accounts.google.com',
  ClientId: '',
  Scope: 'openid profile email', // 'invalid': roles, billingtime, offline_access
  response_type: 'access_token',
  Access_Type: 'offline',
  Prompt: 'consent',
  ApiUri: 'http://localhost:5005',
  AllowedRoles: ['Admin', 'Analyst', 'HRAdmin', 'TeamLeader'], // TODO: Add role check
  ClientSecret: '',
  showDebugInfo: false,
  clearHashAfterLogin: false,
  waitForToken: 3000,
  version: "v1.0.0"
};
