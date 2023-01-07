import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from "../../services/api.service";
import {CommonService} from "../../services/common.service";
@Component({
	selector: 'ngx-search-songs',
	templateUrl: './search-songs.component.html',
	styleUrls: ['./search-songs.component.scss']
})
export class SearchSongsComponent implements OnInit {
	constructor(public api: ApiService,public common: CommonService) { }
	@ViewChild('lyric')
	lyric:any;
	tagList = [{
		name: 'QQ音乐',
		holder: 'qq搜索'
	}, {
		name: '酷狗V3',
		holder: '酷狗V3搜索'
	}, {
		name: '酷我音乐',
		holder: '酷我搜索'
	}, {
		name: '网易云',
		holder: '网易云搜索'
	}, {
		name: '铃声多多',
		holder: '铃声多多搜索'
	}]
	selectItem = 'QQ音乐';
	searchValue = '';
	loading = false;
	searchHolder = "qq搜索";
	wangyiyunList: any[] = []
	wangyiyunPage = 1
	kuwoList: any[] = []
	kuwoPage = 1

	lsddPage = 1;
	lsddList: any[] = []
	qqList: any[] = [
    {
        "id": 97773,
        "mid": "0039MnYb0qxYhV",
        "name": "晴天",
        "time_public": "2003-07-31",
        "singer": {
            "id": 4558,
            "mid": "0025NhlN2yWrP4",
            "name": "周杰伦"
        },
        "pay": {
            "pay_down": 1,
            "pay_month": 1,
            "pay_play": 1
        },
        "price_track": 200,
        "album": {
            "id": 8220,
            "mid": "000MkMni19ClKG",
            "name": "叶惠美"
        },
        "cnt": 44749,
        "todayIndex": 647990,
        "todayRank": 8,
        "yesterdayIndex": 933627,
        "yesterdayRank": 10,
        "indexRate": 0.024970304,
        "rankRate": 0,
        "listenCnt": "100w+",
        "record": {
            "data": [
                "热歌榜 当期排名9 历史在榜409期 最高排名1",
                "K歌金曲榜 当期排名50 历史在榜47期 最高排名38",
                "抖快榜 当期排名4 历史在榜163期 最高排名2",
                "飙升榜 当期排名29 历史在榜289期 最高排名4",
                "听歌识曲榜 当期排名95 历史在榜13期 最高排名9",
                "Q音快手榜 当期排名59 历史在榜8期 最高排名32",
                "流行指数榜 当期排名100 历史在榜245期 最高排名2"
            ],
            "newData": [
                {
                    "date": "20230107",
                    "value": "热歌榜 当期排名9 历史在榜409期 最高排名1",
                    "topID": 26
                },
                {
                    "date": "20230107",
                    "value": "飙升榜 当期排名29 历史在榜289期 最高排名4",
                    "topID": 62
                },
                {
                    "date": "20230105",
                    "value": "抖快榜 当期排名4 历史在榜163期 最高排名2",
                    "topID": 60
                },
                {
                    "date": "20230104",
                    "value": "流行指数榜 当期排名100 历史在榜245期 最高排名2",
                    "topID": 4
                },
                {
                    "date": "20221121",
                    "value": "听歌识曲榜 当期排名95 历史在榜13期 最高排名9",
                    "topID": 67
                },
                {
                    "date": "20220818",
                    "value": "K歌金曲榜 当期排名50 历史在榜47期 最高排名38",
                    "topID": 36
                },
                {
                    "date": "20220630",
                    "value": "Q音快手榜 当期排名59 历史在榜8期 最高排名32",
                    "topID": 74
                }
            ]
        },
        "detail": {
            "company": "杰威尔音乐有限公司",
            "company_id": 2317,
            "albumCompany_id": 2317,
            "albumTotal": 65,
            "albumCompanyName": "杰威尔音乐有限公司",
            "mvTotal": 466
        },
        "commentCount": 185549,
        "col_show": "999w+",
        "col_number": 1000001,
        "musicUrl": "https://dl.stream.qqmusic.qq.com/C400002202B43Cq4V4.m4a?guid=8348972662&vkey=B3F6A8D9D7BF67479F7FDDC8D661F13ECF3A142B2AEA6CFDCFD845BEA55D0B3A6D99A700CB83CDE459CF3B72378F22FDDD0C2BD15AAD9C1A&uin=1712725180&fromtag=120032",
        "topinfo": {},
        "playinfo": {},
        "isPlay": false
    },
    {
        "id": 449201,
        "mid": "00128N3r2SYKMF",
        "name": "兰亭序",
        "time_public": "2008-10-15",
        "singer": {
            "id": 4558,
            "mid": "0025NhlN2yWrP4",
            "name": "周杰伦"
        },
        "pay": {
            "pay_down": 1,
            "pay_month": 1,
            "pay_play": 1
        },
        "price_track": 200,
        "album": {
            "id": 36062,
            "mid": "002Neh8l0uciQZ",
            "name": "魔杰座"
        },
        "cnt": 43114,
        "todayIndex": 655704,
        "todayRank": 5,
        "yesterdayIndex": 997919,
        "yesterdayRank": 6,
        "indexRate": 0.018166253,
        "rankRate": 2,
        "listenCnt": "100w+",
        "record": {
            "data": [
                "Q音快手榜 当期排名93 历史在榜10期 最高排名14",
                "流行指数榜 当期排名46 历史在榜124期 最高排名4",
                "热歌榜 当期排名19 历史在榜285期 最高排名11",
                "K歌金曲榜 当期排名12 历史在榜20期 最高排名12",
                "抖快榜 当期排名2 历史在榜42期 最高排名1",
                "飙升榜 当期排名46 历史在榜200期 最高排名4",
                "国风热歌榜 当期排名32 历史在榜88期 最高排名21",
                "听歌识曲榜 当期排名99 历史在榜39期 最高排名10"
            ],
            "newData": [
                {
                    "date": "20230107",
                    "value": "热歌榜 当期排名19 历史在榜285期 最高排名11",
                    "topID": 26
                },
                {
                    "date": "20230107",
                    "value": "飙升榜 当期排名46 历史在榜200期 最高排名4",
                    "topID": 62
                },
                {
                    "date": "20230105",
                    "value": "国风热歌榜 当期排名32 历史在榜88期 最高排名21",
                    "topID": 65
                },
                {
                    "date": "20230105",
                    "value": "K歌金曲榜 当期排名12 历史在榜20期 最高排名12",
                    "topID": 36
                },
                {
                    "date": "20230105",
                    "value": "抖快榜 当期排名2 历史在榜42期 最高排名1",
                    "topID": 60
                },
                {
                    "date": "20230103",
                    "value": "流行指数榜 当期排名46 历史在榜124期 最高排名4",
                    "topID": 4
                },
                {
                    "date": "20221231",
                    "value": "听歌识曲榜 当期排名99 历史在榜39期 最高排名10",
                    "topID": 67
                },
                {
                    "date": "20220707",
                    "value": "Q音快手榜 当期排名93 历史在榜10期 最高排名14",
                    "topID": 74
                }
            ]
        },
        "detail": {
            "company": "杰威尔音乐有限公司",
            "company_id": 2317,
            "albumCompany_id": 2317,
            "albumTotal": 65,
            "albumCompanyName": "杰威尔音乐有限公司",
            "mvTotal": 466
        },
        "commentCount": 45264,
        "col_show": "999w+",
        "col_number": 1000001,
        "musicUrl": "https://dl.stream.qqmusic.qq.com/C400003VLsik0ztbIb.m4a?guid=8348972662&vkey=DAC1E30DAC0AB726F3136CE5197879DBB8FFBD0A1A4AE664B52ADE02597C45B6D0B4C4771B3D7347780725114273047A48BA3178AF4C0F2E&uin=1712725180&fromtag=120032",
        "topinfo": {},
        "playinfo": {},
        "isPlay": false
    },
    {
        "id": 97759,
        "mid": "0017K7gL4WYnw2",
        "name": "反方向的钟",
        "time_public": "2000-11-07",
        "singer": {
            "id": 4558,
            "mid": "0025NhlN2yWrP4",
            "name": "周杰伦"
        },
        "pay": {
            "pay_down": 1,
            "pay_month": 1,
            "pay_play": 1
        },
        "price_track": 200,
        "album": {
            "id": 8218,
            "mid": "000f01724fd7TH",
            "name": "Jay"
        },
        "cnt": 33376,
        "todayIndex": 507315,
        "todayRank": 17,
        "yesterdayIndex": 749006,
        "yesterdayRank": 19,
        "indexRate": 0.015302616,
        "rankRate": -2,
        "listenCnt": "100w+",
        "record": {
            "data": [
                "K歌金曲榜 当期排名54 历史在榜1期 最高排名54",
                "抖快榜 当期排名6 历史在榜2期 最高排名6",
                "飙升榜 当期排名42 历史在榜208期 最高排名3",
                "流行指数榜 当期排名84 历史在榜120期 最高排名13",
                "热歌榜 当期排名50 历史在榜269期 最高排名12"
            ],
            "newData": [
                {
                    "date": "20230107",
                    "value": "飙升榜 当期排名42 历史在榜208期 最高排名3",
                    "topID": 62
                },
                {
                    "date": "20230107",
                    "value": "热歌榜 当期排名50 历史在榜269期 最高排名12",
                    "topID": 26
                },
                {
                    "date": "20230105",
                    "value": "抖快榜 当期排名6 历史在榜2期 最高排名6",
                    "topID": 60
                },
                {
                    "date": "20230103",
                    "value": "流行指数榜 当期排名84 历史在榜120期 最高排名13",
                    "topID": 4
                },
                {
                    "date": "20220317",
                    "value": "K歌金曲榜 当期排名54 历史在榜1期 最高排名54",
                    "topID": 36
                }
            ]
        },
        "detail": {
            "company": "杰威尔音乐有限公司",
            "company_id": 2317,
            "albumCompany_id": 2317,
            "albumTotal": 65,
            "albumCompanyName": "杰威尔音乐有限公司",
            "mvTotal": 466
        },
        "commentCount": 77788,
        "col_show": "999w+",
        "col_number": 1000001,
        "musicUrl": "https://dl.stream.qqmusic.qq.com/C40000400jk23JDWwJ.m4a?guid=8348972662&vkey=EA6708423C98AE915C8A2630E204D1ADF820DE7BEDC2671C000C5FBFB5EC6D7CDEB2C307EB22992B4DD4304CE5A48538950F5C96505EAD5A&uin=1712725180&fromtag=120032",
        "topinfo": {},
        "playinfo": {},
        "isPlay": false
    },
    {
        "id": 449198,
        "mid": "003cI52o4daJJL",
        "name": "花海",
        "time_public": "2008-10-15",
        "singer": {
            "id": 4558,
            "mid": "0025NhlN2yWrP4",
            "name": "周杰伦"
        },
        "pay": {
            "pay_down": 1,
            "pay_month": 1,
            "pay_play": 1
        },
        "price_track": 200,
        "album": {
            "id": 36062,
            "mid": "002Neh8l0uciQZ",
            "name": "魔杰座"
        },
        "cnt": 33932,
        "todayIndex": 501677,
        "todayRank": 19,
        "yesterdayIndex": 745154,
        "yesterdayRank": 20,
        "indexRate": 0.01855297,
        "rankRate": -4,
        "listenCnt": "100w+",
        "record": {
            "data": [
                "听歌识曲榜 当期排名100 历史在榜4期 最高排名17",
                "Q音快手榜 当期排名14 历史在榜7期 最高排名14",
                "流行指数榜 当期排名56 历史在榜201期 最高排名9",
                "热歌榜 当期排名22 历史在榜334期 最高排名1",
                "K歌金曲榜 当期排名20 历史在榜101期 最高排名7",
                "抖快榜 当期排名21 历史在榜108期 最高排名4",
                "飙升榜 当期排名66 历史在榜269期 最高排名3"
            ],
            "newData": [
                {
                    "date": "20230107",
                    "value": "飙升榜 当期排名66 历史在榜269期 最高排名3",
                    "topID": 62
                },
                {
                    "date": "20230107",
                    "value": "热歌榜 当期排名22 历史在榜334期 最高排名1",
                    "topID": 26
                },
                {
                    "date": "20230105",
                    "value": "K歌金曲榜 当期排名20 历史在榜101期 最高排名7",
                    "topID": 36
                },
                {
                    "date": "20230103",
                    "value": "流行指数榜 当期排名56 历史在榜201期 最高排名9",
                    "topID": 4
                },
                {
                    "date": "20221229",
                    "value": "抖快榜 当期排名21 历史在榜108期 最高排名4",
                    "topID": 60
                },
                {
                    "date": "20221120",
                    "value": "听歌识曲榜 当期排名100 历史在榜4期 最高排名17",
                    "topID": 67
                },
                {
                    "date": "20220512",
                    "value": "Q音快手榜 当期排名14 历史在榜7期 最高排名14",
                    "topID": 74
                }
            ]
        },
        "detail": {
            "company": "杰威尔音乐有限公司",
            "company_id": 2317,
            "albumCompany_id": 2317,
            "albumTotal": 65,
            "albumCompanyName": "杰威尔音乐有限公司",
            "mvTotal": 466
        },
        "commentCount": 72921,
        "col_show": "999w+",
        "col_number": 1000001,
        "musicUrl": "https://dl.stream.qqmusic.qq.com/C400001WYACn4XVhRT.m4a?guid=8348972662&vkey=200BC1638766785E6BD4CE13F0D0BC47727D7F8F109E6614AB10D3CE64E188C8636147F21F9FF1A2D7BF606BD5C95A6E7EDD867E9F78F4D1&uin=1712725180&fromtag=120032",
        "topinfo": {},
        "playinfo": {},
        "isPlay": false
    },
    {
        "id": 97761,
        "mid": "002OKIox28ad9a",
        "name": "半岛铁盒",
        "time_public": "2002-07-18",
        "singer": {
            "id": 4558,
            "mid": "0025NhlN2yWrP4",
            "name": "周杰伦"
        },
        "pay": {
            "pay_down": 1,
            "pay_month": 1,
            "pay_play": 1
        },
        "price_track": 200,
        "album": {
            "id": 8219,
            "mid": "004MGitN0zEHpb",
            "name": "八度空间"
        },
        "cnt": 25034,
        "todayIndex": 382041,
        "todayRank": 37,
        "yesterdayIndex": 554692,
        "yesterdayRank": 38,
        "indexRate": 0.053560067,
        "rankRate": 1,
        "listenCnt": "80w+",
        "record": {
            "data": [
                "抖快榜 当期排名21 历史在榜7期 最高排名15",
                "飙升榜 当期排名23 历史在榜189期 最高排名4",
                "听歌识曲榜 当期排名38 历史在榜9期 最高排名7",
                "Q音快手榜 历史在榜6期 最高排名26",
                "流行指数榜 当期排名94 历史在榜99期 最高排名12",
                "热歌榜 当期排名91 历史在榜298期 最高排名13",
                "K歌金曲榜 当期排名40 历史在榜3期 最高排名40"
            ],
            "newData": [
                {
                    "date": "20230107",
                    "value": "飙升榜 当期排名23 历史在榜189期 最高排名4",
                    "topID": 62
                },
                {
                    "date": "20230107",
                    "value": "热歌榜 当期排名91 历史在榜298期 最高排名13",
                    "topID": 26
                },
                {
                    "date": "20230105",
                    "value": "K歌金曲榜 当期排名40 历史在榜3期 最高排名40",
                    "topID": 36
                },
                {
                    "date": "20230103",
                    "value": "流行指数榜 当期排名94 历史在榜99期 最高排名12",
                    "topID": 4
                },
                {
                    "date": "20221124",
                    "value": "抖快榜 当期排名21 历史在榜7期 最高排名15",
                    "topID": 60
                },
                {
                    "date": "20221120",
                    "value": "听歌识曲榜 当期排名38 历史在榜9期 最高排名7",
                    "topID": 67
                },
                {
                    "date": "20220210",
                    "value": "Q音快手榜 历史在榜6期 最高排名26",
                    "topID": 74
                }
            ]
        },
        "detail": {
            "company": "杰威尔音乐有限公司",
            "company_id": 2317,
            "albumCompany_id": 2317,
            "albumTotal": 65,
            "albumCompanyName": "杰威尔音乐有限公司",
            "mvTotal": 466
        },
        "commentCount": 40733,
        "col_show": "999w+",
        "col_number": 1000001,
        "musicUrl": "https://dl.stream.qqmusic.qq.com/C4000019GXTz1OM6Wu.m4a?guid=8348972662&vkey=B7F2A97DA5E64065A21255130CAC69D81B352351E3D9A886711EC459E384B797908BF756BCC27C1E367F5F4D1D0974DFF6DDA6C8C88BED51&uin=1712725180&fromtag=120032",
        "topinfo": {},
        "playinfo": {},
        "isPlay": false
    },
    {
        "id": 680284,
        "mid": "0022b7OX2STU86",
        "name": "我落泪情绪零碎",
        "time_public": "2010-05-18",
        "singer": {
            "id": 4558,
            "mid": "0025NhlN2yWrP4",
            "name": "周杰伦"
        },
        "pay": {
            "pay_down": 1,
            "pay_month": 1,
            "pay_play": 1
        },
        "price_track": 200,
        "album": {
            "id": 56705,
            "mid": "000bviBl4FjTpO",
            "name": "跨时代"
        },
        "cnt": 32697,
        "todayIndex": 586894,
        "todayRank": 9,
        "yesterdayIndex": 859269,
        "yesterdayRank": 13,
        "indexRate": 0.090643585,
        "rankRate": 3,
        "listenCnt": "100w+",
        "record": {
            "data": [
                "K歌金曲榜 当期排名10 历史在榜25期 最高排名10",
                "抖快榜 当期排名21 历史在榜7期 最高排名7",
                "飙升榜 当期排名11 历史在榜137期 最高排名4",
                "Q音快手榜 当期排名94 历史在榜6期 最高排名41",
                "流行指数榜 当期排名86 历史在榜79期 最高排名23",
                "热歌榜 当期排名45 历史在榜135期 最高排名43"
            ],
            "newData": [
                {
                    "date": "20230107",
                    "value": "飙升榜 当期排名11 历史在榜137期 最高排名4",
                    "topID": 62
                },
                {
                    "date": "20230107",
                    "value": "热歌榜 当期排名45 历史在榜135期 最高排名43",
                    "topID": 26
                },
                {
                    "date": "20230105",
                    "value": "K歌金曲榜 当期排名10 历史在榜25期 最高排名10",
                    "topID": 36
                },
                {
                    "date": "20230105",
                    "value": "抖快榜 当期排名21 历史在榜7期 最高排名7",
                    "topID": 60
                },
                {
                    "date": "20221017",
                    "value": "流行指数榜 当期排名86 历史在榜79期 最高排名23",
                    "topID": 4
                },
                {
                    "date": "20220623",
                    "value": "Q音快手榜 当期排名94 历史在榜6期 最高排名41",
                    "topID": 74
                }
            ]
        },
        "detail": {
            "company": "杰威尔音乐有限公司",
            "company_id": 2317,
            "albumCompany_id": 2317,
            "albumTotal": 65,
            "albumCompanyName": "杰威尔音乐有限公司",
            "mvTotal": 466
        },
        "commentCount": 32392,
        "col_show": "950w+",
        "col_number": 1000001,
        "musicUrl": "https://dl.stream.qqmusic.qq.com/C400001Zeo1P4a5j0v.m4a?guid=8348972662&vkey=1CC95DCB7AEAA3CF7DF4765426E4096517A472E91EEF31CE027538684525D6D075FF41304586B178F35523CF31374533D0AD9CD540F8E4C8&uin=1712725180&fromtag=120032",
        "topinfo": {},
        "playinfo": {},
        "isPlay": false
    },
    {
        "id": 5105986,
        "mid": "001xd0HI0X9GNq",
        "name": "一路向北",
        "time_public": "2005-06-24",
        "singer": {
            "id": 4558,
            "mid": "0025NhlN2yWrP4",
            "name": "周杰伦"
        },
        "pay": {
            "pay_down": 1,
            "pay_month": 1,
            "pay_play": 1
        },
        "price_track": 200,
        "album": {
            "id": 14311,
            "mid": "002MAeob3zLXwZ",
            "name": "J III MP3 Player"
        },
        "cnt": 25384,
        "todayIndex": 423835,
        "todayRank": 31,
        "yesterdayIndex": 632727,
        "yesterdayRank": 30,
        "indexRate": 0.022603964,
        "rankRate": 0,
        "listenCnt": "90w+",
        "record": {
            "data": [
                "K歌金曲榜 当期排名22 历史在榜121期 最高排名19",
                "抖快榜 当期排名21 历史在榜52期 最高排名9",
                "飙升榜 当期排名47 历史在榜239期 最高排名2",
                "Q音快手榜 当期排名86 历史在榜4期 最高排名52",
                "流行指数榜 当期排名100 历史在榜188期 最高排名5",
                "热歌榜 当期排名86 历史在榜372期 最高排名9"
            ],
            "newData": [
                {
                    "date": "20230107",
                    "value": "飙升榜 当期排名47 历史在榜239期 最高排名2",
                    "topID": 62
                },
                {
                    "date": "20230107",
                    "value": "热歌榜 当期排名86 历史在榜372期 最高排名9",
                    "topID": 26
                },
                {
                    "date": "20230105",
                    "value": "K歌金曲榜 当期排名22 历史在榜121期 最高排名19",
                    "topID": 36
                },
                {
                    "date": "20230105",
                    "value": "流行指数榜 当期排名100 历史在榜188期 最高排名5",
                    "topID": 4
                },
                {
                    "date": "20220714",
                    "value": "Q音快手榜 当期排名86 历史在榜4期 最高排名52",
                    "topID": 74
                },
                {
                    "date": "20220317",
                    "value": "抖快榜 当期排名21 历史在榜52期 最高排名9",
                    "topID": 60
                }
            ]
        },
        "detail": {
            "company": "杰威尔音乐有限公司",
            "company_id": 2317,
            "albumCompany_id": 2317,
            "albumTotal": 65,
            "albumCompanyName": "杰威尔音乐有限公司",
            "mvTotal": 466
        },
        "commentCount": 59119,
        "col_show": "999w+",
        "col_number": 1000001,
        "musicUrl": "https://dl.stream.qqmusic.qq.com/C400004cZvLj1qDq4A.m4a?guid=8348972662&vkey=A29B50F8504A95E593A7DF762CE2B9AFB244232E1A8730087D051865DC115190B1E78E74AC65AE365587D6E0D371966F6E3725AC106DE653&uin=1712725180&fromtag=120032",
        "topinfo": {},
        "playinfo": {},
        "isPlay": false
    },
    {
        "id": 102065756,
        "mid": "004Z8Ihr0JIu5s",
        "name": "七里香",
        "time_public": "2004-08-03",
        "singer": {
            "id": 4558,
            "mid": "0025NhlN2yWrP4",
            "name": "周杰伦"
        },
        "pay": {
            "pay_down": 1,
            "pay_month": 1,
            "pay_play": 1
        },
        "price_track": 200,
        "album": {
            "id": 20612,
            "mid": "003DFRzD192KKD",
            "name": "七里香"
        },
        "cnt": 30770,
        "todayIndex": 460522,
        "todayRank": 24,
        "yesterdayIndex": 667203,
        "yesterdayRank": 24,
        "indexRate": 0.029102238,
        "rankRate": -2,
        "listenCnt": "100w+",
        "record": {
            "data": [
                "Q音快手榜 当期排名78 历史在榜4期 最高排名12",
                "流行指数榜 当期排名67 历史在榜182期 最高排名8",
                "热歌榜 当期排名56 历史在榜384期 最高排名4",
                "K歌金曲榜 当期排名25 历史在榜155期 最高排名5",
                "抖快榜 当期排名21 历史在榜116期 最高排名7",
                "飙升榜 当期排名25 历史在榜259期 最高排名5",
                "听歌识曲榜 当期排名99 历史在榜5期 最高排名2"
            ],
            "newData": [
                {
                    "date": "20230107",
                    "value": "热歌榜 当期排名56 历史在榜384期 最高排名4",
                    "topID": 26
                },
                {
                    "date": "20230107",
                    "value": "飙升榜 当期排名25 历史在榜259期 最高排名5",
                    "topID": 62
                },
                {
                    "date": "20230105",
                    "value": "K歌金曲榜 当期排名25 历史在榜155期 最高排名5",
                    "topID": 36
                },
                {
                    "date": "20230103",
                    "value": "流行指数榜 当期排名67 历史在榜182期 最高排名8",
                    "topID": 4
                },
                {
                    "date": "20221120",
                    "value": "听歌识曲榜 当期排名99 历史在榜5期 最高排名2",
                    "topID": 67
                },
                {
                    "date": "20221117",
                    "value": "抖快榜 当期排名21 历史在榜116期 最高排名7",
                    "topID": 60
                },
                {
                    "date": "20220630",
                    "value": "Q音快手榜 当期排名78 历史在榜4期 最高排名12",
                    "topID": 74
                }
            ]
        },
        "detail": {
            "company": "杰威尔音乐有限公司",
            "company_id": 2317,
            "albumCompany_id": 2317,
            "albumTotal": 65,
            "albumCompanyName": "杰威尔音乐有限公司",
            "mvTotal": 466
        },
        "commentCount": 75094,
        "col_show": "999w+",
        "col_number": 1000001,
        "musicUrl": "https://dl.stream.qqmusic.qq.com/C4000012Ez0a1tFcOI.m4a?guid=8348972662&vkey=684834B8988860ACCC5A24D8BF957331792430EC6859C6ED86D84BA036CA44BB7B5112B04F1EBDDB858E115B8FAA65CA91C5562260BF3F4C&uin=1712725180&fromtag=120032",
        "topinfo": {},
        "playinfo": {},
        "isPlay": false
    },
    {
        "id": 718479,
        "mid": "003KtYhg4frNXC",
        "name": "枫",
        "time_public": "2005-11-01",
        "singer": {
            "id": 4558,
            "mid": "0025NhlN2yWrP4",
            "name": "周杰伦"
        },
        "pay": {
            "pay_down": 1,
            "pay_month": 1,
            "pay_play": 1
        },
        "price_track": 200,
        "album": {
            "id": 60671,
            "mid": "0024bjiL2aocxT",
            "name": "十一月的萧邦"
        },
        "cnt": 25871,
        "todayIndex": 443354,
        "todayRank": 26,
        "yesterdayIndex": 661248,
        "yesterdayRank": 25,
        "indexRate": 0.044384707,
        "rankRate": -2,
        "listenCnt": "90w+",
        "record": {
            "data": [
                "流行指数榜 当期排名79 历史在榜99期 最高排名22",
                "热歌榜 当期排名83 历史在榜326期 最高排名24",
                "K歌金曲榜 当期排名15 历史在榜45期 最高排名12",
                "抖快榜 当期排名12 历史在榜23期 最高排名6",
                "飙升榜 当期排名44 历史在榜191期 最高排名7",
                "Q音快手榜 历史在榜1期 最高排名42"
            ],
            "newData": [
                {
                    "date": "20230107",
                    "value": "热歌榜 当期排名83 历史在榜326期 最高排名24",
                    "topID": 26
                },
                {
                    "date": "20230107",
                    "value": "飙升榜 当期排名44 历史在榜191期 最高排名7",
                    "topID": 62
                },
                {
                    "date": "20230105",
                    "value": "K歌金曲榜 当期排名15 历史在榜45期 最高排名12",
                    "topID": 36
                },
                {
                    "date": "20230101",
                    "value": "流行指数榜 当期排名79 历史在榜99期 最高排名22",
                    "topID": 4
                },
                {
                    "date": "20221222",
                    "value": "抖快榜 当期排名12 历史在榜23期 最高排名6",
                    "topID": 60
                },
                {
                    "date": "20210909",
                    "value": "Q音快手榜 历史在榜1期 最高排名42",
                    "topID": 74
                }
            ]
        },
        "detail": {
            "company": "杰威尔音乐有限公司",
            "company_id": 2317,
            "albumCompany_id": 2317,
            "albumTotal": 65,
            "albumCompanyName": "杰威尔音乐有限公司",
            "mvTotal": 466
        },
        "commentCount": 41719,
        "col_show": "999w+",
        "col_number": 1000001,
        "musicUrl": "https://dl.stream.qqmusic.qq.com/C4000044M6Un0RXph2.m4a?guid=8348972662&vkey=5F3351E7DA84F4BECE8A30FAC3DCD0242E8360363735980F0B81FCD5FC9ABADE957D978F1A81FB46A1A7FBE2EB286B695EF76100E8D824F5&uin=1712725180&fromtag=120032",
        "topinfo": {},
        "playinfo": {},
        "isPlay": false
    },
    {
        "id": 3585884,
        "mid": "000oW8J53xPhZA",
        "name": "明明就",
        "time_public": "2012-12-28",
        "singer": {
            "id": 4558,
            "mid": "0025NhlN2yWrP4",
            "name": "周杰伦"
        },
        "pay": {
            "pay_down": 1,
            "pay_month": 1,
            "pay_play": 1
        },
        "price_track": 200,
        "album": {
            "id": 194021,
            "mid": "003Ow85E3pnoqi",
            "name": "十二新作"
        },
        "cnt": 31034,
        "todayIndex": 540532,
        "todayRank": 17,
        "yesterdayIndex": 825886,
        "yesterdayRank": 15,
        "indexRate": 0.037026715,
        "rankRate": -2,
        "listenCnt": "100w+",
        "record": {
            "data": [
                "热歌榜 当期排名31 历史在榜268期 最高排名14",
                "K歌金曲榜 当期排名13 历史在榜91期 最高排名2",
                "抖快榜 当期排名11 历史在榜24期 最高排名6",
                "飙升榜 当期排名27 历史在榜210期 最高排名10",
                "Q音快手榜 当期排名82 历史在榜16期 最高排名8",
                "流行指数榜 当期排名34 历史在榜123期 最高排名13"
            ],
            "newData": [
                {
                    "date": "20230107",
                    "value": "热歌榜 当期排名31 历史在榜268期 最高排名14",
                    "topID": 26
                },
                {
                    "date": "20230107",
                    "value": "飙升榜 当期排名27 历史在榜210期 最高排名10",
                    "topID": 62
                },
                {
                    "date": "20230107",
                    "value": "流行指数榜 当期排名34 历史在榜123期 最高排名13",
                    "topID": 4
                },
                {
                    "date": "20230105",
                    "value": "K歌金曲榜 当期排名13 历史在榜91期 最高排名2",
                    "topID": 36
                },
                {
                    "date": "20230105",
                    "value": "抖快榜 当期排名11 历史在榜24期 最高排名6",
                    "topID": 60
                },
                {
                    "date": "20220714",
                    "value": "Q音快手榜 当期排名82 历史在榜16期 最高排名8",
                    "topID": 74
                }
            ]
        },
        "detail": {
            "company": "杰威尔音乐有限公司",
            "company_id": 2317,
            "albumCompany_id": 2317,
            "albumTotal": 65,
            "albumCompanyName": "杰威尔音乐有限公司",
            "mvTotal": 466
        },
        "commentCount": 38217,
        "col_show": "999w+",
        "col_number": 1000001,
        "musicUrl": "https://dl.stream.qqmusic.qq.com/C400001mxHU44PEhTP.m4a?guid=8348972662&vkey=9DADB8FBAD56BA439B465DEC2E85E07E4D24771C430FFEEE7DB07C92675AF03D2DE516EEF55DDD7D1806CF87FCE71554197710A36BA70BB3&uin=1712725180&fromtag=120032",
        "topinfo": {},
        "playinfo": {},
        "isPlay": false
    }
]
	kugouV3List: any[] = []
	qqPage = 1;
	kugouV3Page = 1;
	
