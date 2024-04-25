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
import { NgxEchartsModule } from 'ngx-echarts';
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
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { LoadingModule } from '../components/loading/loading.module'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMentionModule } from 'ng-zorro-antd/mention';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
// page
import { DouDiZhuComponent } from "./game/dou-di-zhu/dou-di-zhu.component";
import { CardGameComponent } from "./game/card-game/card-game.component";
import { SongRoomComponent } from "./game/song-room/song-room.component";
import { MaJiangComponent } from "./game/ma-jiang/ma-jiang.component";
import { DouyinPopularAccountsComponent } from "./douyin/douyin-popular-accounts/douyin-popular-accounts.component";
import { OggToMp3Component } from './audio-conversion/ogg-to-mp3/ogg-to-mp3.component';
import { MggToWavComponent } from './audio-conversion/mgg-to-wav/mgg-to-wav.component';
import { FreeSongs_kugouComponent } from './kugou/free-songs/free-songs.component';
import { FreeSongs_qqComponent } from './qq/free-songs/free-songs.component';
import { SearchSongsComponent } from './search-songs/search-songs.component';
import { QuerySonglistComponent } from './query-songlist/query-songlist.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { KugouSoaringComponent } from './venus/kugou-soaring/kugou-soaring.component';
import {EnlightenmentComponent} from './venus/enlightenment/enlightenment.component'
// import { DouyinHotComponent } from './douyin/douyin-hot/douyin-hot.component';
import { DyHotComponent } from './douyin/douyin-list/dy-hot/dy-hot.component';
import { DyYyhComponent } from './douyin/douyin-list/dy-yyh/dy-yyh.component';
import { RisingHotComponent } from "./douyin/rising-hot/rising-hot.component";
import { DyMusicComponent } from './douyin/douyin-list/dy-music/dy-music.component';
import { DyVideoComponent } from './douyin/douyin-list/dy-video/dy-video.component';
import { DouyinListComponent } from './douyin/douyin-list/douyin-list.component';
import { DouyinAssayVideoComponent } from './douyin/douyin-assayVideo/douyin-assayVideo.component';
import { DouyinVideoComponent } from './douyin/douyin-video/douyin-video.component';
import { DouyinDarenComponent } from './douyin/douyin-daren/douyin-daren.component';
import { DouyinListenDarenComponent } from './douyin/douyin-listenDaren/douyin-listenDaren.component';
import { DouyinListenVideoComponent } from './douyin/douyin-listenVideo/douyin-listenVideo.component';
import { DouyinSoundSourceComponent } from './douyin/douyin-soundSource/douyin-soundSource.component';
import { DouyinListenSoundSourceComponent } from './douyin/douyin-listenSoundSource/douyin-listenSoundSource.component';
import { IdentificationComponent } from './identification/identification.component';
import { CopyrightScanningComponent } from './copyright-scanning/copyright-scanning.component';
import { RadarComponent } from './radar/radar.component';
import { FufuSearchComponent } from './search-songs/fufu-search/fufu-search.component';
import { FufuHotComponent } from './search-songs/fufu-hot/fufu-hot.component';
import { FufuSingerComponent } from './search-songs/fufu-singer/fufu-singer.component';
import { CopyrightComponent } from './search-songs/copyright/copyright.component';
import { ISRCComponent } from './search-songs/ISRC/ISRC.component'
import { FufuBillboardComponent } from './fufuleida/fufu-billboard/fufu-billboard.component';
import { JianyingComponent } from './jianying/jianying.component';
import { ToMvComponent } from './to-mv/to-mv.component';
import { RiseRankingComponent } from './yuntu/riseRanking/riseRanking.component';
import { RiseRankingTempComponent } from './yuntu/riseRanking/riseRankingTemp/riseRankingTemp.component';
import { YunjiaobenComponent } from './yunjiaoben/yunjiaoben.component';
// componet
import { ChatTempComponent } from './game/song-room/chatTemp/chatTemp.component';
import { SpecialEffectsQueryComponent } from './kuaishou-searchindex/special-effects-query/special-effects-query.component';
import { SwollenKsEeListComponent } from './kuaishou-searchindex/swollen-ks-ee-list/swollen-ks-ee-list.component';
import { KuaishouVideoDetailsComponent } from './kuaishou-searchindex/kuaishou-videoDetails/kuaishou-videoDetails.component';
import {DyHotDetailComponent} from '../components/dyHotDetail/dyHotDetail.component'
import {DyVideoTrendComponent} from '../components/dyVideoTrend/dyVideoTrend.component'
import {DyAuthorComponent} from '../components/dyAuthor/dyAuthor.component'
import { ArtistVisualizationComponent } from './search-page/artist-visualization/artist-visualization.component';
import { OriginalAudioComponent } from './original-audio/original-audio.component';
import { MermaidComponent } from './mermaid/mermaid.component';
import {EnlightenmentSongsComponent} from './venus/enlightenment-songs/enlightenment-songs.component'
import { EnlightenmentTop20Component} from './search-songs/enlightenment-top20/enlightenment-top20.component'
import { QqComponent } from './search-songs/qq/qq.component';
import { QqPhoneComponent } from './search-songs/qq-phone/qq-phone.component'
import { V3Component } from './search-songs/v3/v3.component';
import { NewV3Component } from './search-songs/newV3/newV3.component';
import { V3PhoneComponent } from './search-songs/v3-phone/v3-phone.component';
import { WangyiyunComponent } from './search-songs/wangyiyun/wangyiyun.component';
import { WangyiyunPhoneComponent } from './search-songs/wangyiyun-phone/wangyiyun-phone.component';
import { MusicianTxPhoneComponent } from './search-songs/musician-tx-phone/musician-tx-phone.component';
import { KuwoComponent } from './search-songs/kuwo/kuwo.component';
import { KuwoPhoneComponent } from './search-songs/kuwo-phone/kuwo-phone.component';
// import { LsddComponent } from './search-songs/lsdd/lsdd.component';
import { MusicianTxComponent } from './search-page/musician-tx/musician-tx.component';
import { SearchComponent } from '../components/search/search.component';
import { IconsProviderModule } from './icons-provider.module';
import { UploadFileComponent } from '../components/upload-file/upload-file.component';
import { LyricComponent } from '../components/lyric/lyric.component';
import {BloggerVideosComponent} from '../components/bloggerVideos/bloggerVideos.component'
import { LyricAllComponent } from '../components/lyric-all/lyric-all.component';
import { BrandUserComponent } from './search-page/brand-user/brand-user.component';
import { BrandSongQqComponent } from "./search-page/brand-song/brand-song-qq/brand-song-qq.component";
import { BrandSongKgComponent } from "./search-page/brand-song/brand-song-kg/brand-song-kg.component";
import { Sing5Component } from './search-page/sing5/sing5.component';
import { WangyisixinComponent } from './search-page/wangyisixin/wangyisixin.component';
import { ChatgptComponent } from './chatgpt/chatgpt.component';
import { CopyrightSearchComponent } from './copyright-scanning/copyright-search/copyright-search.component';
import { CopyrightCheckComponent } from './copyright-scanning/copyright-check/copyright-check.component';
import { YinghuoComponent } from './kugou/yinghuo/yinghuo.component';
import { AutoSearchComponent } from './kugou/auto-search/auto-search.component';
import { NotOpenComponent } from '../components/not-open/not-open.component';
import { LsddPageComponent } from './lsdd-page/lsdd-page.component';
import { TemplateComponent } from './lsdd-page/template/template.component';
import { KuaishouSearchindexComponent } from './kuaishou-searchindex/kuaishou-searchindex.component';
import {kuaishouPotentialComponent} from './kuaishou-searchindex/kuaishou-potential/kuaishou-potential.component'
import { CopyrightLinkComponent } from './copyright-scanning/copyright-link/copyright-link.component';
import { AudioTrickComponent } from '../components/audio-trick/audio-trick.component';
import { ToolComponent } from './tool/tool.component';
import { BankComponent } from './tool/bank/bank.component';
import { ProcessComponent } from './tool/process/process.component';
import { WhisperComponent } from './whisper/whisper.component';
import { PhotoIdentifyingTextComponent } from './photo-identifying-text/photo-identifying-text.component';
import { JsonFormatComponent } from './tool/json-format/json-format.component';
import { MonitorComponent } from './tool/monitor/monitor.component';
import { PdfToWordComponent } from './tool/pdfToWord/pdfToWord.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { SetRankingComponent } from './qq_kugou-ranking/set-ranking/set-ranking.component';
import { GetRankingComponent } from './qq_kugou-ranking/get-ranking/get-ranking.component';
import { DjComponent } from './kuaishou-searchindex/dj/dj.component';
import { SourcePhotoComponent } from './kuaishou-searchindex/source-photo/source-photo.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';
// import { XilixiliComponent } from './xilixili/xilixili.component';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { DYComponent } from './radar/dy/dy.component';
import { RSComponent } from './radar/rs/rs.component';
import { WYComponent } from './radar/wy/wy.component';
import { QqLabelComponent } from './qq/qq-label/qq-label.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { SongListLabelComponent } from './qq/qq-label/song-list-label/song-list-label.component';
import { McscSearchCNComponent } from './search-songs/mcsc-search-cn/mcsc-search-cn.component';
import { McscSearchHKComponent } from './search-songs/mcsc-search-hk/mcsc-search-hk.component';
import { McscSearchZGComponent } from './search-songs/mcsc-search-zg/mcsc-search-zg.component';
import { TmeMap_hotComponent } from './search-songs/tme-map/tme-map_hot/tme-map_hot.component';
import { VolumeOfUseComponent } from './kuaishou-searchindex/volumeOfUse/volumeOfUse.component';
import { FindInspirationComponent } from './find-inspiration/find-inspiration.component'
import { TankBattleComponent } from "./game/tank-battle/tank-battle.component";
import { NzCarouselModule } from "ng-zorro-antd/carousel";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NewTankBattleComponent } from './game/new-tank-battle/new-tank-battle.component';

