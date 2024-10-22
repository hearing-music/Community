import { Component, OnDestroy, OnInit,NgZone } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
  import { Router} from '@angular/router';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {CommonService} from "../../../services/common.service";
import { AuthService } from '../../../services/auth.service'
import { ToastrService } from 'ngx-toastr';
import { ApiService } from "../../../services/api.service";
import screenfull from 'screenfull';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  // userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];
  userMenu = [ { title: '退出登录' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
			  private toast: ToastrService,
			  public api: ApiService,
			  public author:AuthService,
			  private common:CommonService,
			  public router:Router,
			  private notification:NzNotificationService,
              private breakpointService: NbMediaBreakpointsService,
			  private ngZone: NgZone) {
				  window["NgAppRef3"] = { component: this, zone: this.ngZone };
  }
  
  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
  visible=false;
  
  	createBasicNotification() {
  	   this.notification
  	     .blank(
  	       '有新的更新',
  	       `详情点击右上角头像左边图标查看`,
  				{
  					nzDuration:3500
  				}
  	     )
  	 }
    tabs:any = [
      {
        label: '更新日志',
        messages: [
			{
				icon: '📢',
				color: 'bg-azure-95',
				title: '2024年10月22日14:58',
			  	newAdd:[],//新增
			  	optimize:['抖音达人搜索新增 分享链接搜索达人'],//优化
			  	bugs:[],//修复bug
			},
			{
				icon: '📢',
				color: 'bg-azure-95',
				title: '2024年10月21日17:07',
			  	newAdd:[],//新增
			  	optimize:['歌曲打分新增波形图显示'],//优化
			  	bugs:['修复歌曲打分可重复点击评分'],//修复bug
			},
			{
				icon: '📢',
				color: 'bg-azure-95',
				title: '2024年10月18日19:07',
			  	newAdd:['新增歌曲打分功能'],//新增
			  	optimize:[],//优化
			  	bugs:[],//修复bug
			},
			{
				icon: '📢',
				color: 'bg-azure-95',
				title: '2024年10月15日18:07',
			  	newAdd:['qq酷狗免费歌曲集合'],//新增
			  	optimize:[],//优化
			  	bugs:[],//修复bug
			},
			{
				icon: '📢',
				color: 'bg-azure-95',
				title: '2024年10月15日11:40',
			  	newAdd:[],//新增
			  	optimize:['唱将音乐新增发行公司显示'],//优化
			  	bugs:[],//修复bug
			},
			{
				icon: '📢',
				color: 'bg-azure-95',
				title: '2024年9月21日13:24',
			  	newAdd:[],//新增
			  	optimize:['qq免费歌曲新增图片','酷狗免费歌曲新增播放和图片'],//优化
			  	bugs:[],//修复bug
			},
			{
				icon: '📢',
				color: 'bg-azure-95',
				title: '2024年9月20日10:59',
			  	newAdd:[],//新增
			  	optimize:['浮浮雷达下架'],//优化
			  	bugs:[],//修复bug
			},
			{
				icon: '📢',
				color: 'bg-azure-95',
				title: '2024年9月18日13:37',
			  	newAdd:[],//新增
			  	optimize:['部分跳转链接变成打开新窗口跳转'],//优化
			  	bugs:[],//修复bug
			},
			{
				icon: '📢',
				color: 'bg-azure-95',
				title: '2024年9月18日11:03',
			  	newAdd:['酷狗免费歌曲，新增 "最近新增" 类别'],//新增
			  	optimize:['酷狗免费歌曲，最近新增 图标，更新 图标'],//优化
			  	bugs:[],//修复bug
			},
			{
				icon: '📢',
				color: 'bg-azure-95',
				title: '2024年9月11日17:19',
			  	newAdd:['QQ免费歌曲，新增 "最近新增" 类别'],//新增
			  	optimize:['QQ免费歌曲，最近新增 图标，更新 图标'],//优化
			  	bugs:[],//修复bug
			},
			{
				icon: '📢',
				color: 'bg-azure-95',
				title: '2024年9月9日15:04',
			  	newAdd:['QQ免费歌曲，酷狗免费歌曲新增 “独立付费”类别查询'],//新增
			  	optimize:[],//优化
			  	bugs:[],//修复bug
			},
			{
				icon: '📢',
				color: 'bg-azure-95',
				title: '2024年9月6日18:00',
			  	newAdd:['qq搜索 酷狗v3搜索 酷我搜索 网易云搜索 新增封面','qq搜索 新增 可选是否查询历史上游 默认开启'],//新增
			  	optimize:['qq搜索 酷狗v3搜索 酷我搜索 网易云搜索 每页5条->10条','抖音监控声源 增长量从高到低排序'],//优化
			  	bugs:['修复多版本歌曲播放及多版本封面'],//修复bug
			},
  		  {
  		  	icon: '📢',
  		  	color: 'bg-azure-95',
  		  	title: '2024年9月3日17:25',
  			newAdd:['更新日志及其他 + 全屏功能'],//新增
  			optimize:[],//优化
  			bugs:[],//修复bug
  		  },
        ],
      },
      {
        label: '其他',
        messages: [
          {
            icon: '👼🏼',
            color: 'bg-magenta-95',
            title: '我们的使命',
            content: `与奋斗者共同进步
为创作者提升价值
为社会提供优质和丰富的文化内容`,
          },
  		{
  		    icon: '🙏️',
  		    color: 'bg-magenta-95',
  		    title: '我们的愿景',
  		    content: `五年内，成为国内前三的文娱内容提供商`,
  		},
  		{
  		    icon: '☀️',
  		    color: 'bg-magenta-95',
  		    title: '我们的核心价值观',
  		    content: `相信，探索，传承，公平`,
  		},
  		{
  		    icon: '🧗️',
  		    color: 'bg-magenta-95',
  		    title: '我们的精神',
  		    content: `不抱怨，传承，没有完不成，不要我觉得，
不要吃老本 要立新功，努力搞歌，
相信奇迹 才能创造奇迹，可以焦虑 但别丧`,
  		},
  		{
  		    icon: '🤔️',
  		    color: 'bg-magenta-95',
  		    title: '我们的管理理念',
  		    content: `用人不疑，疑人不用
坚持原则，强调纪律
过程要尊重，结果是关键
不放弃任何一个伙伴
打造学习型团队
公平公正，尊重努力`,
  		},
  		{
  		    icon: '🤠️',
  		    color: 'bg-magenta-95',
  		    title: '我们的工作理念',
  		    content: `今日事，今日毕
敢干敢说
自省，少自我感动
积极向上
发现问题，解决问题
理性思考`,
  		},
  		{
  		    icon: '🏷︎️',
  		    color: 'bg-magenta-95',
  		    title: '我们的十个标准',
  		    content: `善于沟通   诚实正直    尊重他人    乐观自信   公平公正
积极进取   创新奉献    充满激情    廉洁自律   主人精神`,
  		},
  		// {
  		// 	icon: '👦',
  		// 	color: 'bg-magenta-95',
  		// 	title: '我们的老弟',
  		// 	content: '',
  		// 	img:'https://7463-tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd-1313286159.tcb.qcloud.la/avatar/wxfiletemp338f7e41bf087150e4ce96c8cc18e23.jpg'
  		// },
        ],
      },
    ];
  
  
  
  
	logOut(){
		console.log('logout')
		// localStorage.setItem('phone', null)
		this.common.removeLocalStorages()
		this.router.navigate(['/login']);
	}
	ks_monitoring_limit:any=0
	ks_monitoring_limitNow:any=0
	cookieShow:any = false;
	cookie:any='';
	select='dygf';
	cookieLoading=false;
	updateDYCount(){
		this.ks_monitoring_limit = localStorage.getItem('ks_monitoring_limit')||0
		this.ks_monitoring_limitNow = localStorage.getItem('ks_monitoring_limitNow')||0
	}
	showCookie(){
		this.cookieShow = true;
	}
	handleCancel(){
		this.cookieShow = false;
	}
	ngModelChange(e:any){
		console.log(e)
		this.select = e;
	}
	confirm(){
		if(!this.cookie){
			this.toast.info('请输入')
			return
		}
		this.cookieLoading = true;
		if(this.select=='dygf'){
			this.api.dygw_setCookie({value:this.cookie}).subscribe((res: any) => {
				this.cookieLoading = false;
				this.toast.success('更换成功')
			}, (err: any) => {
				this.cookieLoading = false;
			})
		}else if(this.select == 'dyrd'){
			this.api.dyrd_setCookie({value:this.cookie}).subscribe((res: any) => {
				this.cookieLoading = false;
				this.toast.success('更换成功')
			}, (err: any) => {
				this.cookieLoading = false;
			})
		}
	}
  ngOnInit() {
	  this.updateDYCount()
    this.currentTheme = this.themeService.currentTheme;
	let name = localStorage.getItem('username') || '神秘人';
	let url = localStorage.getItem('url')
	if(url == 'null' || !url){
		url = '../../../../assets/img/avatar.jpg'
	}
	this.user = {name:name,picture:url}
    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   // .subscribe((users: any) => this.user = users.nick);
    //   .subscribe((users: any) => {this.user = {name:'阿磊',picture:'assets/images/nick.png'};});

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
	
	
	let nowVersion = '.'+this.tabs[0].messages.length
	let AppVersion = localStorage.getItem('app-version')
	if(nowVersion != AppVersion){
		// 有更新
		this.createBasicNotification()
		localStorage.setItem("app-version", nowVersion);
	}
	
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

}
