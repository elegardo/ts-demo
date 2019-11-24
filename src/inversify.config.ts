import { Container, ContainerModule } from 'inversify';
import { Client } from 'pg';
import { Logger } from 'pino';
import { TYPES } from './inversify.types';
import { container as dataContainer } from './data-access';
import { container as useContainer } from './use-cases';

export const appContainer = (client: Client, logger: Logger): Container => {
    const appContainer: Container = new Container({ skipBaseClassChecks: true });

    const thirdPartyDependencies = new ContainerModule(bind => {
        bind<Client>(TYPES.Client).toConstantValue(client);
        bind<Logger>(TYPES.Logger).toConstantValue(logger);
    });

    appContainer.load(thirdPartyDependencies);
    appContainer.load(dataContainer);
    appContainer.load(useContainer);

    return appContainer;
};
