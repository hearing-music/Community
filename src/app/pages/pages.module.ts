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
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LoadingModule } from '../components/loading/loading.module'
// page
import { FreeSongs_kugouComponent } from './kugou/free-songs/free-songs.component';
import { FreeSongs_qqComponent } from './qq/free-songs/free-songs.component';
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
import { UploadFileComponent } from '../components/upload-file/upload-file.component';
import { LyricComponent } from '../components/lyric/lyric.component';
import { LyricAllComponent } from '../components/lyric-all/lyric-all.component';
import { BrandUserComponent } from './search-page/brand-user/brand-user.component';
import { Sing5Component } from './search-page/sing5/sing5.component';
import { WangyisixinComponent } from './search-page/wangyisixin/wangyisixin.component';
import { ChatgptComponent } from './chatgpt/chatgpt.component';
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
import { AudioTrickComponent } from '../components/audio-trick/audio-trick.component';
import { ToolComponent } from './tool/tool.component';
import { BankComponent } from './tool/bank/bank.component';
import { ProcessComponent } from './tool/process/process.component';
import { JsonFormatComponent } from './tool/json-format/json-format.component';
import { MonitorComponent } from './tool/monitor/monitor.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { SetRankingComponent } from './qq_kugou-ranking/set-ranking/set-ranking.component';
import { GetRankingComponent } from './qq_kugou-ranking/get-ranking/get-ranking.component';
import { DjComponent } from './kuaishou-searchindex/dj/dj.component';
@NgModule({
	imports: [
		LoadingModule,
		NzMessageModule,
		NzModalModule,
		NzToolTipModule,
		NzTableModule,
		NzPaginationModule,
		NzEmptyModule,
		NzButtonModule,
		NzSelectModule,
		NzCheckboxModule,
		NzSliderModule,
		NzSwitchModule,
		NzSpinModule,
		NzCollapseModule,
		FormsModule,
		IconsProviderModule,
		PagesRoutingModule,
		ThemeModule,
		NbMenuModule,
		// DashboardModule,
		// ECommerceModule,
		MiscellaneousModule,
		NzProgressModule
	],
	declarations: [
		PagesComponent,
		FreeSongs_kugouComponent,
		FreeSongs_qqComponent,
		SearchSongsComponent,
		SearchPageComponent,
		QuerySonglistComponent,
		KugouSoaringComponent,
		DouyinComponent,
		ChatgptComponent,
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
		UploadFileComponent,
		LyricComponent,
		LyricAllComponent,
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
		AudioTrickComponent,
		ToolComponent,
		BankComponent,
		ProcessComponent,
		MonitorComponent,
		JsonFormatComponent,
  SetRankingComponent,
  GetRankingComponent,
  DjComponent,
	],
})
export class PagesModule {
}
