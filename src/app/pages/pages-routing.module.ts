import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { FreeSongs_kugouComponent } from './kugou/free-songs/free-songs.component';
import { FreeSongs_qqComponent } from './qq/free-songs/free-songs.component';
import { SearchSongsComponent } from './search-songs/search-songs.component';
import { QuerySonglistComponent } from './query-songlist/query-songlist.component';
import { KugouSoaringComponent } from './venus/kugou-soaring/kugou-soaring.component';
import { EnlightenmentComponent } from './venus/enlightenment/enlightenment.component'
import {JianyingComponent} from './jianying/jianying.component'
import { YinghuoComponent } from './kugou/yinghuo/yinghuo.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { DouyinHotComponent } from './douyin/douyin-hot/douyin-hot.component';
import { DouyinVideoComponent } from './douyin/douyin-video/douyin-video.component';
import { DouyinDarenComponent } from './douyin/douyin-daren/douyin-daren.component';
import { DouyinListenDarenComponent } from './douyin/douyin-listenDaren/douyin-listenDaren.component';
import { DouyinListenVideoComponent } from './douyin/douyin-listenVideo/douyin-listenVideo.component';
import { LsddPageComponent } from './lsdd-page/lsdd-page.component';
import { ChatgptComponent } from './chatgpt/chatgpt.component';
import {FufuSearchComponent} from './fufuleida/fufu-search/fufu-search.component'
import {FufuBillboardComponent} from './fufuleida/fufu-billboard/fufu-billboard.component'
import { KuaishouSearchindexComponent } from './kuaishou-searchindex/kuaishou-searchindex.component';
import { IdentificationComponent } from './identification/identification.component';
import { CopyrightScanningComponent } from './copyright-scanning/copyright-scanning.component';
import { TrackSeparateComponent } from './track-separate/track-separate.component';
import { MusiryToolsComponent } from './musiry-tools/musiry-tools.component';
import { GetRankingComponent } from './qq_kugou-ranking/get-ranking/get-ranking.component';
import { SetRankingComponent } from './qq_kugou-ranking/set-ranking/set-ranking.component';
// import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DjComponent } from './kuaishou-searchindex/dj/dj.component';
import { SourcePhotoComponent } from './kuaishou-searchindex/source-photo/source-photo.component';
import { PermissionGuard } from '../guards/permission.guard'
import { ToolComponent } from './tool/tool.component';
import { WhisperComponent } from './whisper/whisper.component';
import { PhotoIdentifyingTextComponent } from './photo-identifying-text/photo-identifying-text.component';
// import { XilixiliComponent } from './xilixili/xilixili.component';
import { OggToMp3Component } from './audio-conversion/ogg-to-mp3/ogg-to-mp3.component'
import { MggToWavComponent } from './audio-conversion/mgg-to-wav/mgg-to-wav.component'
import { UserManagementComponent } from './user-management/user-management.component';
import { RadarComponent } from './radar/radar.component'
const routes: Routes = [{
	path: '',
	component: PagesComponent,
	children: [
		//音乐搜索
		{
			path: 'search-songs',
			component: SearchSongsComponent,
			canActivate: [PermissionGuard]
		},
		// 查询歌单
		{
			path: 'query-songlist',
			component: QuerySonglistComponent,
			canActivate: [PermissionGuard]
		},
		// 音轨分离
		{
			path: 'track-separate',
			component: TrackSeparateComponent,
			canActivate: [PermissionGuard]
		},
		// 搜索
		{
			path: 'search-page',
			component: SearchPageComponent,
			canActivate: [PermissionGuard]
		},
		// qq 免费歌曲
		{
			path: 'qq/free-songs',
			component: FreeSongs_qqComponent,
			canActivate: [PermissionGuard]
		},
		// 酷狗萤火
		{
			path: 'kugou/yinghuo',
			component: YinghuoComponent,
			canActivate: [PermissionGuard]
		},
		// 酷狗免费歌曲
		{
			path: 'kugou/free-songs',
			component: FreeSongs_kugouComponent,
			canActivate: [PermissionGuard]
		},
		// 抖音热点
		{
			path: 'douyin/douyin-hot',
			component: DouyinHotComponent,
			canActivate: [PermissionGuard]
		},
		// 抖音达人
		{
			path: 'douyin/douyin-daren',
			component: DouyinDarenComponent,
			canActivate: [PermissionGuard]
		},
		// 抖音监控达人
		{
			path: 'douyin/douyin-listenDaren',
			component: DouyinListenDarenComponent,
			canActivate: [PermissionGuard]
		},
		// 抖音视频搜索
		{
			path: 'douyin/douyin-video',
			component: DouyinVideoComponent,
			canActivate: [PermissionGuard]
		},
		// 抖音视频监控
		{
			path: 'douyin/douyin-listenVideo',
			component: DouyinListenVideoComponent,
			canActivate: [PermissionGuard]
		},
		//浮浮雷达
		{
			path: 'fufu-search',
			component: FufuSearchComponent,
			canActivate: [PermissionGuard]
		},
		{
			path: 'fufu-billboard',
			component: FufuBillboardComponent,
			canActivate: [PermissionGuard]
		},
		// 铃声多多
		{
			path: 'lsdd-page',
			component: LsddPageComponent,
			canActivate: [PermissionGuard]
		},
		// 快手
		{
			path: 'kuaishou-searchindex',
			component: KuaishouSearchindexComponent,
			canActivate: [PermissionGuard]
		},
		//快手dj
		{
			path: 'kuaishouDj',
			component: DjComponent,
			canActivate: [PermissionGuard]
		},
		//素材
		{
			path: 'sourcePhoto',
			component: SourcePhotoComponent,
			canActivate: [PermissionGuard]
		},
		//音频转换oggToMp3
		{
			path: 'oggToMp3',
			component: OggToMp3Component,
			canActivate: [PermissionGuard]
		},
		// mgg - wav
		{
			path: 'mggToWav',
			component: MggToWavComponent,
			canActivate: [PermissionGuard]
		},
		// whisper 歌词识别
		{
			path: 'whisper',
			component: WhisperComponent,
			canActivate: [PermissionGuard]
		},
		// 文字识别
		{
			path: 'photo-identifying-text',
			component: PhotoIdentifyingTextComponent,
			canActivate: [PermissionGuard]
		},
		//听歌识曲
		{
			path: 'identification',
			component: IdentificationComponent,
			canActivate: [PermissionGuard]
		},
		//版权扫描
		{
			path: 'copyright-scanning',
			component: CopyrightScanningComponent,
			canActivate: [PermissionGuard]
		},
		//音乐工具
		{
			path: 'musiry-tools',
			component: MusiryToolsComponent,
			canActivate: [PermissionGuard]
		},
		//工具
		{
			path: 'tool',
			component: ToolComponent,
			canActivate: [PermissionGuard]
		},
		//添加监测歌曲
		{
			path: 'set-ranking/:scid',
			component: SetRankingComponent,
			canActivate: [PermissionGuard]
		},
		{
			path: 'set-ranking',
			redirectTo: 'set-ranking/',
		},
		//查询监测歌曲
		{
			path: 'get-ranking',
			component: GetRankingComponent,
			canActivate: [PermissionGuard]
		},
		//chatgpt
		{
			path: 'chatgpt',
			component: ChatgptComponent,
			canActivate: [PermissionGuard]
		},
		// xilixili
		// {
		// 	path: 'xilixili',
		// 	component: XilixiliComponent,
		// 	canActivate: [PermissionGuard]
		// },
		// 雷达音乐
		{
			path: 'radar',
			component: RadarComponent,
			canActivate: [PermissionGuard]
		},
		// 启明星 酷狗飙升
		{
			path: 'venus/kugou-soaring',
			component: KugouSoaringComponent,
			canActivate: [PermissionGuard]
		},
		// 启明星 qq
		{
			path: 'venus/enlightenment',
			component: EnlightenmentComponent,
			canActivate: [PermissionGuard]
		},
		// 剪映
		{
			path: 'jianying',
			component: JianyingComponent,
			canActivate: [PermissionGuard]
		},
		//用户管理
		// {
		// 	path: 'userManagement',
		// 	component: UserManagementComponent,
		// 	canActivate: [PermissionGuard]
		// },
		// {
		// 	path: 'ui-features',
		// 	loadChildren: () => import('./ui-features/ui-features.module')
		// 		.then(m => m.UiFeaturesModule),
		// },
		// {
		//   path: 'dashboard',
		//   component: ECommerceComponent,
		// },
		// {
		//   path: 'iot-dashboard',
		//   component: DashboardComponent,
		// },
		// {
		//   path: 'layout',
		//   loadChildren: () => import('./layout/layout.module')
		//     .then(m => m.LayoutModule),
		// },
		// {
		//   path: 'forms',
		//   loadChildren: () => import('./forms/forms.module')
		//     .then(m => m.FormsModule),
		// },
		// {
		//   path: 'modal-overlays',
		//   loadChildren: () => import('./modal-overlays/modal-overlays.module')
		//     .then(m => m.ModalOverlaysModule),
		// },
		// {
		//   path: 'extra-components',
		//   loadChildren: () => import('./extra-components/extra-components.module')
		//     .then(m => m.ExtraComponentsModule),
		// },
		// {
		//   path: 'maps',
		//   loadChildren: () => import('./maps/maps.module')
		//     .then(m => m.MapsModule),
		// },
		// {
		//   path: 'charts',
		//   loadChildren: () => import('./charts/charts.module')
		//     .then(m => m.ChartsModule),
		// },
		// {
		//   path: 'editors',
		//   loadChildren: () => import('./editors/editors.module')
		//     .then(m => m.EditorsModule),
		// },
		// {
		//   path: 'tables',
		//   loadChildren: () => import('./tables/tables.module')
		//     .then(m => m.TablesModule),
		// },
		// {
		//   path: 'miscellaneous',
		//   loadChildren: () => import('./miscellaneous/miscellaneous.module')
		//     .then(m => m.MiscellaneousModule),
		// },
		{
			path: '',
			redirectTo: 'search-songs',
			pathMatch: 'full',
		},
		{
			path: '**',
			component: NotFoundComponent,
		},
	],
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule {
}
