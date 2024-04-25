import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
	selector: 'ngx-videoPlayer',
	templateUrl: './videoPlayer.component.html',
	styleUrls: ['./videoPlayer.component.scss']
})
export class VideoPlayerComponent implements OnInit {
	constructor() { }

	ngOnInit() : void {
	}

	// component options
	playsinline = true

	// videojs options
	playerOptions = {
		playsinline : true,
		muted : true,
		// language: "zh-cn",
		// playbackRates: [0.7, 1.0, 1.5, 2.0],
		sources : [
			// {
			//     type: "video/mp4",
			//     src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm",
			// },
		],
		autoplay : true,
		// poster : require("@/assets/images/video-back.webp"),
	}
	
	
	 // listen event
	        onPlayerPlay(player:any) {
	            // console.log('player play!', player)
	        }
	        onPlayerPause(player:any) {
	            // console.log('player pause!', player)
	        }
	        onPlayerEnded(player:any) {
	            // console.log('player ended!', player)
	        }
	        onPlayerLoadeddata(player:any) {
	            // console.log('player Loadeddata!', player)
	        }
	        onPlayerWaiting(player:any) {
	            // console.log('player Waiting!', player)
	        }
	        onPlayerPlaying(player:any) {
	            // console.log('player Playing!', player)
	        }
	        onPlayerTimeupdate(player:any) {
	            // console.log('player Timeupdate!', player.currentTime())
	        }
	        onPlayerCanplay(player:any) {
	            // console.log('player Canplay!', player)
	        }
	        onPlayerCanplaythrough(player:any) {
	            // console.log('player Canplaythrough!', player)
	        }
	        // or listen state event
	        playerStateChanged(playerCurrentState:any) {
	            // console.log("player current update state", playerCurrentState);
	        }
	        // player is ready
	        playerReadied(player:any) {
	            // console.log("example 01: the player is readied", player);
	        }
}