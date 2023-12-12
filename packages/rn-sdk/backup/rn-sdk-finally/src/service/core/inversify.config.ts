import { Container } from 'inversify';
import { TYPES } from 'service/core/types';
import { IPortkeyAccountService, IPortkeyUIManagerService } from 'service/core/base';
import { PortkeyAccountService } from 'service/core/account';
import { UIManagerService } from 'service/ui';

const myContainer = new Container();
myContainer.bind<IPortkeyAccountService>(TYPES.AccountModule).to(PortkeyAccountService);
myContainer.bind<IPortkeyUIManagerService>(TYPES.UIManagerModule).to(UIManagerService);

export { myContainer };
