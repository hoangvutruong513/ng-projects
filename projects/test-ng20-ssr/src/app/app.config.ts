import { isPlatformServer } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  makeStateKey,
  PLATFORM_ID,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  TransferState,
} from '@angular/core';
import {
  provideClientHydration,
  withIncrementalHydration,
  withNoHttpTransferCache,
} from '@angular/platform-browser';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';
import {
  dehydrate,
  DehydratedState,
  hydrate,
  provideTanStackQuery,
  QueryClient,
  withDevtools,
} from '@tanstack/angular-query-experimental';

import { routes } from './app.routes';

const stateKey = makeStateKey<DehydratedState>('tsquery');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
    ),
    provideClientHydration(
      withIncrementalHydration(),
      withNoHttpTransferCache(),
    ),
    provideTanStackQuery(
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }),
      withDevtools(),
    ),
    provideAppInitializer(() => {
      const transferState = inject(TransferState);
      const queryClient = inject(QueryClient);
      const platformId = inject(PLATFORM_ID);
      if (isPlatformServer(platformId)) {
        transferState.onSerialize(stateKey, () => {
          const dehydratedState = dehydrate(queryClient);
          queryClient.clear();
          return dehydratedState;
        });
      } else {
        const hydrateState = transferState.get(stateKey, null);
        hydrate(queryClient, hydrateState);
      }
    }),
  ],
};
