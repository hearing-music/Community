import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { FreeSongs_kugouComponent } from './kugou/free-songs/free-songs.component';
import { FreeSongs_qqComponent } from './qq/free-songs/free-songs.component';
import { SearchSongsComponent } from './search-songs/search-songs.component';
import { QuerySonglistComponent } from './query-songlist/query-songlist.component';
import { KugouSoaringComponent } from './venus/kugou-soaring/kugou-soaring.component';
import { AutoSearchComponent } from './kugou/auto-search/auto-search.component';
import { EnlightenmentComponent } from './venus/enlightenment/enlightenment.component'
import { JianyingComponent } from './jianying/jianying.component'
import { YinghuoComponent } from './kugou/yinghuo/yinghuo.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { DouyinListComponent } from './douyin/douyin-list/douyin-list.component';
// import { DouyinHotComponent } from './douyin/douyin-hot/douyin-hot.component';
import { DouyinVideoComponent } from './douyin/douyin-video/douyin-video.component';
import { DouyinDarenComponent } from './douyin/douyin-daren/douyin-daren.component';
import { DouyinListenDarenComponent } from './douyin/douyin-listenDaren/douyin-listenDaren.component';
import { DouyinListenVideoComponent } from './douyin/douyin-listenVideo/douyin-listenVideo.component';
import { DouyinAssayVideoComponent } from './douyin/douyin-assayVideo/douyin-assayVideo.component';
import { DouyinPopularAccountsComponent } from "./douyin/douyin-popular-accounts/douyin-popular-accounts.component";
import { DouyinSoundSourceComponent } from './douyin/douyin-soundSource/douyin-soundSource.component';
import { DouyinListenSoundSourceComponent } from './douyin/douyin-listenSoundSource/douyin-listenSoundSource.component';
import {kuaishouPotentialComponent} from './kuaishou-searchindex/kuaishou-potential/kuaishou-potential.component'
import { RisingHotComponent } from "./douyin/rising-hot/rising-hot.component";
import { LsddPageComponent } from './lsdd-page/lsdd-page.component';
import { ChatgptComponent } from './chatgpt/chatgpt.component';
import { FufuBillboardComponent } from './fufuleida/fufu-billboard/fufu-billboard.component'
import { KuaishouSearchindexComponent } from './kuaishou-searchindex/kuaishou-searchindex.component';
import { IdentificationComponent } from './identification/identification.component';
import { CopyrightScanningComponent } from './copyright-scanning/copyright-scanning.component';
import { TrackSeparateComponent } from './track-separate/track-separate.component';
import { GetRankingComponent } from './qq_kugou-ranking/get-ranking/get-ranking.component';
import { SetRankingComponent } from './qq_kugou-ranking/set-ranking/set-ranking.component';
import { OriginalAudioComponent } from './original-audio/original-audio.component';
// import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DjComponent } from './kuaishou-searchindex/dj/dj.component';
import { VolumeOfUseComponent } from './kuaishou-searchindex/volumeOfUse/volumeOfUse.component';
import { SourcePhotoComponent } from './kuaishou-searchindex/source-photo/source-photo.component';
import { PermissionGuard } from '../guards/permission.guard'
import { ToolComponent } from './tool/tool.component';
import { WhisperComponent } from './whisper/whisper.component';
import { PhotoIdentifyingTextComponent } from './photo-identifying-text/photo-identifying-text.component';
// import { XilixiliComponent } from './xilixili/xilixili.component';
import { OggToMp3Component } from './audio-conversion/ogg-to-mp3/ogg-to-mp3.component'
import { MggToWavComponent } from './audio-conversion/mgg-to-wav/mgg-to-wav.component'
import { RadarComponent } from './radar/radar.component'
import { ToMvComponent } from './to-mv/to-mv.component';
import { QqLabelComponent } from './qq/qq-label/qq-label.component';
import { SingerLabelComponent } from './qq/qq-label/singer-label/singer-label.component';
import { SongListLabelComponent } from './qq/qq-label/song-list-label/song-list-label.component';
import { MermaidComponent } from './mermaid/mermaid.component';
import { RiseRankingComponent } from './yuntu/riseRanking/riseRanking.component';
import { SpecialEffectsQueryComponent } from './kuaishou-searchindex/special-effects-query/special-effects-query.component';
import { SwollenKsEeListComponent } from './kuaishou-searchindex/swollen-ks-ee-list/swollen-ks-ee-list.component';
import { SongRoomComponent } from "./game/song-room/song-room.component";
import { DouDiZhuComponent } from "./game/dou-di-zhu/dou-di-zhu.component";
import { CardGameComponent } from "./game/card-game/card-game.component";
const routes: Routes = [{
	path: '',
	component: PagesComponent,
	children: [
		//音乐搜索
		{
			path: 'search-songs/:path/:value',
			component: SearchSongsComponent,
			canActivate: [PermissionGuard]
		},
		{ path: 'search-songs', component: SearchSongsComponent,canActivate: [PermissionGuard] },
		// {
		// 	path: 'search-songs',
		// 	redirectTo: 'search-songs/_/_',
		// },
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
		// qq 标签
		{
			path: 'qq/qq-label',
			component: QqLabelComponent,
			canActivate: [PermissionGuard]
		},
		// 歌手标签
		{
			path: 'qq/qq-label/singerLabel/:id',
			component: SingerLabelComponent,
			canActivate: [PermissionGuard]
		},
		// 歌单标签
		{
			path: 'qq/qq-label/songListLabel/:id',
			component: SongListLabelComponent,
			canActivate: [PermissionGuard]
		},
		// 酷狗萤火
		{
			path: 'kugou/yinghuo',
			component: YinghuoComponent,
			canActivate: [PermissionGuard]
		},
		// 酷狗自动搜索
		{
			path: 'kugou/auto-search',
			component: AutoSearchComponent,
			canActivate: [PermissionGuard]
		},
		// 酷狗免费歌曲
		{
			path: 'kugou/free-songs',
			component: FreeSongs_kugouComponent,
			canActivate: [PermissionGuard]
		},
		// 抖音热点
		// {
		// 	path: 'douyin/douyin-hot',
		// 	component: DouyinHotComponent,
		// 	canActivate: [PermissionGuard]
		// },
		      //抖音热门账号
		      {
		        path: "douyin/douyin-popular-accounts",
		        component: DouyinPopularAccountsComponent,
		        canActivate: [PermissionGuard],
		      },
		// 抖音榜单
		{
			path: 'douyin/douyin-list',
			component: DouyinListComponent,
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
		// 上升热点搜索
		{
			path: 'douyin/douyin-rising-hot',
			component: RisingHotComponent,
			canActivate: [PermissionGuard]
		},
		// 抖音视频监控
		{
			path: 'douyin/douyin-listenVideo',
			component: DouyinListenVideoComponent,
			canActivate: [PermissionGuard]
		},
		// 抖音 视频分析
		{
			path: 'douyin/douyin-assayVideo',
			component: DouyinAssayVideoComponent,
			canActivate: [PermissionGuard]
		},
		// 抖音声源查询
		{
			path: 'douyin/douyin-soundSource',
			component: DouyinSoundSourceComponent,
			canActivate: [PermissionGuard]
		},
		// 抖音获取监控声源
		{
			path: 'douyin/douyin-listenSoundSource',
			component: DouyinListenSoundSourceComponent,
			canActivate: [PermissionGuard]
		},
		//云图 由你涨幅排名
		{
			path: 'yuntu/riseRanking',
			component: RiseRankingComponent,
			canActivate: [PermissionGuard]
		},
		//浮浮雷达
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
		//快手素材
		{
			path: 'sourcePhoto',
			component: SourcePhotoComponent,
			canActivate: [PermissionGuard]
		},
		//快手音频使用量
		{
			path:'kuaishouVolumeOfUse',
			component: VolumeOfUseComponent,
			canActivate: [PermissionGuard]
		},
		      //快手特效查询
		      {
		        path: "kuaishou-specialEffectsQuery",
		        component: SpecialEffectsQueryComponent,
		        canActivate: [PermissionGuard],
		      },
		      //快手特效监控
		      {
		        path: "kuaishou-SwollenKsEeLis",
		        component: SwollenKsEeListComponent,
		        canActivate: [PermissionGuard],
		      },
		//魔力潜力榜
		      {
		        path: "kuaishou-potential",
		        component: kuaishouPotentialComponent,
		        canActivate: [PermissionGuard],
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
		// 画图
		{
			path: 'mermaid',
			component: MermaidComponent,
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
		//生成mv
		{
			path: 'to-mv',
			component: ToMvComponent,
			canActivate: [PermissionGuard]
		},
		        //原创音频
		        {
		            path: 'original-audio',
		            component: OriginalAudioComponent,
		            canActivate: [PermissionGuard]
		        },
		      //点歌室
		      {
		        path: "song-room",
		        component: SongRoomComponent,
		        canActivate: [PermissionGuard],
		      },
		      {
		        path: "dou-di-zhu",
		        component: DouDiZhuComponent,
		        canActivate: [PermissionGuard],
		      },
		      {
		        path: "card-game",
		        component: CardGameComponent,
		        canActivate: [PermissionGuard],
		      },
		 
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
