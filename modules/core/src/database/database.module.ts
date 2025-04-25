import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigurableModuleClass,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} from './database.definition-module';

@Module({})
export class DatabaseModule extends ConfigurableModuleClass {
  static forRoot(options: typeof OPTIONS_TYPE) {
    return {
      ...super.forRoot(options),
    };
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE) {
    return {
      ...super.forRootAsync(options),
    };
  }
}
