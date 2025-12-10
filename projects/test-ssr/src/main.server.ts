import { REQUEST } from '@angular/core';
import {
  bootstrapApplication,
  BootstrapContext,
} from '@angular/platform-browser';

import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) => {
  const injector = context.platformRef.injector;
  const request = injector.get(REQUEST);
  console.log({ context, request });
  return bootstrapApplication(App, config, context);
};

export default bootstrap;