	audioSrc = '';
	lyricData:any = [];
	// 歌曲进度
	timeupdate(e:any){
		this.lyric.lyricUp(e.srcElement.currentTime);
	}
	// 获取歌词
	getLyric(songmid:string,i:number){
		this.api.getQQLyric({
			songmid: songmid,
		}).subscribe((res: any) => {
			console.log(res)
			if(res.success){
				this.qqList[i].lyricText = res.result.lyric
				this.qqList[i].lyricData = this.common.parseLRC(res.result.lyric)
				this.lyricData = this.qqList[i].lyricData
			}
		}, (err: any) => {
			console.log(err)
		})
	}
	// qq传参
	qqSrcChange(params: any) {
		let { src, i } = params;
		if(!this.qqList[i].lyricText){
			this.getLyric(this.qqList[i].mid,i)
		}else{
			this.qqList[i].lyricData = this.common.parseLRC(this.qqList[i].lyricText)
			this.lyricData = this.qqList[i].lyricData
		}
		this.audioSrc = src;
		let audio: any = document.getElementById('audio')
		setTimeout(() => {
			this.qqList.forEach((item: any, index: number) => {
				if (index == i) {
					item.isPlay = !item.isPlay
					if (item.isPlay) {
						audio.play()
					} else {
						audio.pause()
					}
				} else {
					item.isPlay = false;
				}
			})
		}, 50)
	}
	
