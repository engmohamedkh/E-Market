import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
/*import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';*/
import { provideNoopAnimations, provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "angular-app-e02ea",
        "appId": "1:1066917064834:web:e597a02c1abfec347e049b",
        "databaseURL": "https://angular-app-e02ea-default-rtdb.firebaseio.com",
        "storageBucket": "angular-app-e02ea.appspot.com",
        "apiKey": "AIzaSyDuZwKDm161PsPBxyw7J_Y_22OeV4hSFpc",
        "authDomain": "angular-app-e02ea.firebaseapp.com", "messagingSenderId": "1066917064834" }))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())), provideAnimations()]
};
