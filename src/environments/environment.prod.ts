import { Environment } from './environment.model';

class EnvironmentImpl implements Environment {
  public readonly production = true;
  public readonly API_URL = '/';
}

export const environment = new EnvironmentImpl();
