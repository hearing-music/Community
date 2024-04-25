import { Component, OnInit, OnDestroy, ViewChild, } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { NzMessageService } from "ng-zorro-antd/message";
import UAParser from "ua-parser-js";
//解决前面url 多了unsafe:问题
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from '../../../environments/environment';
import { CommonService } from "../../services/common.service";
@Component({
	selector: "ngx-screenRecording",
	templateUrl: "./screenRecording.component.html",
	styleUrls: ["./screenRecording.component.scss"],
})
export class ScreenRecordingComponent implements OnInit, OnDestroy {
	@ViewChild('videoPlayer') videoPlayer : any;
	constructor(private api : ApiService, public common: CommonService,private message : NzMessageService, public sanitizer : DomSanitizer) { }

	ngOnInit() : void {
		// @ts-ignore
		window._this = this;

		this.initServer();

		// 获取video标签
		try {
			let player = this.videoPlayer.myVideoPlayer;
			this.videoEl = (player.tech && player.tech({ IWillNotUseThisInPlugins: true }).el()) || null;
			if (!this.videoEl) {
				console.log("no video node");
				throw new Error("no video");
			}
		} catch (e) {
			let el = document.querySelector("video");
			if (el) {
				this.videoEl = el;
			}
		}
	}
	ngOnDestroy() {
		if (this.record) {
			this.record.close;
		}
	}

	recording = false;
	record = null
	flicker = false
	setIntervalId : any = null
	downloadEl = []

	videoEl = null

	loading = false;
	zhuanhuan(item:any) {
		this.loading = true;
		fetch(item.url)
			.then(response => response.blob())
			.then(blob => {
				// 这里blob就是你想要的文件对象  
				console.log(blob);
				let file = new File([blob], "111.webm", { type: "video/webm" });

				console.log(file);
				this.api.AllAudioConversion({ files: file }).subscribe((res : any) => {
					console.log(res)
					if(res.success){
						item.downloadUrl = environment.downloadUrl+res.data
					}else{
						this.message.error("转换失败")
					}
					this.loading = false;
				},(err)=>{
					this.loading = false;
				});
			})
			.catch(error => {
				console.error('Error fetching blob:', error);
				this.loading = false;
			});
	}
	download(item:any){
		let time = new Date().getTime();
		this.common.download(item.downloadUrl,this.common.getTime(time) + ".mp4")
	}
	initServer() {
		let uaObj = new UAParser();
		console.log(`uaObj`, uaObj.getBrowser());
		//引入recoder
		let { default: Record } = require("../../services/screenRecording/recorder.js");
		Record.init({ browser: uaObj.getBrowser() });
		this.record = new Record({
			onended: () => { },
			onerror: () => { },
			onStartRecord: () => {
				let recording = true;
				this.watchRecording(recording)
				window.onbeforeunload = () => "";
				window.onunload = () => "";
			},
			onFinishRecord: (downloadInfo : any) => {
				if (downloadInfo && downloadInfo.element) {
					this.downloadEl.push(downloadInfo);
					let recording = false;
					this.watchRecording(recording)
					this.message.success("录制完成,请下载！")
				} else {
					this.message.success("录制已完成！")
					let recording = false;
					this.watchRecording(recording)
					// @ts-ignore
					window.onbeforeunload = "";
					// @ts-ignore
					window.onunload = "";
				}
			},
		});
	}
	watchRecording(recording : any) {
		if (recording) {
			this.flicker = true;
			this.setIntervalId = setInterval(() => {
				this.flicker = !this.flicker;
			}, 500);
		} else {
			this.setIntervalId && clearInterval(this.setIntervalId);
			this.setIntervalId = null;
			this.flicker = false;
		}
		this.recording = recording;
	}
	startRecord(isScreen : any) {
		if (!this.videoEl) return;

		console.log("开始录制------");
		this.record
			.start(this.videoEl, isScreen)
			.then((resp : any) => {
				console.log(`rsep`, resp);
			})
			.catch((error : any) => {
				console.log("error:", error);
			});

		// Object.keys(this.remoteHandles).forEach(item => {
		//     let stream = this.remoteHandles[item].webrtcStuff.remoteStream;
		//     stream && record.connectAudio(stream);
		// });
		//////////////////////
	}
	stopRecord() {
		if (!this.record) return;
		this.record.stop();
	}
	downloadRecord() {
		console.log("下载录制------");
		// window.record.download(Object.values(this.remoteHandles)[0].webrtcStuff.remoteStream);
	}
}