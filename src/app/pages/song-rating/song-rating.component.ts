import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import { ToastrService } from 'ngx-toastr';
// import WaveSurfer from 'wavesurfer.js'
let WaveSurfer = require('wavesurfer.js')
import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.esm.js'
import Timeline from 'wavesurfer.js/dist/plugins/Timeline.esm.js'
import Hover from 'wavesurfer.js/dist/plugins/Hover.esm.js'
@Component({
	selector: "ngx-song-rating",
	templateUrl: "./song-rating.component.html",
	styleUrls: ["./song-rating.component.scss"],
})
export class SongRatingComponent implements OnInit {
	@ViewChild('uploadFileRef') uploadFileRef : any;
	ngOnInit() : void {
		this.UserId = localStorage.getItem("userId")
		this.SearchAllSongs()
	}
	constructor(public api : ApiService, public common : CommonService, private toast : ToastrService) { }
	loading = false;
	tagList : any = [
		{
			name: "投票打分",
		},
		{
			name: "上传歌曲",
		},
	];
	tagList2 : any = [
		{
			name: "已投票",
		},
		{
			name: "未投票",
		},
	]
	selectItem : any = '投票打分';
	selectItem2 : any = '未投票';

	onSelect(item : any) {
		this.selectItem = item.name;
		if (item.name == '投票打分') {
			this.SearchAllSongs()
		}
	}
	onSelect2(item : any) {
		this.selectItem2 = item.name;
	}
	file : any = null
	FileName : any = ''
	UserId : any = 0
	onFile(file : any) : void {
		console.log(file)
		// console.log(this.host)
		this.file = file;
		this.FileName = file.name
	}

	UploadAudio() {
		this.loading = true;
		this.api.UploadAudio({ UserId: this.UserId, FileName: this.FileName, Audio: this.file, Reason: this.ReasonText, Lyric: this.LyricText }).subscribe((res : any) => {
			if (res.success) {
				this.toast.success("上传成功")
				this.uploadFileRef.clearFile()
				this.file = null;
				this.FileName = ''
				this.ReasonText = ''
				this.LyricText = ''
			}
			this.loading = false;
		}, (err : any) => {
			this.loading = false;
		})
	}
	no : any = []
	yes : any = []
	SearchAllSongs() {
		this.loading = true;
		this.api.SearchAllSongs({ UserId: this.UserId }).subscribe((res : any) => {
			if (res.success) {
				res.data.no.forEach((item : any) => {
					let i = item.Title.indexOf('@')
					item.Title = item.Title.substr(i + 1, item.Title.length - 1)
					let i2 = item.Title.lastIndexOf('.')
					item.Title = item.Title.substr(0, i2)
					if (item.Lyric) {
						item.Lyric = this.common.parseLRC3(item.Lyric)
					}
				})
				res.data.yes.forEach((item : any) => {
					let i = item.Title.indexOf('@')
					item.Title = item.Title.substr(i + 1, item.Title.length - 1)
					let i2 = item.Title.lastIndexOf('.')
					item.Title = item.Title.substr(0, i2)
					if (item.Lyric) {
						item.Lyric = this.common.parseLRC3(item.Lyric)
					}
				})
				this.no = res.data.no
				this.yes = res.data.yes
				this.findPlayMusic()
				if (this.no.length == 0) {
					this.selectItem2 = '已投票'
				}
			}
			this.loading = false;
		}, (err : any) => {
			this.loading = false;
		})
	}
	findPlayMusic() {
		let i = this.yes.findIndex((e : any) => e.OpenUpUrl == this.audioSrc)
		let i2 = this.no.findIndex((e : any) => e.OpenUpUrl == this.audioSrc)
		if (i != -1) {
			this.yes[i].isplay = true
		}
		if (i2 != -1) {
			this.no[i2].isplay = true
		}
	}
	Referendum(item : any, Opinion : number, index : any) {
		this.loading = true;
		this.api.Referendum({ UserId: this.UserId, SongId: item.ID, Opinion }).subscribe((res : any) => {
			if (res.success) {
				this.toast.success("打分成功")
				this.SearchAllSongs()

			}
		}, (err : any) => {
			this.loading = false;
		})
	}
	pause() {
		this.yes.forEach((item : any) => {
			item.isplay = false;
		})
		this.no.forEach((item : any) => {
			item.isplay = false;
		})
	}
	play() {
		this.no.forEach((item : any) => {
			if (item.OpenUpUrl == this.audioSrc) {
				item.isplay = true;
			}
		})
		this.yes.forEach((item : any) => {
			if (item.OpenUpUrl == this.audioSrc) {
				item.isplay = true;
			}
		})
	}
	isPlay = false;
	audioSrc = ''
	playMusic(item : any) {
		this.isPlay = true;
		this.audioSrc = item.OpenUpUrl
		setTimeout(() => {
			this.yes.forEach((item : any) => {
				item.isplay = false;
			})
			this.no.forEach((item : any) => {
				item.isplay = false;
			})
			item.isplay = true;
			this.ws(this.audioSrc)
		}, 50)

	}
	pauseMusic(item : any) {
		this.WS.pause()
		this.pause()
	}
	mouseenter(item : any) {
		item.lyricShow = true;
	}
	mouseleave(item : any) {
		item.lyricShow = false;
	}

	LyricText = ''
	ReasonText = ''
	uploadFile() {
		if (!this.LyricText || !this.ReasonText || !this.file) {
			this.toast.info('缺少参数')
			return
		}
		this.UploadAudio()
	}
	WS : any = null
	ws(url : string) {
		this.isPlay = true
		if (!this.WS) {
			this.WS = WaveSurfer.create({
				container: '#waveform',
				waveColor: 'rgb(200, 0, 200)',
				progressColor: 'rgb(100, 0, 100)',
				url,
				sampleRate: 22050,
				height: 70,
				dragToSeek:true,
				// mediaControls: true,
				autoplay: true,
				 plugins: [
					Timeline.create({
						timeInterval: 5,
					}),
				    Hover.create({
				      lineColor: '#ff0000',
				      lineWidth: 2,
				      labelBackground: '#555',
				      labelColor: '#fff',
				      labelSize: '11px',
				    }),
					// Spectrogram.create({
					// 	labels: true,
					// 	height: 110,
					// 	splitChannels: false,
					// }),
				  ],
			})
			// Play on click
			this.WS.once('interaction', () => {
				this.WS.play()
				this.WS.addCursor();
			})
			/** When the audio starts playing */
			this.WS.on('play', () => {
				this.play()
			})

			/** When the audio pauses */
			this.WS.on('pause', () => {
				this.pause()
			})
			this.WS.on('timeupdate',  (currentTime:any)=> {
			    this.updateTimeDisplay(currentTime);
			});
		} else {
			if (this.audioSrc != this.WS.options.url) {
				this.WS.load(this.audioSrc);
				this.WS.options.url = this.audioSrc
			}
			this.WS.play();
		}
	}
	// 更新时间显示的函数
	updateTimeDisplay(percentage:any) {
	    var duration = this.WS.getDuration();
		let progress = percentage/duration
	    var formattedTime = this.formatTime(percentage);
		var durationTime = this.formatTime(duration)
	    // 假设你有一个id为#time的元素来显示时间
	    document.getElementById('time').innerText = formattedTime;
	    document.getElementById('time').style.transform = `translateX(${progress*100}%)`;
	    document.getElementById('timeEnd').innerText = durationTime;
	}
	formatTime(time:any) {
	    var minutes = Math.floor(time / 60);
	    var seconds = Math.floor(time % 60);
	    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	}
}