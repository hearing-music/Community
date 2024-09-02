import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router'
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
	selector: 'ngx-set-ranking',
	templateUrl: './set-ranking.component.html',
	styleUrls: ['./set-ranking.component.scss']
})
export class SetRankingComponent implements OnInit {

	constructor(private modal: NzModalService,public common: CommonService, public api: ApiService, private toast: ToastrService, public route: ActivatedRoute) {
		this.route.params.subscribe((res) => {
			// console.log(res)
			this.kgsearchValue = res.scid;
		})
	}
	ngOnInit(): void {
	}
	qqsearchValue = '';
	kgsearchValue = '';

	qqmid = '';
	kgscid = '';
	btnDisable = true;
	loading = false;
	data: any = [];
	isVisible = false;
	focus() {
		document.onkeydown = (event_e: any) => {
			if (event_e.keyCode === 13) {
				this.search()
			}
		}
	}
	blur() {
		document.onkeydown = null
	}
	qqinput() {
		this.isDisabled()
	}
	kginput() {
		this.isDisabled()
	}
	openqq(mid: string) {
		window.open('https://y.qq.com/n/ryqq/songDetail/' + mid)
	}
	openkg(EMixSongID: string) {
		window.open('https://www.kugou.com/song/#'+EMixSongID)
	}
	isDisabled() {
		if (this.qqsearchValue != '' && this.kgsearchValue != '') {
			this.btnDisable = false;
		} else {
			this.btnDisable = true;
		}
	}
	search() {
		let { scid, mid, success, message } = this.getData(this.qqsearchValue, this.kgsearchValue)
		if (!success) {
			this.toast.error(message)
			return
		}
		this.getqq_kugouKeywordInfo(mid, scid)
	}
	getData(qqvalue: any, kgvalue: any) {
		if (isNaN(Number(kgvalue))) {
			return { success: false, scid: '', mid: '', message: '酷狗id格式错误' }
		}
		var qqurl = 'https://y.qq.com/n/ryqq/songDetail/'
		var qqurl2 = '?songtype=0'
		if (qqvalue.indexOf(qqurl) == -1 || qqvalue.indexOf(qqurl2) != -1) {
			return { success: false, scid: '', mid: '', message: 'QQ链接格式错误' }
		}

		let mid = qqvalue.substr(qqurl.length);
		if (!isNaN(Number(mid))) {
			return { success: false, scid: '', mid: '', message: 'QQid格式错误' }
		}
		let scid = kgvalue;
		return { success: true, scid, mid, message: '1' }
	}
	getqq_kugouKeywordInfo(mid: any, scid: any) {
		this.loading = true;
		this.api.getqq_kugouKeywordInfo({
			mid,
			scid
		}).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				this.data = res.result;
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}

	addRanking() {
		// this.isVisible = true;
		this.modal.confirm({
		      nzTitle: '确定加入监测吗',
		      // nzContent: '确定加入监测吗',
		      nzOnOk: () => this.handleOk()
		    });
	}
	handleOk(): void {
		// this.isVisible = false;
		let scid = this.data[0].kugou.scid;
		let mid = this.data[0].qq.song_mid;
		let qq = this.data[0].qq;
		let kugou = this.data[0].kugou;
		this.setqq_kugouKeywordInfo(scid,mid,qq,kugou)
	}
	// handleCancel(): void {
	// 	this.isVisible = false;
	// }
	setqq_kugouKeywordInfo(scid:any,mid:any,qq:any,kugou:any) {
		this.loading = true;
		this.api.setqq_kugouKeywordInfo({
			scid,
			mid,
			qq,
			kugou
	}).subscribe((res: any) => {
				console.log(res)
				if(res.success){
					this.toast.success(res.message)
				}
				this.loading = false;
			}, (err: any) => {
				console.log(err)
				this.loading = false;
			})
	}
}
