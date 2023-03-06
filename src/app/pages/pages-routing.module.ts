import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { FreeSongs_kugouComponent } from './kugou/free-songs/free-songs.component';
import { FreeSongs_qqComponent } from './qq/free-songs/free-songs.component';
import { SearchSongsComponent } from './search-songs/search-songs.component';
import { QuerySonglistComponent } from './query-songlist/query-songlist.component';
import { KugouSoaringComponent } from './kugou/kugou-soaring/kugou-soaring.component';
import { YinghuoComponent } from './kugou/yinghuo/yinghuo.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { DouyinComponent } from './douyin/douyin.component';
import { LsddPageComponent } from './lsdd-page/lsdd-page.component';
import { ConverterComponent } from './converter/converter.component';
import { ChatgptComponent } from './chatgpt/chatgpt.component';
import { KuaishouSearchindexComponent } from './kuaishou-searchindex/kuaishou-searchindex.component';
import { IdentificationComponent } from './identification/identification.component';
import { CopyrightScanningComponent } from './copyright-scanning/copyright-scanning.component';
import { TrackSeparateComponent } from './track-separate/track-separate.component';
import { MusiryToolsComponent } from './musiry-tools/musiry-tools.component';
import { GetRankingComponent } from './qq_kugou-ranking/get-ranking/get-ranking.component';
import { SetRankingComponent } from './qq_kugou-ranking/set-ranking/set-ranking.component';
// import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

import { PermissionGuard } from '../guards/permission.guard'
import { ToolComponent } from './tool/tool.component';
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
		// 酷狗 酷狗飙升
		{
			path: 'kugou/kugou-soaring',
			component: KugouSoaringComponent,
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
		// 抖音
		{
			path: 'douyin',
			component: DouyinComponent,
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
		// 文件转换
		{
			path: 'converter',
			component: ConverterComponent,
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
		// {
		//   path: 'ui-features',
		//   loadChildren: () => import('./ui-features/ui-features.module')
		//     .then(m => m.UiFeaturesModule),
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