import {AudioProcessingComponent} from './audioProcessing/audioProcessing.component';
import { TrackSeparateComponent } from './audioProcessing/track-separate/track-separate.component';
import { NoiseReductionComponent } from './audioProcessing/noiseReduction/noiseReduction.component';
import {VolumeNormalisationComponent} from './audioProcessing/volumeNormalisation/volumeNormalisation.component';
import {SegmentationComponent} from './audioProcessing/segmentation/segmentation.component'

import { TmeMapComponent } from './tool/tme-map/tme-map.component';
import { EnteredByYouNiComponent } from './tool/entered-by-you-ni/entered-by-you-ni.component'
import { ScriptPromptsComponent } from "./script-prompts/script-prompts.component";
import { ScreenRecordingComponent } from "./screenRecording/screenRecording.component";
import { VideoPlayerComponent } from "../components/videoPlayer/videoPlayer.component";
registerLocaleData(zh);
@NgModule({
	imports: [
		NzCarouselModule,
		NzInputNumberModule,
		NzGridModule,
		LoadingModule,
		NzTabsModule,
		NzDatePickerModule,
		NzMessageModule,
		NzModalModule,
		NzToolTipModule,
		NzTableModule,
		NzPaginationModule,
		NzEmptyModule,
		NzBreadCrumbModule,
		NzButtonModule,
		NzSelectModule,
		NzCheckboxModule,
		NzImageModule,
		NzSliderModule,
		NzRadioModule,
		NzPopconfirmModule,
		NzSwitchModule,
		NzSpinModule,
		NzCollapseModule,
		NgxEchartsModule,
		NzPopoverModule,
		FormsModule,
		IconsProviderModule,
		PagesRoutingModule,
		ThemeModule,
		NbMenuModule,
		// DashboardModule,
		// ECommerceModule,
		MiscellaneousModule,
		NzProgressModule,
		NzDrawerModule,
		NzInputModule,
		NzCardModule,
		NzDropDownModule,
		NzMentionModule,
		NzStepsModule
	],
	declarations: [
		VideoPlayerComponent,
		YunjiaobenComponent,
		TmeMapComponent,
		EnteredByYouNiComponent,
		AudioProcessingComponent,
		ScreenRecordingComponent,
		NoiseReductionComponent,
		ScriptPromptsComponent,
		VolumeNormalisationComponent,
		SegmentationComponent,
		NewTankBattleComponent,
		TankBattleComponent,
		FindInspirationComponent,
		    DouDiZhuComponent,
		    CardGameComponent,
		    SongRoomComponent,
		MaJiangComponent,
		ChatTempComponent,
		DyHotDetailComponent,
		DyVideoTrendComponent,
		DyAuthorComponent,
		ArtistVisualizationComponent,
		MermaidComponent,
		kuaishouPotentialComponent,
		SwollenKsEeListComponent,
		KuaishouVideoDetailsComponent,
		EnlightenmentSongsComponent,
		EnlightenmentTop20Component,
		OggToMp3Component,
		PdfToWordComponent,
		MggToWavComponent,
		PagesComponent,
		FreeSongs_kugouComponent,
		FreeSongs_qqComponent,
		DouyinSoundSourceComponent,
		DouyinListenSoundSourceComponent,
		SearchSongsComponent,
		SearchPageComponent,
		QuerySonglistComponent,
		KugouSoaringComponent,
		AutoSearchComponent,
		EnlightenmentComponent,
		DouyinListComponent,
		SpecialEffectsQueryComponent,
		DouyinPopularAccountsComponent,
		DouyinAssayVideoComponent,
		DyHotComponent,
		RisingHotComponent,
		DyYyhComponent,
		DyMusicComponent,
		DyVideoComponent,
		DouyinVideoComponent,
		RiseRankingComponent,
		RiseRankingTempComponent,
		// DouyinHotComponent,
		DouyinDarenComponent,
		DouyinListenDarenComponent,
		DouyinListenVideoComponent,
		FufuSearchComponent,
		FufuHotComponent,
		FufuSingerComponent,
		CopyrightComponent,
		ISRCComponent,
		FufuBillboardComponent,
		JianyingComponent,
		ChatgptComponent,
		IdentificationComponent,
		CopyrightScanningComponent,
		OriginalAudioComponent,
		RadarComponent,
		QqComponent,
		QqPhoneComponent,
		V3Component,
		NewV3Component,
		V3PhoneComponent,
		WangyiyunComponent,
		WangyiyunPhoneComponent,
		KuwoComponent,
		KuwoPhoneComponent,
		// LsddComponent,
		MusicianTxComponent,
		MusicianTxPhoneComponent,
		SearchComponent,
		UploadFileComponent,
		LyricComponent,
		BloggerVideosComponent,
		LyricAllComponent,
		NotOpenComponent,
		BrandUserComponent,
		BrandSongQqComponent,
		BrandSongKgComponent,
		Sing5Component,
		WangyisixinComponent,
		CopyrightSearchComponent,
		CopyrightCheckComponent,
		YinghuoComponent,
		LsddPageComponent,
		TemplateComponent,
		KuaishouSearchindexComponent,
		VolumeOfUseComponent,
		CopyrightLinkComponent,
		TrackSeparateComponent,
		AudioTrickComponent,
		ToolComponent,
		BankComponent,
		ProcessComponent,
		WhisperComponent,
		PhotoIdentifyingTextComponent,
		MonitorComponent,
		JsonFormatComponent,
		SetRankingComponent,
		GetRankingComponent,
		DjComponent,
		SourcePhotoComponent,
		// XilixiliComponent,
		DYComponent,
		RSComponent,
		WYComponent,
		ToMvComponent,
		QqLabelComponent,
  SongListLabelComponent,
  McscSearchCNComponent,
  McscSearchHKComponent,
  McscSearchZGComponent,
  TmeMap_hotComponent,
	],
})
export class PagesModule {
}
