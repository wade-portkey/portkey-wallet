import { Container } from 'inversify';
import { TYPES } from '@portkey/rn-sdk/src/service/core/types';
import { IPortkeyAccountService, IPortkeyUIManagerService } from '@portkey/rn-sdk/src/service/core/base';
import { PortkeyAccountService } from '@portkey/rn-sdk/src/service/core/account';
import { UIManagerService } from '@portkey/rn-sdk/src/service/ui';

const myContainer = new Container();
myContainer.bind<IPortkeyAccountService>(TYPES.AccountModule).to(PortkeyAccountService);
myContainer.bind<IPortkeyUIManagerService>(TYPES.UIManagerModule).to(UIManagerService);

export { myContainer };
