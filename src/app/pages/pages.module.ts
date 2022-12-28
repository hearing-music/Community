import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
// import { DashboardModule } from './dashboard/dashboard.module';
// import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
// Module
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
// page
import { FreeSongsComponent } from './kugou/free-songs/free-songs.component';
import { SearchSongsComponent } from './search-songs/search-songs.component';
import { QuerySonglistComponent } from './query-songlist/query-songlist.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { KugouSoaringComponent } from './kugou/kugou-soaring/kugou-soaring.component';
import { DouyinComponent } from './douyin/douyin.component';
import { IdentificationComponent } from './identification/identification.component';
import { ConverterComponent } from './converter/converter.component';
import { CopyrightScanningComponent } from './copyright-scanning/copyright-scanning.component';
// componet
import { QqComponent } from './search-songs/qq/qq.component';
import { V3Component } from './search-songs/v3/v3.component';
import { WangyiyunComponent } from './search-songs/wangyiyun/wangyiyun.component';
import { KuwoComponent } from './search-songs/kuwo/kuwo.component';
import { LsddComponent } from './search-songs/lsdd/lsdd.component';
import { MusicianTxComponent } from './search-page/musician-tx/musician-tx.component';
import { SearchComponent } from '../components/search/search.component';
import { IconsProviderModule } from './icons-provider.module';
import { LoadingComponent } from '../components/loading/loading.component';
import { UploadFileComponent } from '../components/upload-file/upload-file.component';
import { LyricComponent } from '../components/lyric/lyric.component';
import { BrandUserComponent } from './search-page/brand-user/brand-user.component';
import { Sing5Component } from './search-page/sing5/sing5.component';
import { WangyisixinComponent } from './search-page/wangyisixin/wangyisixin.component';
import { CopyrightSearchComponent } from './copyright-scanning/copyright-search/copyright-search.component';
import { CopyrightCheckComponent } from './copyright-scanning/copyright-check/copyright-check.component';
import { YinghuoComponent } from './kugou/yinghuo/yinghuo.component';
import { NotOpenComponent } from '../components/not-open/not-open.component';
import { LsddPageComponent } from './lsdd-page/lsdd-page.component';
import { TemplateComponent } from './lsdd-page/template/template.component';
import { KuaishouSearchindexComponent } from './kuaishou-searchindex/kuaishou-searchindex.component';
import { CopyrightLinkComponent } from './copyright-scanning/copyright-link/copyright-link.component';
import { TrackSeparateComponent } from './track-separate/track-separate.component';
import { MusiryToolsComponent } from './musiry-tools/musiry-tools.component';
@NgModule({
  imports: [
		NzMessageModule,
		NzModalModule,
		NzToolTipModule,
		NzTableModule,
		NzPaginationModule,
		NzEmptyModule,
		NzButtonModule,
		NzSelectModule,
		FormsModule,
		IconsProviderModule,
		
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    // DashboardModule,
    // ECommerceModule,
    MiscellaneousModule,
  ],
  declarations: [
    PagesComponent,
    FreeSongsComponent,
    SearchSongsComponent,
	SearchPageComponent,
	QuerySonglistComponent,
	KugouSoaringComponent,
	DouyinComponent,
	IdentificationComponent,
	ConverterComponent,
	CopyrightScanningComponent,
	
	
	
	
	QqComponent,
	V3Component,
	WangyiyunComponent,
	KuwoComponent,
	LsddComponent,
	MusicianTxComponent,
	SearchComponent,
	LoadingComponent,
	UploadFileComponent,
	LyricComponent,
	NotOpenComponent,
 BrandUserComponent,
 Sing5Component,
 WangyisixinComponent,
 CopyrightSearchComponent,
 CopyrightCheckComponent,
 YinghuoComponent,
 LsddPageComponent,
 TemplateComponent,
 KuaishouSearchindexComponent,
 CopyrightLinkComponent,
 TrackSeparateComponent,
 MusiryToolsComponent,
  ],
})
export class PagesModule {
}
