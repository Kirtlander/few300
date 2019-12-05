import { Environment } from './model';

// ng build --env=qa

// there were also changes in angular.json corresponding to the qa environment

export const environment: Environment = {
  production: true,
  rootApiUrl: 'some qa url'
};
