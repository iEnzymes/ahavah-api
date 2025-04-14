import { ConfigService } from '@nestjs/config';

import { IConfigType } from './config.types';

export class TypedConfigService extends ConfigService<IConfigType> {}
