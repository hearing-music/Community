import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { FreeSongsComponent } from './kugou/free-songs/free-songs.component';
import { SearchSongsComponent } from './search-songs/search-songs.component';
import { QuerySonglistComponent } from './query-songlist/query-songlist.component';
import { KugouSoaringComponent } from './kugou/kugou-soaring/kugou-soaring.component';
import { YinghuoComponent } from './kugou/yinghuo/yinghuo.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { DouyinComponent } from './douyin/douyin.component';
import { LsddComponent } from './lsdd/lsdd.component';
import { ConverterComponent } from './converter/converter.component';
import { IdentificationComponent } from './identification/identification.component';
import { CopyrightScanningComponent } from './copyright-scanning/copyright-scanning.component';
// import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
const routes: Routes = [{
	path: '',
	component: PagesComponent,
	children: [
		//音乐搜索
		{
			path: 'search-songs',
			component: SearchSongsComponent
		},
		// 查询歌单
		{
			path: 'query-songlist',
			component: QuerySonglistComponent
		},
		// 搜索
		{
			path: 'search-page',
			component: SearchPageComponent
		},
		// 酷狗 酷狗飙升
		{
			path: 'kugou/kugou-soaring',
			component: KugouSoaringComponent
		},
		// 酷狗萤火
		{
			path: 'kugou/yinghuo',
			component: YinghuoComponent
		},
		// 酷狗免费歌曲
		{
			path: 'kugou/free-songs',
			component: FreeSongsComponent
		},
		// 抖音
		{
			path: 'douyin',
			component: DouyinComponent
		},
		// 抖音
		{
			path: 'lsdd',
			component: LsddComponent
		},
		// 文件转换
		{
			path: 'converter',
			component: ConverterComponent
		},
		//听歌识曲
		{
			path: 'identification',
			component: IdentificationComponent
		},
		//版权扫描
		{
			path: 'copyright-scanning',
			component: CopyrightScanningComponent
		},
		// {
		//   path: 'dashboard',
		//   component: ECommerceComponent,
		// },
		// {
		//   path: 'iot-dashboard',
		//   component: DashboardComponent,
		// },
		// {
		//   path: 'ui-features',
		//   loadChildren: () => import('./ui-features/ui-features.module')
		//     .then(m => m.UiFeaturesModule),
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
