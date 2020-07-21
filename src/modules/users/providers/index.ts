import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHachProvider from './HashProvider/implementations/BCriptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHachProvider);
