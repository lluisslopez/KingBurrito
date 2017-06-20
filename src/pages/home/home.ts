import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';

import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})
export class Home {
	public url:string = "https://www.toasttab.com/king-burrito-bentonville/v2/online-order";
	public target:string = "_self";
	public options:string = "location=no,toolbar=no";
	margen = "no";
	public banners = [];
	items: FirebaseListObservable<any[]>;
	imgs: any;
	itemFilter=[];
	today = new Date();
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public platform: Platform,
		public splashScreen: SplashScreen,
		public iab: InAppBrowser,
		public socialSharing: SocialSharing,
		public alertController: AlertController,
		public af: AngularFireDatabase,
	) {
		this.items = this.af.list('/messages');
		this.imgs = this.af.list('/uploads');
		this.imgs.forEach(item => {

			this.banners.push({title: item.name, path: item.url})

			this.margen="si";
		});
	}

	ngAfterViewInit(){
		this.platform.ready().then(() => {
			this.splashScreen.hide();
		});
	}

	getDate( date:Date ){
		var day = date.getDate();
		var monthIndex = date.getMonth() + 1;
		var year = date.getFullYear();
		var mes = (monthIndex>9 ? '' : '0') + monthIndex;
		var dia = (day>9 ? '' : '0') + day;
		let myStartDateFormat = year.toString() + mes.toString() +  dia.toString() ;
		return myStartDateFormat;
	}

	 ngOnInit() {
		 this.items = this.af.list('/messages');
		let valor = this.getDate(this.today);

		 this.items.subscribe(items => {
			 this.itemFilter = [];
			 items.forEach(item => {
				 if( (parseInt(valor) >=   parseInt (item.sDate) ) && ( parseInt (valor) <=  parseInt(item.eDate)) ){
					 this.itemFilter.push(item);
				 }
			 });
		 });
	}

	open(){
		const browser = this.iab.create(this.url,  this.target , this.options);
		browser.show();
	}

	socialShare( app ){
		let message = "KING BURRITO";
		let url2 = "https://play.google.com/store/apps/details?id=com.aicitsolutions.kingburrito";

		switch(app) {
			case "facebook": {
				this.socialSharing.shareViaFacebook(message, null, url2).then(() => {
					// Sharing via email is possible
				}).catch(() => {
					// Sharing via email is not possible
				});
			break;
			}
			case "whatsapp": {
				this.socialSharing.shareViaWhatsApp(message, null, url2).then(() => {
					// Sharing via email is possible
				}).catch(() => {
					// Sharing via email is not possible
				});
			break;
			}
			case "twitter": {
				this.socialSharing.shareViaTwitter(message, null, url2).then(() => {
					// Sharing via email is possible
				}).catch(() => {
					// Sharing via email is not possible
				});
			break;
			}
			default: {
				this.socialSharing.shareViaWhatsApp(message, null, url2).then(() => {
					// Sharing via email is possible
				}).catch(() => {
					// Sharing via email is not possible
				});
			break;
			}
		}
	}

}
