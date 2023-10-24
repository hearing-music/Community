/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
	// NbChatModule,
	NbDatepickerModule,
	NbDialogModule,
	NbMenuModule,
	NbSidebarModule,
	NbToastrModule,
	NbWindowModule,
} from '@nebular/theme';
import {SiderbarIconModule} from './siderbarIcon.module'
// import { NZ_I18N } from 'ng-zorro-antd/i18n';
// import { zh_CN } from 'ng-zorro-antd/i18n';
// import { registerLocaleData } from '@angular/common';
// import zh from '@angular/common/locales/zh';
// ----
import { FormsModule } from '@angular/forms';
// -------------
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ApiService } from './services/api.service';
import { CommonService } from './services/common.service';
import { AuthService } from './services/auth.service';
import { SocketService } from './services/socket.service';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzMessageModule } from 'ng-zorro-antd/message';
// registerLocaleData(zh);

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		NbSidebarModule.forRoot(),
		NbMenuModule.forRoot(),
		SiderbarIconModule,
		NbDatepickerModule.forRoot(),
		NbDialogModule.forRoot(),
		NbWindowModule.forRoot(),
		NbToastrModule.forRoot(),
		// NbChatModule.forRoot({
		// 	messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
		// }),
		CoreModule.forRoot(),
		ThemeModule.forRoot(),
		FormsModule,
		NzMessageModule,
		NzNotificationModule
	],
	bootstrap: [AppComponent],
	// providers: [
	// 	// { provide: NZ_I18N, useValue: zh_CN },

	// 	CommonService,
	// 	ApiService,
	// 	{
	// 		provide: HTTP_INTERCEPTORS,
	// 		useClass: HttpInterceptorService,
	// 		multi: true,
	// 	}
	// ],
	providers: [
		CommonService,
		ApiService,
		AuthService,
		SocketService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpInterceptorService,
			multi: true,
		},
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		}
	]
})
export class AppModule { }
// export class AppModule { 
// 	constructor(private library: NbIconLibraries, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
// 		this.matIconRegistry.addSvgIcon('my_icon', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/age.svg'));
// 		 this.matIconRegistry.setDefaultFontSetClass('material-icons-outlined');
// 		  }
// 	}