	// 铃声多多传参
	lsddSrcChange(params: any) {
		let { src, i } = params;
		this.audioSrc = src;
		let audio: any = document.getElementById('audio')
		setTimeout(() => {
			this.lsddList.forEach((item: any, index: number) => {
				if (index == i) {
					item.isPlay = !item.isPlay
					if (item.isPlay) {
						audio.play()
					} else {
						audio.pause()
					}
				} else {
					item.isPlay = false;
				}
			})
		}, 50)
	}
	play(element: any) {
		console.log(element)
		if (this.selectItem == 'QQ音乐') {
			var i = this.qqList.findIndex((e: any) => e.musicUrl == element.srcElement.currentSrc)
			if (i !== -1) {
				this.qqList[i].isPlay = true;
			}
		} else if (this.selectItem == '铃声多多') {
			var i = this.lsddList.findIndex((e: any) => e.src == element.srcElement.currentSrc)
			if (i !== -1) {
				this.lsddList[i].isPlay = true;
				this.lyricData = [];
			}
		}
	}
	pause() {
		this.lsddList.forEach((item: any) => {
			item.isPlay = false;
		})
		this.qqList.forEach((item: any) => {
			item.isPlay = false;
		})
	}
	onSelect(item: any) {
		this.selectItem = item.name;
		this.searchHolder = item.holder;
		// this.searchValue = '';
	}
	search(value: string) {
		console.log(value)
		this.searchValue = value;
		this.qqPage = 1;
		this.kugouV3Page = 1;
		this.kuwoPage = 1;
		this.wangyiyunPage = 1;
		this.lsddPage = 1;
		this.loading = true;
		if (this.selectItem == 'QQ音乐') {
			this.searchQQ()
		}
		if (this.selectItem == '酷狗V3') {
			this.searchV3()
		}
		if (this.selectItem == '酷我音乐') {
			this.searchKuwo()
		}
		if (this.selectItem == '网易云') {
			this.searchWangyiyun()
		}
		if (this.selectItem == '铃声多多') {
			this.searchLsdd()
		}
	}
	searchKuwo() {
		this.api.getKuwo({
			keyword: this.searchValue,
			page: this.kuwoPage
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			res.result.forEach((item: any) => {
				item.payInfo.feeType = item.payInfo.feeType || {}
			})
			if (this.kuwoPage == 1) {
				this.kuwoList = res.result;
			} else {
				this.kuwoList = [...this.kuwoList, ...res.result];
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	searchWangyiyun() {
		this.api.getWangyiyun({
			keyword: this.searchValue,
			page: this.wangyiyunPage
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			if (this.wangyiyunPage == 1) {
				this.wangyiyunList = res.result;
			} else {
				this.wangyiyunList = [...this.wangyiyunList, ...res.result];
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	searchQQ() {
		this.api.getQQ({
			keyword: this.searchValue,
			page: this.qqPage
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			res.result.forEach((item: any) => {
				item.topinfo = item.topinfo || {}
				item.playinfo = item.playinfo || {}
				item.isPlay = false;
			})
			if (this.qqPage == 1) {
				this.qqList = res.result;
			} else {
				this.qqList = [...this.qqList, ...res.result];
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}

	searchV3() {
		this.api.getV3({
			keyword: this.searchValue,
			page: this.kugouV3Page
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				if (this.kugouV3Page == 1) {
					this.kugouV3List = res.result;
				} else {
					this.kugouV3List = [...this.kugouV3List, ...res.result];
				}
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	searchLsdd() {
		this.api.getLsdd({
			keyword: this.searchValue,
			page: this.lsddPage,
			pageSize: 10
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				res.result.forEach((item: any) => {
					item.isPlay = false;
				})
				if (this.lsddPage == 1) {
					this.lsddList = res.result;
				} else {
					this.lsddList = [...this.lsddList, ...res.result];
				}
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	qqPageNext() {
		if (this.qqList.length == 0) {
			return
		}
		this.qqPage += 1;
		this.loading = true;
		this.searchQQ()
	}
	kuwoPageNext() {
		if (this.kuwoList.length == 0) {
			return
		}
		this.kuwoPage += 1;
		this.loading = true;
		this.searchKuwo()
	}
	wangyiyunPageNext() {
		if (this.wangyiyunList.length == 0) {
			return
		}
		this.wangyiyunPage += 1;
		this.loading = true;
		this.searchWangyiyun()
	}
	kugouV3PageNext() {
		if (this.kugouV3List.length == 0) {
			return
		}
		this.kugouV3Page += 1;
		this.loading = true;
		this.searchV3()
	}
	lsddPageNext() {
		if (this.lsddList.length == 0) {
			return
		}
		this.lsddPage += 1;
		this.loading = true;
		this.searchLsdd()
	}
	ngOnInit(): void {

	}

}
