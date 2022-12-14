import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
@Component({
	selector: 'ngx-search-songs',
	templateUrl: './search-songs.component.html',
	styleUrls: ['./search-songs.component.scss']
})
export class SearchSongsComponent implements OnInit {
	constructor(public api: ApiService) { }
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
	}]
	selectItem = 'QQ音乐';
	searchValue = '';
	loading = false;
	searchHolder = "qq搜索";
	wangyiyunList:any[]=[]
	kuwoList:any[]=[]
	kuwoPage=1
	wangyiyunPage=1

qqList: any[] = [{
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
	"album": {
		"id": 8220,
		"mid": "000MkMni19ClKG",
		"name": "叶惠美"
	},
	"cnt": 33555,
	"todayIndex": 584239,
	"todayRank": 9,
	"yesterdayIndex": 1089866,
	"yesterdayRank": 4,
	"indexRate": 0.015586983,
	"rankRate": 2,
	"price_track": 0,
	"listenCnt": "100w+",
	"record": {
		"data": ["听歌识曲榜 当期排名95 历史在榜13期 最高排名9", "Q音快手榜 当期排名59 历史在榜8期 最高排名32", "流行指数榜 当期排名93 历史在榜240期 最高排名2",
			"热歌榜 当期排名6 历史在榜370期 最高排名1", "K歌金曲榜 当期排名50 历史在榜47期 最高排名38", "抖快榜 当期排名4 历史在榜156期 最高排名2",
			"飙升榜 当期排名33 历史在榜276期 最高排名4"
		],
		"newData": [{
			"date": "20221129",
			"value": "热歌榜 当期排名6 历史在榜370期 最高排名1",
			"topID": 26
		}, {
			"date": "20221127",
			"value": "飙升榜 当期排名33 历史在榜276期 最高排名4",
			"topID": 62
		}, {
			"date": "20221124",
			"value": "抖快榜 当期排名4 历史在榜156期 最高排名2",
			"topID": 60
		}, {
			"date": "20221121",
			"value": "流行指数榜 当期排名93 历史在榜240期 最高排名2",
			"topID": 4
		}, {
			"date": "20221121",
			"value": "听歌识曲榜 当期排名95 历史在榜13期 最高排名9",
			"topID": 67
		}, {
			"date": "20220818",
			"value": "K歌金曲榜 当期排名50 历史在榜47期 最高排名38",
			"topID": 36
		}, {
			"date": "20220630",
			"value": "Q音快手榜 当期排名59 历史在榜8期 最高排名32",
			"topID": 74
		}]
	},
	"detail": {
		"company": "杰威尔音乐有限公司",
		"company_id": 2317,
		"albumCompany_id": 2317,
		"albumTotal": 65,
		"albumCompanyName": "杰威尔音乐有限公司",
		"mvTotal": 466
	},
	"commentCount": 181325,
	"col_show": "999w+",
	"col_number": 1000001
}, {
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
	"album": {
		"id": 36062,
		"mid": "002Neh8l0uciQZ",
		"name": "魔杰座"
	},
	"cnt": 30975,
	"todayIndex": 574015,
	"todayRank": 10,
	"yesterdayIndex": 1076266,
	"yesterdayRank": 6,
	"indexRate": -0.006163771,
	"rankRate": -1,
	"price_track": 0,
	"listenCnt": "100w+",
	"record": {
		"data": ["热歌榜 当期排名14 历史在榜246期 最高排名11", "K歌金曲榜 当期排名30 历史在榜14期 最高排名30", "抖快榜 当期排名1 历史在榜35期 最高排名1",
			"飙升榜 当期排名31 历史在榜184期 最高排名6", "国风热歌榜 当期排名30 历史在榜82期 最高排名21", "听歌识曲榜 当期排名87 历史在榜36期 最高排名10",
			"Q音快手榜 当期排名93 历史在榜10期 最高排名14", "流行指数榜 当期排名73 历史在榜119期 最高排名4"
		],
		"newData": [{
			"date": "20221129",
			"value": "热歌榜 当期排名14 历史在榜246期 最高排名11",
			"topID": 26
		}, {
			"date": "20221127",
			"value": "飙升榜 当期排名31 历史在榜184期 最高排名6",
			"topID": 62
		}, {
			"date": "20221124",
			"value": "K歌金曲榜 当期排名30 历史在榜14期 最高排名30",
			"topID": 36
		}, {
			"date": "20221124",
			"value": "抖快榜 当期排名1 历史在榜35期 最高排名1",
			"topID": 60
		}, {
			"date": "20221124",
			"value": "国风热歌榜 当期排名30 历史在榜82期 最高排名21",
			"topID": 65
		}, {
			"date": "20221120",
			"value": "听歌识曲榜 当期排名87 历史在榜36期 最高排名10",
			"topID": 67
		}, {
			"date": "20221017",
			"value": "流行指数榜 当期排名73 历史在榜119期 最高排名4",
			"topID": 4
		}, {
			"date": "20220707",
			"value": "Q音快手榜 当期排名93 历史在榜10期 最高排名14",
			"topID": 74
		}]
	},
	"detail": {
		"company": "杰威尔音乐有限公司",
		"company_id": 2317,
		"albumCompany_id": 2317,
		"albumTotal": 65,
		"albumCompanyName": "杰威尔音乐有限公司",
		"mvTotal": 466
	},
	"commentCount": 41499,
	"col_show": "999w+",
	"col_number": 1000001
}, {
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
	"album": {
		"id": 36062,
		"mid": "002Neh8l0uciQZ",
		"name": "魔杰座"
	},
	"cnt": 25608,
	"todayIndex": 445149,
	"todayRank": 20,
	"yesterdayIndex": 839205,
	"yesterdayRank": 17,
	"indexRate": 0.0170912,
	"rankRate": 0,
	"price_track": 0,
	"listenCnt": "100w+",
	"record": {
		"data": ["飙升榜 当期排名44 历史在榜255期 最高排名3", "听歌识曲榜 当期排名100 历史在榜4期 最高排名17", "Q音快手榜 当期排名14 历史在榜7期 最高排名14",
			"流行指数榜 当期排名24 历史在榜196期 最高排名9", "热歌榜 当期排名36 历史在榜295期 最高排名1", "K歌金曲榜 当期排名20 历史在榜95期 最高排名7",
			"抖快榜 当期排名7 历史在榜102期 最高排名4"
		],
		"newData": [{
			"date": "20221129",
			"value": "热歌榜 当期排名36 历史在榜295期 最高排名1",
			"topID": 26
		}, {
			"date": "20221127",
			"value": "飙升榜 当期排名44 历史在榜255期 最高排名3",
			"topID": 62
		}, {
			"date": "20221124",
			"value": "K歌金曲榜 当期排名20 历史在榜95期 最高排名7",
			"topID": 36
		}, {
			"date": "20221124",
			"value": "抖快榜 当期排名7 历史在榜102期 最高排名4",
			"topID": 60
		}, {
			"date": "20221120",
			"value": "听歌识曲榜 当期排名100 历史在榜4期 最高排名17",
			"topID": 67
		}, {
			"date": "20221014",
			"value": "流行指数榜 当期排名24 历史在榜196期 最高排名9",
			"topID": 4
		}, {
			"date": "20220512",
			"value": "Q音快手榜 当期排名14 历史在榜7期 最高排名14",
			"topID": 74
		}]
	},
	"detail": {
		"company": "杰威尔音乐有限公司",
		"company_id": 2317,
		"albumCompany_id": 2317,
		"albumTotal": 65,
		"albumCompanyName": "杰威尔音乐有限公司",
		"mvTotal": 466
	},
	"commentCount": 71281,
	"col_show": "999w+",
	"col_number": 1000001
}, {
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
	"album": {
		"id": 60671,
		"mid": "0024bjiL2aocxT",
		"name": "十一月的萧邦"
	},
	"cnt": 20038,
	"todayIndex": 399593,
	"todayRank": 28,
	"yesterdayIndex": 730227,
	"yesterdayRank": 22,
	"indexRate": 0.01071999,
	"rankRate": 4,
	"price_track": 0,
	"listenCnt": "80w+",
	"record": {
		"data": ["热歌榜 当期排名55 历史在榜287期 最高排名24", "K歌金曲榜 当期排名14 历史在榜39期 最高排名14", "抖快榜 当期排名11 历史在榜18期 最高排名6",
			"飙升榜 当期排名74 历史在榜185期 最高排名7", "Q音快手榜 历史在榜1期 最高排名42", "流行指数榜 当期排名46 历史在榜98期 最高排名22"
		],
		"newData": [{
			"date": "20221130",
			"value": "飙升榜 当期排名74 历史在榜185期 最高排名7",
			"topID": 62
		}, {
			"date": "20221129",
			"value": "热歌榜 当期排名55 历史在榜287期 最高排名24",
			"topID": 26
		}, {
			"date": "20221124",
			"value": "K歌金曲榜 当期排名14 历史在榜39期 最高排名14",
			"topID": 36
		}, {
			"date": "20221124",
			"value": "抖快榜 当期排名11 历史在榜18期 最高排名6",
			"topID": 60
		}, {
			"date": "20221014",
			"value": "流行指数榜 当期排名46 历史在榜98期 最高排名22",
			"topID": 4
		}, {
			"date": "20210909",
			"value": "Q音快手榜 历史在榜1期 最高排名42",
			"topID": 74
		}]
	},
	"detail": {
		"company": "杰威尔音乐有限公司",
		"company_id": 2317,
		"albumCompany_id": 2317,
		"albumTotal": 65,
		"albumCompanyName": "杰威尔音乐有限公司",
		"mvTotal": 466
	},
	"commentCount": 39770,
	"col_show": "999w+",
	"col_number": 1000001
}, {
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
	"album": {
		"id": 8219,
		"mid": "004MGitN0zEHpb",
		"name": "八度空间"
	},
	"cnt": 18730,
	"todayIndex": 353206,
	"todayRank": 43,
	"yesterdayIndex": 660258,
	"yesterdayRank": 31,
	"indexRate": 0.011079242,
	"rankRate": 6,
	"price_track": 0,
	"listenCnt": "70w+",
	"record": {
		"data": ["听歌识曲榜 当期排名38 历史在榜9期 最高排名7", "Q音快手榜 历史在榜6期 最高排名26", "流行指数榜 当期排名91 历史在榜96期 最高排名12",
			"热歌榜 当期排名58 历史在榜259期 最高排名13", "抖快榜 当期排名21 历史在榜7期 最高排名15", "飙升榜 当期排名87 历史在榜180期 最高排名4"
		],
		"newData": [{
			"date": "20221129",
			"value": "热歌榜 当期排名58 历史在榜259期 最高排名13",
			"topID": 26
		}, {
			"date": "20221127",
			"value": "飙升榜 当期排名87 历史在榜180期 最高排名4",
			"topID": 62
		}, {
			"date": "20221124",
			"value": "流行指数榜 当期排名91 历史在榜96期 最高排名12",
			"topID": 4
		}, {
			"date": "20221124",
			"value": "抖快榜 当期排名21 历史在榜7期 最高排名15",
			"topID": 60
		}, {
			"date": "20221120",
			"value": "听歌识曲榜 当期排名38 历史在榜9期 最高排名7",
			"topID": 67
		}, {
			"date": "20220210",
			"value": "Q音快手榜 历史在榜6期 最高排名26",
			"topID": 74
		}]
	},
	"detail": {
		"company": "杰威尔音乐有限公司",
		"company_id": 2317,
		"albumCompany_id": 2317,
		"albumTotal": 65,
		"albumCompanyName": "杰威尔音乐有限公司",
		"mvTotal": 466
	},
	"commentCount": 37872,
	"col_show": "999w+",
	"col_number": 1000001
}, {
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
	"album": {
		"id": 8218,
		"mid": "000f01724fd7TH",
		"name": "Jay"
	},
	"cnt": 23314,
	"todayIndex": 434513,
	"todayRank": 24,
	"yesterdayIndex": 819477,
	"yesterdayRank": 18,
	"indexRate": 0.001144721,
	"rankRate": 1,
	"price_track": 0,
	"listenCnt": "90w+",
	"record": {
		"data": ["热歌榜 当期排名46 历史在榜230期 最高排名12", "K歌金曲榜 当期排名54 历史在榜1期 最高排名54", "飙升榜 当期排名25 历史在榜195期 最高排名3",
			"流行指数榜 当期排名91 历史在榜116期 最高排名13"
		],
		"newData": [{
			"date": "20221129",
			"value": "热歌榜 当期排名46 历史在榜230期 最高排名12",
			"topID": 26
		}, {
			"date": "20221127",
			"value": "飙升榜 当期排名25 历史在榜195期 最高排名3",
			"topID": 62
		}, {
			"date": "20221017",
			"value": "流行指数榜 当期排名91 历史在榜116期 最高排名13",
			"topID": 4
		}, {
			"date": "20220317",
			"value": "K歌金曲榜 当期排名54 历史在榜1期 最高排名54",
			"topID": 36
		}]
	},
	"detail": {
		"company": "杰威尔音乐有限公司",
		"company_id": 2317,
		"albumCompany_id": 2317,
		"albumTotal": 65,
		"albumCompanyName": "杰威尔音乐有限公司",
		"mvTotal": 466
	},
	"commentCount": 73651,
	"col_show": "999w+",
	"col_number": 1000001
}, {
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
	"album": {
		"id": 20612,
		"mid": "003DFRzD192KKD",
		"name": "七里香"
	},
	"cnt": 22657,
	"todayIndex": 393609,
	"todayRank": 29,
	"yesterdayIndex": 740095,
	"yesterdayRank": 20,
	"indexRate": 0.026532458,
	"rankRate": 7,
	"price_track": 0,
	"listenCnt": "90w+",
	"record": {
		"data": ["流行指数榜 当期排名38 历史在榜178期 最高排名8", "热歌榜 当期排名50 历史在榜345期 最高排名4", "K歌金曲榜 当期排名22 历史在榜149期 最高排名5",
			"抖快榜 当期排名21 历史在榜116期 最高排名7", "飙升榜 当期排名61 历史在榜248期 最高排名5", "听歌识曲榜 当期排名99 历史在榜5期 最高排名2",
			"Q音快手榜 当期排名78 历史在榜4期 最高排名12"
		],
		"newData": [{
			"date": "20221129",
			"value": "热歌榜 当期排名50 历史在榜345期 最高排名4",
			"topID": 26
		}, {
			"date": "20221127",
			"value": "飙升榜 当期排名61 历史在榜248期 最高排名5",
			"topID": 62
		}, {
			"date": "20221124",
			"value": "K歌金曲榜 当期排名22 历史在榜149期 最高排名5",
			"topID": 36
		}, {
			"date": "20221120",
			"value": "听歌识曲榜 当期排名99 历史在榜5期 最高排名2",
			"topID": 67
		}, {
			"date": "20221117",
			"value": "抖快榜 当期排名21 历史在榜116期 最高排名7",
			"topID": 60
		}, {
			"date": "20221014",
			"value": "流行指数榜 当期排名38 历史在榜178期 最高排名8",
			"topID": 4
		}, {
			"date": "20220630",
			"value": "Q音快手榜 当期排名78 历史在榜4期 最高排名12",
			"topID": 74
		}]
	},
	"detail": {
		"company": "杰威尔音乐有限公司",
		"company_id": 2317,
		"albumCompany_id": 2317,
		"albumTotal": 65,
		"albumCompanyName": "杰威尔音乐有限公司",
		"mvTotal": 466
	},
	"commentCount": 73389,
	"col_show": "999w+",
	"col_number": 1000001
}, {
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
	"album": {
		"id": 14311,
		"mid": "002MAeob3zLXwZ",
		"name": "J III MP3 Player"
	},
	"cnt": 17775,
	"todayIndex": 344963,
	"todayRank": 47,
	"yesterdayIndex": 637181,
	"yesterdayRank": 36,
	"indexRate": 0.01675007,
	"rankRate": 6,
	"price_track": 0,
	"listenCnt": "70w+",
	"record": {
		"data": ["流行指数榜 当期排名51 历史在榜182期 最高排名5", "热歌榜 当期排名82 历史在榜333期 最高排名9", "K歌金曲榜 当期排名27 历史在榜115期 最高排名19",
			"抖快榜 当期排名21 历史在榜52期 最高排名9", "飙升榜 当期排名82 历史在榜229期 最高排名2", "Q音快手榜 当期排名86 历史在榜4期 最高排名52"
		],
		"newData": [{
			"date": "20221129",
			"value": "热歌榜 当期排名82 历史在榜333期 最高排名9",
			"topID": 26
		}, {
			"date": "20221127",
			"value": "飙升榜 当期排名82 历史在榜229期 最高排名2",
			"topID": 62
		}, {
			"date": "20221124",
			"value": "K歌金曲榜 当期排名27 历史在榜115期 最高排名19",
			"topID": 36
		}, {
			"date": "20221014",
			"value": "流行指数榜 当期排名51 历史在榜182期 最高排名5",
			"topID": 4
		}, {
			"date": "20220714",
			"value": "Q音快手榜 当期排名86 历史在榜4期 最高排名52",
			"topID": 74
		}, {
			"date": "20220317",
			"value": "抖快榜 当期排名21 历史在榜52期 最高排名9",
			"topID": 60
		}]
	},
	"detail": {
		"company": "杰威尔音乐有限公司",
		"company_id": 2317,
		"albumCompany_id": 2317,
		"albumTotal": 65,
		"albumCompanyName": "杰威尔音乐有限公司",
		"mvTotal": 466
	},
	"commentCount": 57944,
	"col_show": "999w+",
	"col_number": 1000001
}, {
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
	"album": {
		"id": 56705,
		"mid": "000bviBl4FjTpO",
		"name": "跨时代"
	},
	"cnt": 17103,
	"todayIndex": 388704,
	"todayRank": 30,
	"yesterdayIndex": 713632,
	"yesterdayRank": 25,
	"indexRate": 0.01278556,
	"rankRate": 3,
	"price_track": 0,
	"listenCnt": "60w+",
	"record": {
		"data": ["流行指数榜 当期排名86 历史在榜79期 最高排名23", "热歌榜 当期排名94 历史在榜96期 最高排名54", "K歌金曲榜 当期排名39 历史在榜19期 最高排名39",
			"飙升榜 当期排名46 历史在榜120期 最高排名4", "Q音快手榜 当期排名94 历史在榜6期 最高排名41"
		],
		"newData": [{
			"date": "20221129",
			"value": "热歌榜 当期排名94 历史在榜96期 最高排名54",
			"topID": 26
		}, {
			"date": "20221127",
			"value": "飙升榜 当期排名46 历史在榜120期 最高排名4",
			"topID": 62
		}, {
			"date": "20221124",
			"value": "K歌金曲榜 当期排名39 历史在榜19期 最高排名39",
			"topID": 36
		}, {
			"date": "20221017",
			"value": "流行指数榜 当期排名86 历史在榜79期 最高排名23",
			"topID": 4
		}, {
			"date": "20220623",
			"value": "Q音快手榜 当期排名94 历史在榜6期 最高排名41",
			"topID": 74
		}]
	},
	"detail": {
		"company": "杰威尔音乐有限公司",
		"company_id": 2317,
		"albumCompany_id": 2317,
		"albumTotal": 65,
		"albumCompanyName": "杰威尔音乐有限公司",
		"mvTotal": 466
	},
	"commentCount": 26781,
	"col_show": "900w+",
	"col_number": 1000001
}, {
	"id": 449205,
	"mid": "003aAYrm3GE0Ac",
	"name": "稻香",
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
	"album": {
		"id": 36062,
		"mid": "002Neh8l0uciQZ",
		"name": "魔杰座"
	},
	"cnt": 21589,
	"todayIndex": 364774,
	"todayRank": 36,
	"yesterdayIndex": 685617,
	"yesterdayRank": 29,
	"indexRate": 0.0136984885,
	"rankRate": 4,
	"price_track": 0,
	"listenCnt": "90w+",
	"record": {
		"data": ["流行指数榜 当期排名43 历史在榜208期 最高排名12", "热歌榜 当期排名49 历史在榜370期 最高排名7", "K歌金曲榜 当期排名54 历史在榜17期 最高排名34",
			"抖快榜 当期排名21 历史在榜52期 最高排名8", "飙升榜 当期排名42 历史在榜247期 最高排名1", "听歌识曲榜 当期排名35 历史在榜9期 最高排名10",
			"Q音快手榜 当期排名72 历史在榜22期 最高排名24"
		],
		"newData": [{
			"date": "20221130",
			"value": "飙升榜 当期排名42 历史在榜247期 最高排名1",
			"topID": 62
		}, {
			"date": "20221129",
			"value": "热歌榜 当期排名49 历史在榜370期 最高排名7",
			"topID": 26
		}, {
			"date": "20221120",
			"value": "听歌识曲榜 当期排名35 历史在榜9期 最高排名10",
			"topID": 67
		}, {
			"date": "20221014",
			"value": "流行指数榜 当期排名43 历史在榜208期 最高排名12",
			"topID": 4
		}, {
			"date": "20220824",
			"value": "抖快榜 当期排名21 历史在榜52期 最高排名8",
			"topID": 60
		}, {
			"date": "20220804",
			"value": "K歌金曲榜 当期排名54 历史在榜17期 最高排名34",
			"topID": 36
		}, {
			"date": "20220331",
			"value": "Q音快手榜 当期排名72 历史在榜22期 最高排名24",
			"topID": 74
		}]
	},
	"detail": {
		"company": "杰威尔音乐有限公司",
		"company_id": 2317,
		"albumCompany_id": 2317,
		"albumTotal": 65,
		"albumCompanyName": "杰威尔音乐有限公司",
		"mvTotal": 466
	},
	"commentCount": 64204,
	"col_show": "999w+",
	"col_number": 1000001
}];
kugouV3List: any[] = []
qqPage = 1;
kugouV3Page = 1;
onSelect(item: any) {
	this.selectItem = item.name;
	this.searchHolder = item.holder;
	this.searchValue = '';
}
search(value: string) {
	console.log(value)
	this.searchValue = value;
	this.qqPage = 1;
	this.kugouV3Page = 1;
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
}
searchKuwo(){
	this.api.getKuwo({
		keyword: this.searchValue,
		page: this.kuwoPage
	}).subscribe((res: any) => {
		this.loading = false;
		console.log(res)
		res.result.forEach((item:any)=>{
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
searchWangyiyun(){
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
searchQQ(){
	this.api.getQQ({
		keyword: this.searchValue,
		page: this.qqPage
	}).subscribe((res: any) => {
		this.loading = false;
		console.log(res)
		res.result.forEach((item: any) => {
			item.topinfo = item.topinfo || {}
			item.playinfo = item.playinfo || {}
		})
		if (this.qqPage == 1) {
			this.qqList = res.results;
		} else {
			this.qqList = [...this.qqList, ...res.results];
		}
	}, (err: any) => {
		console.log(err)
		this.loading = false;
	})
}

searchV3(){
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
qqPageNext(){
	if (this.qqList.length == 0) {
		return
	}
	this.qqPage += 1;
	this.loading = true;
	this.searchQQ()
}
kuwoPageNext(){
	if (this.kuwoList.length == 0) {
		return
	}
	this.kuwoPage += 1;
	this.loading = true;
	this.searchKuwo()
}
wangyiyunPageNext(){
	if (this.wangyiyunList.length == 0) {
		return
	}
	this.wangyiyunPage += 1;
	this.loading = true;
	this.searchWangyiyun()
}
kugouV3PageNext(){
	if (this.kugouV3List.length == 0) {
		return
	}
	this.kugouV3Page += 1;
	this.loading = true;
	this.searchV3()
}

ngOnInit(): void {

}

}
