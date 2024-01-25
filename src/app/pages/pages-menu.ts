import { NbMenuItem } from '@nebular/theme';
export let MENU_ITEMS: NbMenuItem[] = [
	// {
	// 	title: '音乐搜索',
	// 	icon: 'search',
	// 	link: '/pages/search-songs',
	// 	home: true,
	// },
	// { "menuList": [{ "type": "leftMenu", "value": {"title": '抖音',"icon": "cube","link": "/pages/douyin"}, "display": 1 },{ "type": "leftMenu", "value": {"title": "铃声多多","icon": "cube","link": "/pages/lsdd-page"}, "display": 1 },{ "type": "leftMenu", "value": {"title": "快手","icon": "cube","link": "/pages/kuaishou-searchindex",}, "display": 1 },{ "type": "headerMenu", "value": {"title":"官网","link":"http://www.tingjianmusic.top/"},"display":1 },{ "type":"headerMenu","value":{"title":"Telegram","link":"https://evgeny-nadymov.github.io/telegram-react/"}, "display": 1 }] }
	{
		title: 'QQ',
		icon: {
			icon:'qq_icon',
			pack:'my-icons',
		},
		children: [
			{
				title: '免费歌曲',
				link: '/pages/qq/free-songs',
			},
			{
				title: '标签',
				link: '/pages/qq/qq-label',
			},
		],
	},
	{
		title: '酷狗',
		icon: {
			icon:'kg_icon',
			pack:'my-icons',
		},
		children: [
			{
				title: '酷狗萤火',
				link: '/pages/kugou/yinghuo',
			},
			{
				title: '免费歌曲',
				link: '/pages/kugou/free-songs',
			},
			// {
			// 	title: '自动搜索',
			// 	link: '/pages/kugou/auto-search',
			// },
		],
	},
	{
		title: '抖音',
		icon: {
			icon:'dy_icon',
			pack:'my-icons',
		},
		children: [
			// {
			// 	title: '抖音热点',
			// 	link: '/pages/douyin/douyin-hot',
			// },
			      {
			        title: "热门账号",
			        link: "/pages/douyin/douyin-popular-accounts",
			      },
			      {
			        title: "上升热点",
			        link: "/pages/douyin/douyin-rising-hot",
			      },
			{
				title: '抖音榜单',
				link: '/pages/douyin/douyin-list',
			},
			{
				title: '达人搜索',
				link: '/pages/douyin/douyin-daren',
			},
			{
				title: '监控达人',
				link: '/pages/douyin/douyin-listenDaren',
			},
			{
				title: '视频搜索',
				link: '/pages/douyin/douyin-video',
			},
			{
				title: '监控视频',
				link: '/pages/douyin/douyin-listenVideo',
			},
			{
				title: '视频分析',
				link: '/pages/douyin/douyin-assayVideo',
			},
			{
				title: '添加监控声源',
				link: '/pages/douyin/douyin-soundSource',
			},
			{
				title: '监控声源查询',
				link: '/pages/douyin/douyin-listenSoundSource',
			},
		],
	},
	{
		title:'找灵感',
		icon:{
			icon:'linggan',
			pack:'my-icons'
		},
		link:'/pages/find-inspiration'
	},
	{
		title: '快手',
		icon: {
			icon:'ks_icon',
			pack:'my-icons',
		},
		children: [
			// {
			// 	title: '快手',
			// 	link: '/pages/kuaishou-searchindex',
			// },
			{
				title: '音频使用量',
				link: '/pages/kuaishouVolumeOfUse',
			},
			// {
			// 	title: 'dj',
			// 	link: '/pages/kuaishouDj',
			// },
			
			      {
			        title: "快手特效查询",
			        link: "/pages/kuaishou-specialEffectsQuery",
			      },
				{
				        title: "快手视频详情",
				        link: "/pages/kuaishou-videoDetails",
				 },
			//       {
			//         title: "快手特效监控",
			//    link: "/pages/kuaishou-SwollenKsEeLis",
			// },
			// {
			// 	title:'魔表潜力榜',
			// 	link:"/pages/kuaishou-potential"
			// }
		],
	},
	{
		title: '云图',
		icon: {
			icon:'yt_icon',
			pack:'my-icons',
		},
		children: [
			{
				title: '由你涨幅排名',
				link: '/pages/yuntu/riseRanking',
			},
		],
	},
	{
		title: '浮浮雷达',
		icon: {
			icon:'ffld_icon',
			pack:'my-icons',
		},
		link: '/pages/fufu-billboard',
	},
	{
		title: '雷达音乐',
		icon: 'radio',
		link: '/pages/radar',
	},
	{
		title: '启明星',
		icon: 'star',
		children: [
			{
				title: '精选歌手',
				link: '/pages/venus/enlightenment'
			},
			{
				title: '酷狗飙升榜',
				link: '/pages/venus/kugou-soaring',
			},

		],
	},
	{
		title: '剪映',
		icon: {
			icon:'jy_icon',
			pack:'my-icons',
		},
		link: '/pages/jianying',
	},
	{
		title: '铃声多多',
		icon: {
			icon:'lsdd_icon',
			pack:'my-icons',
		},
		link: '/pages/lsdd-page',
	},
	{
		title: '监测歌曲',
		icon: 'eye',
		children: [
			{
				title: '添加监测歌曲',
				link: '/pages/set-ranking',
			},
			{
				title: '查询监测歌曲',
				link: '/pages/get-ranking',
			},
		],
	},
	{
		title: '音频转换',
		icon: 'flip-2',
		children: [
			{
				title: 'ogg',
				link: '/pages/oggToMp3',
			},
			{
				title: 'mgg',
				link: '/pages/mggToWav',
			},
		],
	},
	    {
	        title: '生成mv',
	        icon: {
	            icon:'mv_icon',
	            pack:'my-icons',
	        },
	        link: '/pages/to-mv',
	    },
	{
		title: '文字识别',
		icon: 'text',
		children: [
			{
				title: '歌词识别',
				link: '/pages/whisper',
			},
			{
				title: '图片识别',
				link: '/pages/photo-identifying-text',
			},
		],
	},
	{
		title: '版权扫描',
		icon: 'link-2',
		link: '/pages/copyright-scanning',
	},
	{
		title: '听歌识曲',
		icon: 'headphones',
		link: '/pages/identification',
	},
	{
		title: 'GPT3.5 Turbo',
		icon: 'message-square',
		link: '/pages/chatgpt',
	},
	{
		title: 'mermaid',
		icon: {
			icon:'mermaid_icon',
			pack:'my-icons',
		},
		link: '/pages/mermaid',
	},
	    {
	        title: '原创音频',
	        icon: 'headphones',
	        link: '/pages/original-audio',
	    },
	// {
	// 	title: '素材',
	// 	icon:{
	// 		icon:"sucai_icon",
	// 		pack:"my-icons"
	// 	},
	// 	link: '/pages/sourcePhoto',
	// },
	  {
    title: "游戏",
    icon: {
      icon: "card_game",
      pack: "my-icons",
    },
    children: [
      {
        title: "点歌室",
        icon: "home",
        link: "/pages/song-room",
      },
      {
        title: "斗地主",
        icon: {
          icon: "doudizhu",
          pack: "my-icons",
        },
        link: "/pages/dou-di-zhu",
      },
      {
        title: "卡牌游戏",
        icon: {
          icon: "sanchaji",
          pack: "my-icons",
        },
        link: "/pages/card-game",
      },
		{
	        title: "麻将",
	        icon: {
	          icon: "majiang",
	          pack: "my-icons",
	        },
	        link: "/pages/ma-jiang",
	      },
    ],
  },
	
	
	// {
	// 	title: '西哩xili',
	// 	icon: 'message-circle',
	// 	link: '/pages/xilixili',
	// },

	// {
	// 	title: '用户管理',
	// 	icon: 'person',
	// 	link: '/pages/userManagement',
	// },
	// {
	// 	title: 'UI Features',
	// 	icon: 'keypad-outline',
	// 	link: '/pages/ui-features',
	// 	children: [
	// 		{
	// 			title: 'Grid',
	// 			link: '/pages/ui-features/grid',
	// 		},
	// 		{
	// 			title: 'Icons',
	// 			link: '/pages/ui-features/icons',
	// 		},
	// 		{
	// 			title: 'Typography',
	// 			link: '/pages/ui-features/typography',
	// 		},
	// 		{
	// 			title: 'Animated Searches',
	// 			link: '/pages/ui-features/search-fields',
	// 		},
	// 	],
	// },
	// {
	//   title: 'E-commerce',
	//   icon: 'shopping-cart-outline',
	//   link: '/pages/dashboard',
	// },
	// {
	//   title: 'IoT Dashboard',
	//   icon: 'home-outline',
	//   link: '/pages/iot-dashboard',
	// },
	// {
	//   title: 'FEATURES',
	//   group: true,
	// },
	// {
	//   title: 'Layout',
	//   icon: 'layout-outline',
	//   children: [
	//     {
	//       title: 'Stepper',
	//       link: '/pages/layout/stepper',
	//     },
	//     {
	//       title: 'List',
	//       link: '/pages/layout/list',
	//     },
	//     {
	//       title: 'Infinite List',
	//       link: '/pages/layout/infinite-list',
	//     },
	//     {
	//       title: 'Accordion',
	//       link: '/pages/layout/accordion',
	//     },
	//     {
	//       title: 'Tabs',
	//       pathMatch: 'prefix',
	//       link: '/pages/layout/tabs',
	//     },
	//   ],
	// },
	// {
	//   title: 'Forms',
	//   icon: 'edit-2-outline',
	//   children: [
	//     {
	//       title: 'Form Inputs',
	//       link: '/pages/forms/inputs',
	//     },
	//     {
	//       title: 'Form Layouts',
	//       link: '/pages/forms/layouts',
	//     },
	//     {
	//       title: 'Buttons',
	//       link: '/pages/forms/buttons',
	//     },
	//     {
	//       title: 'Datepicker',
	//       link: '/pages/forms/datepicker',
	//     },
	//   ],
	// },

	// {
	//   title: 'Modal & Overlays',
	//   icon: 'browser-outline',
	//   children: [
	//     {
	//       title: 'Dialog',
	//       link: '/pages/modal-overlays/dialog',
	//     },
	//     {
	//       title: 'Window',
	//       link: '/pages/modal-overlays/window',
	//     },
	//     {
	//       title: 'Popover',
	//       link: '/pages/modal-overlays/popover',
	//     },
	//     {
	//       title: 'Toastr',
	//       link: '/pages/modal-overlays/toastr',
	//     },
	//     {
	//       title: 'Tooltip',
	//       link: '/pages/modal-overlays/tooltip',
	//     },
	//   ],
	// },
	// {
	//   title: 'Extra Components',
	//   icon: 'message-circle-outline',
	//   children: [
	//     {
	//       title: 'Calendar',
	//       link: '/pages/extra-components/calendar',
	//     },
	//     {
	//       title: 'Progress Bar',
	//       link: '/pages/extra-components/progress-bar',
	//     },
	//     {
	//       title: 'Spinner',
	//       link: '/pages/extra-components/spinner',
	//     },
	//     {
	//       title: 'Alert',
	//       link: '/pages/extra-components/alert',
	//     },
	//     {
	//       title: 'Calendar Kit',
	//       link: '/pages/extra-components/calendar-kit',
	//     },
	//     {
	//       title: 'Chat',
	//       link: '/pages/extra-components/chat',
	//     },
	//   ],
	// },
	// {
	//   title: 'Maps',
	//   icon: 'map-outline',
	//   children: [
	//     {
	//       title: 'Google Maps',
	//       link: '/pages/maps/gmaps',
	//     },
	//     {
	//       title: 'Leaflet Maps',
	//       link: '/pages/maps/leaflet',
	//     },
	//     {
	//       title: 'Bubble Maps',
	//       link: '/pages/maps/bubble',
	//     },
	//     {
	//       title: 'Search Maps',
	//       link: '/pages/maps/searchmap',
	//     },
	//   ],
	// },
	// {
	//   title: 'Charts',
	//   icon: 'pie-chart-outline',
	//   children: [
	//     {
	//       title: 'Echarts',
	//       link: '/pages/charts/echarts',
	//     },
	//     {
	//       title: 'Charts.js',
	//       link: '/pages/charts/chartjs',
	//     },
	//     {
	//       title: 'D3',
	//       link: '/pages/charts/d3',
	//     },
	//   ],
	// },
	// {
	//   title: 'Editors',
	//   icon: 'text-outline',
	//   children: [
	//     {
	//       title: 'TinyMCE',
	//       link: '/pages/editors/tinymce',
	//     },
	//     {
	//       title: 'CKEditor',
	//       link: '/pages/editors/ckeditor',
	//     },
	//   ],
	// },
	// {
	//   title: 'Tables & Data',
	//   icon: 'grid-outline',
	//   children: [
	//     {
	//       title: 'Smart Table',
	//       link: '/pages/tables/smart-table',
	//     },
	//     {
	//       title: 'Tree Grid',
	//       link: '/pages/tables/tree-grid',
	//     },
	//   ],
	// },
	// {
	//   title: 'Miscellaneous',
	//   icon: 'shuffle-2-outline',
	//   children: [
	//     {
	//       title: '404',
	//       link: '/pages/miscellaneous/404',
	//     },
	//   ],
	// },
	// {
	//   title: 'Auth',
	//   icon: 'lock-outline',
	//   children: [
	//     {
	//       title: 'Login',
	//       link: '/auth/login',
	//     },
	//     {
	//       title: 'Register',
	//       link: '/auth/register',
	//     },
	//     {
	//       title: 'Request Password',
	//       link: '/auth/request-password',
	//     },
	//     {
	//       title: 'Reset Password',
	//       link: '/auth/reset-password',
	//     },
	//   ],
	// },
];
