import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { OneSignal } from '@ionic-native/onesignal';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const fireBaseConfig = {
	apiKey: "AIzaSyDfYYhcjSKPv_IP2hmgt8xezAX0pD0iLRc",
	authDomain: "king-burrito.firebaseapp.com",
	databaseURL: "https://king-burrito.firebaseio.com",
	projectId: "king-burrito",
	storageBucket: "king-burrito.appspot.com",
	messagingSenderId: "359994574227"
};

@NgModule({
	declarations: [
		MyApp,
	],
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp(fireBaseConfig),
		AngularFireDatabaseModule,
		IonicModule.forRoot(MyApp),
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
	],
	providers: [
		StatusBar,
		SplashScreen,
		InAppBrowser,
		SocialSharing,
		OneSignal,
		{provide: ErrorHandler, useClass: IonicErrorHandler}
	]
})
export class AppModule {}
