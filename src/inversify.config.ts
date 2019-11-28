import { Container, ContainerModule } from 'inversify';
import { TYPES } from './inversify.types';
import { DatabaseClient, Logger } from './utilities';
import { container as dataContainer } from './dataAccess';
import { container as useContainer } from './useCases';

export const InversifyContainer = (databaseClient: DatabaseClient, logger: Logger): Container => {
  const InversifyContainer: Container = new Container({ skipBaseClassChecks: true });

  const utilitiesContainer = new ContainerModule((bind) => {
    bind<DatabaseClient>(TYPES.DatabaseClient).toConstantValue(databaseClient);
    bind<Logger>(TYPES.Logger).toConstantValue(logger);
  });

  InversifyContainer.load(utilitiesContainer);
  InversifyContainer.load(dataContainer);
  InversifyContainer.load(useContainer);

  return InversifyContainer;
};
