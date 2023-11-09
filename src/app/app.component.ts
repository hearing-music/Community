/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
// import { AnalyticsService } from './@core/utils/analytics.service';
// import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  // constructor(private analytics: AnalyticsService, private seoService: SeoService) {
  // }
constructor(private meta: Meta) {
  }
  ngOnInit(): void {
		// https协议 强制转换https
		if(window.location.protocol=='https:'){
			this.meta.addTag({ httpEquiv: 'Content-Security-Policy', content: 'upgrade-insecure-requests'});
		}
		
    // this.analytics.trackPageViews();
    // this.seoService.trackCanonicalChanges();
  }
}
