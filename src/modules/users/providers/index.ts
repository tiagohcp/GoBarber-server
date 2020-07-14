import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProviser';
import BCryptHachProvider from './HashProvider/implementations/BCriptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHachProvider);
