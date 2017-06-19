import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';


@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	// make HelloIonicPage the root (or first) page
	rootPage = 'Home';
	constructor(
		public platform: Platform,
		public menu: MenuController,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		public oneSignal: OneSignal
		) {
			this.initializeApp();
		// set our app's pages
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			//this.splashScreen.hide();
			this.oneSignal.startInit('14329b21-a897-4ac0-a890-4a654ca205c8', '359994574227');
			this.oneSignal.inFocusDisplaying(2);
			this.oneSignal.endInit();
		});
	}

	/*openPage(page) {
		// close the menu when clicking a link from the menu
		this.menu.close();
		// navigate to the new page if it is not the current page
		this.nav.setRoot(page.component);
	}*/

}
