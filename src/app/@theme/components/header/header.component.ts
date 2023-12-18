import { Component, OnDestroy, OnInit,NgZone } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
  import { Router} from '@angular/router';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {CommonService} from "../../../services/common.service";
import { AuthService } from '../../../services/auth.service'
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from "../../../services/api.service";
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
			  public message:NzMessageService,
			  public api: ApiService,
			  public author:AuthService,
			  private common:CommonService,
			  public router:Router,
              private breakpointService: NbMediaBreakpointsService,
			  private ngZone: NgZone) {
				  window["NgAppRef3"] = { component: this, zone: this.ngZone };
  }
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
			this.message.info('请输入')
			return
		}
		this.cookieLoading = true;
		if(this.select=='dygf'){
			this.api.dygw_setCookie({value:this.cookie}).subscribe((res: any) => {
				this.cookieLoading = false;
				this.message.success('更换成功')
			}, (err: any) => {
				this.cookieLoading = false;
			})
		}else if(this.select == 'dyrd'){
			this.api.dyrd_setCookie({value:this.cookie}).subscribe((res: any) => {
				this.cookieLoading = false;
				this.message.success('更换成功')
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
