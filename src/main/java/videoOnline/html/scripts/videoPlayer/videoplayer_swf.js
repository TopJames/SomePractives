/**
 * dw_liangzijian
 */
(function(win, $){
	
	var isfullScreen = false;
	var nowFullScreenObject = null;
	
	
	var videoPlayer = function(dom,src){
		this.dom = dom;
		this.src = src;
		this.playerId = "_videoplayer"+new Date().getTime() + "_" + parseInt(1000*Math.random());
		this.videoCtrlId = this.playerId + "_player";
		this.storage = {};
		this.isSWF = true;
		
		isfullScreen = (isfullScreen || (document.webkitIsFullScreen || document.mozIsFullScreen || document.fullscreenElement    || document.msFullscreenElement))
			? true : false;
		
		var mmthis = this;
		
		this.storage.menu = [
			{text:"播放/暂停",handler:function(){
				if(mmthis.getPlayer().paused)
					mmthis.play();
				else
					mmthis.pause();
			}}/*,
			{text:"加速",handler:function(){
				$(mmthis.dom).find("*[playerClass='raiseSpeedIcon']").trigger("click");
			}},
			{text:"减速",handler:function(){
				$(mmthis.dom).find("*[playerClass='reduceSpeedIcon']").trigger("click");
			}}*/
		];
		
		this.destroy = function(){
			if(this.getPlayer())
				this.pause();
			$(this.dom).unbind("mousemove mouseleave");
			$(this.dom).empty();
		}
				
		
		this.isFullScreen = function(){
			return document.webkitIsFullScreen || document.mozIsFullScreen || document.fullscreenElement    || document.msFullscreenElement  ;
		}
		
		this.getSpeed = function(){
			return this.getPlayer()?this.getPlayer().playbackRate : 1 ;
		}
		
		this.setLayout = function(width,height){
			$(this.dom).width(width+'px');
			$(this.dom).height(height+'px');
			$("#"+this.videoCtrlId).height(height+'px');
			flowplayer(this.videoCtrlId).setSwfHeight(height)
			this._withskin($(this.dom));
		}
		
		this.setPlayWatermark = function(waterMark){
			$(this.dom).find("*[playerClass='playerWatermark']").html(waterMark);
		}
		
		this.setMenu = function(menu){
			if(!menu)
				return;
			for(var i=0;i<menu.length;i++){
				this.storage.menu.push(menu[i]);
			}
			
		}
		
		this.init = function(){
			this._build();
			//this._adpaterHLS();
			var mthis = this;
			
			flowplayer(this.videoCtrlId, "/lib/videoPlayer/swf/flowplayer.swf", {
				// configure the required plugins
				plugins: {
					httpstreaming: {
						url: '/lib/videoPlayer/swf/flashlsFlowPlayer.swf'
					},
					controls: {
                        bottom: 0,//功能条距底部的距离
                        height: 24, //功能条高度
                        zIndex: 1,
                        fontColor: '#ffffff',
                        timeFontColor: '#333333',
                        playlist: true,//上一个、下一个按钮
                        play:true, //开始按钮
                        volume: true, //音量按钮
                        mute: true, //静音按钮
                        stop: true,//停止按钮
                        fullscreen: true, //全屏按钮
                        scrubber: true,//进度条
                        url: "/lib/videoPlayer/swf/flowplayer.controls.swf", //决定功能条的显示样式（功能条swf文件,根据项目定亦可引用:http://releases.flowplayer.org/swf/flowplayer.controls-3.2.12.swf）
                        time: true, //是否显示时间信息
                        autoHide: true, //功能条是否自动隐藏
                        backgroundColor: '#aedaff', //背景颜色
                        backgroundGradient: [0.1, 0.1, 1.0], //背景颜色渐变度（等分的点渐变）
                        opacity: 0 //功能条的透明度
                       
                    }/*,
					speedIndicator: {
						url: "flowplayer.content-3.2.9.swf",
						bottom: 50,
						right: 15,
						width: 135,
						height: 30,
						border: 'none',
						style: {
							body: {
								fontSize: 12,
								fontFamily: 'Arial',
								textAlign: 'center',
								color: '#ffffff'
							}
						},
						backgroundColor: 'rgba(20, 20, 20, 0.5)',
						display: 'none'
					}
					,
					slowmotion: {
						url: "flowplayer.slowmotion-3.2.10.swf",
						serverType: "hls"
					}*/
				},
				clip: {
					url: mthis.src,
					urlResolvers: ["httpstreaming","brselect"],
					provider: "httpstreaming",
					autoPlay: false
				},
				log: {
					level: 'debug',
					filter: 'org.osmf.*, org.electroteque.m3u8.*, org.flowplayer.bitrateselect.*'
				}
			});
			
			
			
			flowplayer(this.videoCtrlId).onStart(function(a){
				var player = mthis.getPlayer();
				console.log(player);
				var totalTime = Math.ceil(player.duration);
				var showTime = mthis._formaterTime(totalTime);
				if(mthis.storage.initSeekTo){
					if(mthis.storage.initSeekTo < 0)
						mthis.seekTo(player.duration + mthis.storage.initSeekTo > 0 ? player.duration + mthis.storage.initSeekTo : 0);
					else{
						mthis.seekTo( mthis.storage.initSeekTo > player.duration  ? player.duration : mthis.storage.initSeekTo);
					}
				}
				$(mthis.dom).find("*[playerClass='totalTimeFont']").text(showTime);
				mthis.storage.totalVideoTime = totalTime;
				this.voice();
			});
			
			this._bindListener();
			this._hideCtrltimer.timeouter();
			this._initPlayerTimeout();
		}
		
		this.saveData = function(key,val){
			if(!this._userSaveData)
				this._userSaveData = {};
			this._userSaveData[key] = val;
		}
		
		this.getSaveData = function(key){
			if(!this._userSaveData)
				this._userSaveData = {};
			return this._userSaveData[key];
		}
		
		this.seekTo = function(time,buildStatus){
			if(this.storage.initSeekTo)
				this.storage.initSeekTo = time;
			if(time<0){
				if(this.getPlayer().duration){
					time = this.getPlayer().duration + time;
				}else{
					this.storage.initSeekTo = time;
					return;
				}
			}
			this.getPlayer().seek (time);
			if(buildStatus != false )
				this._showPlayStatus();
		}
		
		this.voice = function(voice){
			var player = this.getPlayer();
			if(!voice && voice != 0){
				voice = player.volume;
				$(this.dom).find(("*[playerClass='voiceCurLine']")).css("top", (100 - parseFloat(voice) * 100 ) + 'px');
				$(this.dom).find("*[playerClass='playerVoiceIcon']").css("top", (100 - parseFloat(voice) * 100 ) - 10 + 'px')
				return voice;
			}
			else{
				//this._hideTips();
				player.setVolume(voice);
				$(this.dom).find(("*[playerClass='voiceCurLine']")).css("top", (100 - parseFloat(voice) * 100 ) + 'px');
				$(this.dom).find("*[playerClass='playerVoiceIcon']").css("top", (100 - parseFloat(voice) * 100 ) - 10 + 'px')
				var left = $(this.dom).width();
				var top = $(this.dom).height() - 130;
				
				this._showTips("音量："+parseInt((parseFloat(voice) * 100 )), top , left / 2 - 20);
			}
				
		}
		
		this.play = function(){
			this.getPlayer().play();
			this._showPlayStatus();
		}
		
		this.pause = function(){
			this.getPlayer().pause();
			this._showPlayStatus();
		}
		
		this.fullScreen = function(){
			var mthis = this;
			if($(this.dom)[0].webkitRequestFullScreen)
				$(this.dom)[0].webkitRequestFullScreen();
			else if($(this.dom)[0].mozRequestFullScreen)
				$(this.dom)[0].mozRequestFullScreen();
			mthis.storage.oldHeight = $(mthis.dom).height();
			mthis.storage.oldWidth = $(mthis.dom).width();
			mthis.storage.margin = $(mthis.dom).css("margin");
			mthis.storage.padding = $(mthis.dom).css("padding");
			$(mthis.dom).css({"height":"100%","width":"100%","margin":"0","padding":"0"});
			window.setTimeout(function(){
				mthis._withskin($(mthis.dom).find("div:first"));
				mthis.setLayout($(mthis.dom).width(), $(mthis.dom).height());
				nowFullScreenObject = mthis;
				isfullScreen = true;
				mthis._showPlayStatus();
			},400);
		}
		
		this.exitFullScreen = function(){
			var mthis = this;
			if(!mthis.storage.oldHeight){
				mthis.storage.oldHeight = $(mthis.dom).parent().height();
			}if(!mthis.storage.oldWidth){
				mthis.storage.oldWidth = $(mthis.dom).parent().width();;
			}
			
			$(mthis.dom).height(mthis.storage.oldHeight);
			$(mthis.dom).width(mthis.storage.oldWidth);
			$(mthis.dom).css({"margin":mthis.storage.margin,"padding":mthis.storage.padding});
			window.setTimeout(function(){
				mthis._withskin($(mthis.dom).find("div:first"));
				mthis.setLayout($(mthis.dom).width(), $(mthis.dom).height());
				isfullScreen = false;
				nowFullScreenObject = null;
			},400);
		}
		
		this.getPlayer = function(){
			var mthis = this;
			var flowplayerApi = flowplayer(mthis.videoCtrlId);
			if(!flowplayerApi)
				return {};
			var playerObject = {
				play : function(){
					flowplayerApi.play();
				},
				pause : function(){
					flowplayerApi.pause();
				},
				currentTime: flowplayerApi.show().getTime(),
				duration: flowplayerApi.getPlaylist().length > 0 ? flowplayerApi.getPlaylist()[0].duration : 0,
				seek: function(time){
					flowplayerApi.seek(time);
				},
				playbackRate:1,
				paused:!(flowplayerApi.isPlaying()),
				volume:flowplayerApi.getVolume()/100,
				setVolume:function(v){
					flowplayerApi.setVolume(parseFloat(v) * 100);
				}
				
			};
			return playerObject;
			
			//return $(this.dom).find("#"+this.videoCtrlId)[0];
		}
		
		this.setTimerFunction = function(fun){
			this.storage.timerFunction = fun;
		}
		
		this._initPlayerTimeout = function(){
			var mthis = this;
			if($(this.dom).find("#"+this.videoCtrlId).length > 0){
				this._showPlayStatus();
				window.setTimeout(function(e){
					mthis._initPlayerTimeout();
				}, 1000);	
				if(mthis.storage.timerFunction){
					try{
						mthis.storage.timerFunction(mthis.getPlayer().currentTime, mthis.getPlayer().duration);
					}catch(e){
						console.log(e);
					}
				}
			}
		}
		
		this._hideCtrltimer = {
			lastMoveTime : new Date().getTime(),
			isHideCtrl: function(){
				var mthis = this;
				if(new Date().getTime() - mthis.lastMoveTime > 5*1000){
					return true;
				}else
					return false;
			},
			timeouter : function(){
				var mthis = this;
				
				if($("#"+mmthis.videoCtrlId).length > 0)
					window.setTimeout(function(){
						mthis.timeouter();
					},1000);
				
				if(!mthis.isHideCtrl())
					return;
				$(mmthis.dom).find("*[playerClass='playerLinerContainer']").fadeOut(300);
				$(mmthis.dom).find("*[playerClass='controllerDiv']").fadeOut(300);
				$(mmthis.dom).find("*[playerClass='contentMenuShow']").fadeOut(300);
				mmthis._hideTips();
			}
		};
		
		this._getMouseX = function(x){
			return x - $(this.dom).offset().left;
		}
		
		this._build = function(){
			var mthis = this;
			var modelHtml = _VIDEOPLAYERHTML_STATIC.getModelDom();
			modelHtml = modelHtml.replace(/\${playerId}/g, this.videoCtrlId);
			modelHtml = modelHtml.replace(/\${videoUrl}/g, this.src);
			modelHtml = modelHtml.replace(/\${menuHtml}/g, _VIDEOPLAYERHTML_STATIC.getMenuHtml(mthis.storage.menu));
			
			modelHtml = this._transI18N(modelHtml);
			
			var playerDom = $(modelHtml);
			this._withskin(playerDom);
			
			
			$(playerDom).on("mouseover","*[tips]",function(){
				var attr = $(this).attr("playerClass");
				var curOffset = $(this).offset();
				var pDomOffset = $(mthis.dom).offset();
				if(attr == 'voiceCtrlIcon')
					mthis._showTips($(this).attr("tips"), curOffset.top - pDomOffset.top , curOffset.left - pDomOffset.left + 30);
				else if(attr == 'fullScreenIcon'){
					mthis._showTips($(this).attr("tips"), curOffset.top - pDomOffset.top - 55 , curOffset.left - pDomOffset.left - 20);
				}
				else
					mthis._showTips($(this).attr("tips"), curOffset.top - pDomOffset.top - 55, curOffset.left - pDomOffset.left);
			});
			$(playerDom).on("mouseout","*[tips]",function(){
				mthis._hideTips();
			});
			$(this.dom).css("position","relative");
			$(this.dom).css("background","black");
			$(this.dom).empty().append(playerDom);
			$("#"+this.videoCtrlId).height($(this.dom).height());
		}
		
		this._formaterTime = function(time){
			if(!time || time == 0)
				return "00:00";
			//获取小时数
			time = Math.ceil(time);
			var hour = Math.floor(time / 60 / 60);
			var minute =  Math.floor((time - 60 *60 *hour) / 60 );
			var second = time - 60 *60 *hour - 60 * minute;
			var hourSrr = hour>=10? ""+hour : "0"+hour;
			var minuteStr = minute>=10? ""+minute : "0"+minute;
			var secondStr = second >=10 ? ""+second : "0" +second;
			if(hour != 0)
				return hourSrr+":"+minuteStr + ":"+secondStr;
			else
				return minuteStr + ":"+secondStr;
		}
		
		this._withskin = function(playerDom){
			var mthis = this;
			var playerClassStyle = _VIDEOPLAYERHTML_SKIN.getSkin(this.dom);
			$(playerDom).find("*[adapaterScreen]").each(function(ind,elem){
				$(this).css("height", $(mthis.dom).height() + "px");
				$(this).css("width", $(mthis.dom).width() + "px");
			});
			
			for(var key in playerClassStyle){
				$(playerDom).find("*[playerClass='"+key+"']").css(playerClassStyle[key]);
			}
			if(this.getPlayer())
				this.voice();
			return playerDom;
		}
		
		this._transI18N = function(modelHtml){
			
			var trans = _VIDEOPLAYERHTML_STATIC.getTransText();
			for(var key in trans){
				var replaceReg = "/\\${trans_text_"+key+"}/g";
				var evalText = "modelHtml=modelHtml.replace("+replaceReg+",'"+trans[key]+"')";
				eval(evalText);
			}
			return modelHtml;
			
		}
		
		this._showTips = function(text, top, left){
			var tooptipDom = $(this.dom).find("*[playerClass='tipsShowDom']").first();
			$(tooptipDom).text(text);
			$(tooptipDom).css("top", top+"px");
			$(tooptipDom).css("left", left+"px");
			$(tooptipDom).fadeIn(200);
		}
		
		this._hideTips = function(){
			$(this.dom).find("*[playerClass='tipsShowDom']").first().fadeOut(10);
			$(mmthis.dom).find("*[playerClass='contentMenuShow']").fadeOut(300);
		}
				
		this._showPlayStatus = function(){
			var mthis = this;
			var totalTime = mthis.storage.totalVideoTime;
			var curTime = this.getPlayer().currentTime;
			if(!curTime)
				curTime = 0;
			var ctrlConst = _VIDEOPLAYERHTML_SKIN.getSkin(mthis.dom).ctrlConstVar;
			var totalWidth = $(mthis.dom).find("*[playerClass='totalTimeLineBar']").width();
			var trate = Math.ceil(curTime) /totalTime;
			if(trate > 1) trate = 1;
			var curWidth = (totalWidth) * trate;
			$(mthis.dom).find("*[playerClass='spendTimeLineBar']").css("width",curWidth+"px");
			$(mthis.dom).find("*[playerClass='timeLineDot']").css("left",curWidth + 60 +"px");
			var showTime = this._formaterTime(curTime);
			if(showTime.indexOf("NaN") != -1)
				showTime = "00:00";
			$(mthis.dom).find("*[playerClass='beginTimeFont']").text(showTime);
			
			if(this.getPlayer().paused ){
				$(mthis.dom).find("*[playerClass='playVideoIcon']").show();
				$(mthis.dom).find("*[playerClass='pauseVideoIcon']").hide();
			}else{
				$(mthis.dom).find("*[playerClass='pauseVideoIcon']").show();
				$(mthis.dom).find("*[playerClass='playVideoIcon']").hide();
			}
			
			var playRate = this.getPlayer().playbackRate;
			if(playRate == 1){
				$(mthis.dom).find("*[playerClass='playRateShow']").hide();
			}else{
				$(mthis.dom).find("*[playerClass='playRateShow']").text(playRate + " " + "X");
				$(mthis.dom).find("*[playerClass='playRateShow']").show();
			}
			
			
		}
				
		this._adpaterHLS = function(){
			var src = this.src;
			//适配M3U8
			if(src && 
				($.trim(src).toLowerCase().indexOf(".m3u8") == $.trim(src).length -5 
					|| $.trim(src).toLowerCase().indexOf(".m3u8?") != -1)){
				if(Hls.isSupported()) {
					var video = this.getPlayer();
					var hls = new Hls();
					hls.loadSource(src);
					hls.attachMedia(video);
					hls.on(Hls.Events.MANIFEST_PARSED,function() {
					  //video.play();
				  });
				}
			}
		}
				
		this._bindListener = function(){
			var mthis = this;
			$(this.dom).find('*[playlinedot]').each(function(){
				$(this).dragging({
					move : 'x',
					randomPosition : false,
					mouseMoveAction:function(x){
						var ctrlConst = _VIDEOPLAYERHTML_SKIN.getSkin(mthis.dom).ctrlConstVar;
						if(x > ctrlConst.playLineMax || x <= ctrlConst.playLineMin)
							return false;
						$(mthis.dom).find("*[playerClass='spendTimeLineBar']").css("width",(x-80)+"px");
						//console.log(x / (ctrlConst.playLineMax - ctrlConst.playLineMin));
						var time = Math.ceil(((x-80) / (ctrlConst.playLineMax - ctrlConst.playLineMin)) * (mthis.storage.totalVideoTime|0));
						mthis._showTips(mthis._formaterTime(time), $(mthis.dom).height()-120, x );
						mthis.seekTo(time,false);
					}
				});
			});
			$(this.dom).find('*[playvoicedot]').each(function(){
				$(this).dragging({
					move : 'y',
					randomPosition : false,
					mouseMoveAction:function(x, y){
						var ctrlConst = _VIDEOPLAYERHTML_SKIN.getSkin(mthis.dom).ctrlConstVar;
						if(y<ctrlConst.voiceCtrlMin || y>ctrlConst.voiceCtrlMax)
							return false;
						var voiceVolume = 1- ((y - ctrlConst.voiceCtrlMin) / (ctrlConst.voiceCtrlMax - ctrlConst.voiceCtrlMin ));
						mthis.voice(voiceVolume);
					}
				});
			});
			$(this.dom).on("mouseover","*[moveChange]",function(){
				$(this).css("color","RGB(255,136,0)");
				var attr = $(this).attr("playerClass");
				if(attr == 'voiceCtrlIcon'){
					$(mthis.dom).find("*[playerClass='voiceAdjustmentDiv']").fadeIn(300);
					mthis.voice();
				}
			});
			$(this.dom).on("mouseout","*[moveChange]",function(e){
				$(this).css("color","RGB(255,255,255)");
				var attr = $(this).attr("playerClass");
				if(attr == 'voiceCtrlIcon'){
					var x = mthis._getMouseX(e.pageX)
					if(x > $(this).width() - 2 || x < 2)
						$(mthis.dom).find("*[playerClass='voiceAdjustmentDiv']").hide();
				}
			});
			
			
			$(this.dom).find("*[playerClass='fullScreenIcon']").unbind("click").click(function(e){
				if(!isfullScreen)
					mthis.fullScreen();
				else{
					_exitFullS();
				}
			});
			
			$(this.dom).find("*[playerClass='playerContentWindow']").unbind("dblclick").dblclick(function(){
				$(mthis.dom).find("*[playerClass='fullScreenIcon']").trigger("click");
			});
			
			$(this.dom).find("*[playerClass='voiceAdjustmentDiv']").mouseout(function(e){
				var x = e.pageX;
				var y = e.pageY;
				if(x > $(this).offset().left + $(this).width() - 2 || x < $(this).offset().left +2 || y < $(this).offset().top)
					$(this).hide();
			});
			
			
			$(this.dom).mouseleave(function(e){
				//console.log(e.pageX+":"+e.pageY);
				if(e.pageX < $(mthis.dom).offset().left || e.pageX > $(mthis.dom).offset().left + $(mthis.dom).width() ||
					e.pageY < $(mthis.dom).offset().top || e.pageY > $(mthis.dom).offset().top + $(mthis.dom).height()){
						
						$(this).find("*[playerClass='playerLinerContainer']").fadeOut(300);
						$(this).find("*[playerClass='controllerDiv']").fadeOut(300);
						mthis._hideTips();
						
				}
				
			})
					
			$(this.dom).mousemove(function(e){
				var curMove = e.pageX+":"+e.pageY;
				if(curMove == mthis.storage.lastMove)
					return;
				else
					mthis.storage.lastMove = curMove;
				mthis._hideCtrltimer.lastMoveTime = new Date().getTime();
				if($(mthis.dom).find("*[playerClass='playerLinerContainer']").is(":hidden")){
					$(mthis.dom).find("*[playerClass='playerLinerContainer']").fadeIn(200);
					$(mthis.dom).find("*[playerClass='controllerDiv']").fadeIn(200);
					mthis._showPlayStatus();
					mthis._hideTips();
				}
			});
			
			$(this.dom).find("*[playerClass='totalTimeLineBar'],*[playerClass='spendTimeLineBar']").mousemove(function(e){
				var x = mthis._getMouseX(e.pageX);
				var ctrlConst = _VIDEOPLAYERHTML_SKIN.getSkin(mthis.dom).ctrlConstVar;
				var time = Math.ceil(((x-80) / (ctrlConst.playLineMax - ctrlConst.playLineMin)) * (mthis.storage.totalVideoTime|0));
				if(time > mthis.storage.totalVideoTime)
					time = mthis.storage.totalVideoTime;
				if(time <0)
					time = 0;
				mthis._showTips(mthis._formaterTime(time), $(mthis.dom).height()-120, x);
				//$(mthis.dom).find("*[playerClass='playerLinerContainer']").fadeIn(200);
			});
			
			$(this.dom).find("*[playerClass='totalTimeLineBar'],*[playerClass='spendTimeLineBar']").click(function(e){
				var x = mthis._getMouseX(e.pageX);
				var ctrlConst = _VIDEOPLAYERHTML_SKIN.getSkin(mthis.dom).ctrlConstVar;
				var time = Math.ceil(((x-80) / (ctrlConst.playLineMax - ctrlConst.playLineMin)) * (mthis.storage.totalVideoTime|0));
				if(time > mthis.storage.totalVideoTime)
					time = mthis.storage.totalVideoTime;
				if(time <0)
					time = 0;
				mthis.seekTo(time,false);
				mthis._showPlayStatus();
			});
			
			$(this.dom).find("*[playerClass='totalTimeLineBar'],*[playerClass='spendTimeLineBar']").mouseout(function(e){
				mthis._hideTips();
			});
			
			$(this.dom).find("*[playerClass='playVideoIcon']").unbind("click").click(function(e){
				mthis.play();
			});
			
			$(this.dom).find("*[playerClass='pauseVideoIcon']").unbind("click").click(function(e){
				mthis.pause();
			});
			
			$(this.dom).find("*[playerClass='reduceSpeedIcon']").unbind("click").click(function(e){
				mthis._showTips("使用falsh播放器时不允许修改速度", $(mthis.dom).height()-120, mthis._getMouseX(e.pageX));
				return;
				var playRate = mthis.getPlayer().playbackRate;
				var playerCtrl = mthis.getPlayer();
				if(playRate == 1){
					mthis._showTips("当前播放速率1，播放速率不能低于1", $(mthis.dom).height()-120, mthis._getMouseX(e.pageX));
				}
				else if(playRate == 2)
					playerCtrl.playbackRate = 1;
				else if(playRate == 4)
					playerCtrl.playbackRate = 2;
				else if(playRate == 8)
					playerCtrl.playbackRate = 4;
				if(playRate == 16){
					playerCtrl.playbackRate = 8;
				}
				mthis._showPlayStatus();
			});
			
			$(this.dom).find("*[playerClass='raiseSpeedIcon']").unbind("click").click(function(e){
				mthis._showTips("使用falsh播放器时不允许修改速度", $(mthis.dom).height()-120, mthis._getMouseX(e.pageX));
				return;
				var playRate = mthis.getPlayer().playbackRate;
				var playerCtrl = mthis.getPlayer();
				if(playRate == 1)
					playerCtrl.playbackRate = 2;
				else if(playRate == 2)
					playerCtrl.playbackRate = 4;
				else if(playRate == 4)
					playerCtrl.playbackRate = 8;
				else if(playRate == 8)
					playerCtrl.playbackRate = 16;
				if(playRate == 16){
					mthis._showTips("当前播放速率16，播放速率不能高于16", $(mthis.dom).height()-120, mthis._getMouseX(e.pageX));
				}
				mthis._showPlayStatus();
			});
			
			$(this.dom).find("*[playerClass='playerContentWindow']").unbind("click").click(function(e){
				$(mthis.dom).find("*[playerClass='contentMenuShow']").hide();
			});
			
			$(this.dom).find("*[playerClass='playerContentWindow']").unbind("contextmenu").bind("contextmenu", function(e){
				if(mthis.storage.menu && mthis.storage.menu.length>0){
					$(mthis.dom).find("*[playerClass='contentMenuShow']").css("top",e.pageY - $(this).offset().top + "px")
					$(mthis.dom).find("*[playerClass='contentMenuShow']").css("left",e.pageX - $(this).offset().left + "px")
					$(mthis.dom).find("*[playerClass='contentMenuShow']").fadeIn(100);
				}
				return false;
			});
			
			$(this.dom).find("*[playerClass='playerContentWindow']").unbind("click").click(function(e){
				$(mthis.dom).find("*[playerClass='contentMenuShow']").hide();
				var t  = mthis.getPlayer();
				if(t && t.paused)
					mthis.play();
			});
			
			$(this.dom).find("*[playerClass='menuItem']").unbind("mouseout").mouseout(function(){
				$(this).css("background","none");
			});
			
			$(this.dom).find("*[playerClass='menuItem']").unbind("mouseover").mouseover(function(){
				$(this).css("background","RGBA(56,57,58,0.8)");
			});
			
			$(this.dom).find("*[playerClass='menuItem']").unbind("click").click(function(e){
				var ind = parseInt($(this).attr("menuindex"),10);
				var menuItem = mthis.storage.menu[ind];
				if(menuItem.handler){
					window.setTimeout(function(){menuItem.handler()});
				}
				mthis._hideTips();
			});
			
			/*
			$(this.dom).find("*[playerClass='playerLinerContainer'],*[playerClass='controllerDiv']").mouseover(function(){
				$(mthis.dom).find("*[playerClass='playerLinerContainer']").show();
				$(mthis.dom).find("*[playerClass='controllerDiv']").show();
			})
			*/
			
		}
		
		var _exitFullS =  function() {
			 // 判断各种浏览器，找到正确的方法
			 var exitMethod = document.exitFullscreen || //W3C
			 document.mozCancelFullScreen || //Chrome等
			 document.webkitExitFullscreen || //FireFox
			 document.webkitExitFullscreen; //IE11
			 if (exitMethod) {
			  exitMethod.call(document);
			 }
			 else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
			  var wscript = new ActiveXObject("WScript.Shell");
			  if (wscript !== null) {
			   wscript.SendKeys("{F11}");
			  }
			 }
		}
		
	}
	
	var _VIDEOPLAYERHTML_SKIN = {
		getSkin : function(dom){
			return this.DEFAULT(dom);
		},
		DEFAULT : function(dom){
			
			var playLineMax = 80 + $(dom).find("*[playerClass='totalTimeLineBar']:first").width();
			
			return {
				playerOuter: {"font-size":"1em"},
				playerContainer : {"position": "relative","font-size":"1em"},
				playerWatermark : {"position": "absolute","color": "red","left": "5px","top": "16px"},
				playerVideo: {"width":"100%", "height":"100%"},
				playerLinerContainer: {"background":"RGBA(0,0,0,0.8)","position": "absolute","width":"100%","height":"30px","margin-top":"-85px","text-align":"center","line-height":"30px"},
				beginTimeFont: {"position":"absolute","top":"0", "left": "20px", "color":"white"},
				totalTimeFont: {"position": "absolute", "top":"0", "right": "20px", "color": "white"},
				totalTimeLineBar : {"height":"4px", "background": "white", "position": "absolute", "left": "80px", "right": "80px", "top": "15px", "border-radius": "2px","cursor": "pointer"},
				spendTimeLineBar : {"height":"4px", "background": "RGB(255,136,0)", "position": "absolute", "left": "80px", "right": "80px" , "top": "15px", "width":"0px", "border-radius": "2px","cursor": "pointer"},
				timeLineDot: {"color":"white","font-size":"20px","position":"absolute", "left":"70px", "top":"3px"},
				controllerDiv : {"background":"RGBA(0,0,0,0.8)", "position": "absolute", "width": "100%", "height": "55px", "margin-top": "-55px", "text-align":"center", "line-height":"50px"},
				leftCtrlDiv: {"position": "absolute","top": "0", "left": "10px"},
				voiceCtrlIcon : {"color":"white", "font-size":"25px"},
				reduceSpeedIcon : {"color":"white", "font-size":"30px","cursor": "pointer"},
				playVideoIcon : {"color":"white","font-size":"30px","cursor": "pointer","margin-left":"30px"},
				pauseVideoIcon : {"color":"white","font-size":"30px","display":"none","cursor": "pointer","margin-left":"30px"},
				raiseSpeedIcon: {"color":"white","font-size":"30px","cursor": "pointer","margin-left":"30px"},
				rightCtrlDiv: {"position":"absolute","top":"0", "right":"10px"},
				fullScreenIcon: {"cursor": "pointer","color":"white", "font-size":"25px"},
				voiceAdjustmentDiv:{"height":"120px","width": "40px", "position": "absolute", "top":"-110px", "background": "RGBA(0,0,0,0.2)","left": "-6px","display":"none"},
				voiceTotalLine : {"width": "6px", "background": "RGBA(255,255,255,0.7)", "height": "100px", "margin-left": "15px", "margin-top": "10px","border-radius": "3px"},
				voiceCurLine : {"width": "6px", "background": "RGB(255,136,0)","margin-left":"15px","margin-top": "10px","position": "absolute","top": "50px","bottom": "10px","border-radius": "3px"},
				playerVoiceIcon: {"color": "white","font-size": "15px","position": "absolute","top": "3px","left": "11px","cursor": "move"},
				tipsShowDom : {"display":"none", "padding":"5px", "background":"RGBA(0,0,0,0.5)","position": "absolute","color":"RGB(255,136,0)","z-index":'999',"font-size":"14px","font-weight":"bold"},
				playRateShow: {"display":"none", "position": "absolute","font-size":"18px","color":"RGB(255,136,0)","top":"10px","right":"10px","z-index": "999"},
				playerContentWindow: {"position": "absolute",/*"cursor":"default",*/"top": "0","bottom": "0","left":"0","right":"0","background":"none"},
				contentMenuShow:{"position": "absolute","border":"1px solid RGB(59,58,57)","display":"none","width":"120px","background":"RGBA(0,0,0,0.8)","color": "RGB(238,238,238)","font-size": "12px","border-radius": "8px","z-index": "9999","min-width": "160px","cursor": "default"},
				ctrlConstVar:{
					voiceCtrlMin: -10,
					voiceCtrlMax: 80,
					playLineMin: 80,
					playLineMax: playLineMax - 20
				}
			}
		}
	}

	var _VIDEOPLAYERHTML_STATIC = {
		
		getTransText: function(){
			return {
				play : '播放',
				jiansu : '减速',
				jiasu : '加速',
				fullScreen: '全屏',
				silentVoice:"",
				pause : '暂停'
			}
		},
		
		getMenuHtml:function(menu){
			var menuHtml = "";
			if(!menu)
				return menuHtml;
			for(var i=0; i<menu.length;i++ ){
				var menuItem = menu[i];
				var styleText = "height:35px;line-height:35px;border-radius:8px;";
				if(i!=0){
					styleText += "border-top: 1px RGB(59,58,57) solid;";
				}
				var menuItemHtml = '<div style="'+styleText+'" playerClass="menuItem" menuIndex="' + i +'">&nbsp;&nbsp;'+menuItem.text+'</div>';
				menuHtml += menuItemHtml;
			}
			return menuHtml;
		},
		
		getModelDom : function(){
			return (
			'<div>'+
				'<div playerClass="tipsShowDom" ></div>' +
				'<div playerClass="playRateShow" ></div>' +
				'<div playerClass="contentMenuShow" >${menuHtml}</div>' +
				'<div playerClass="playerOuter">'+
					'<div playerClass="playerContainer" adapaterScreen>'+
						'<div playerClass="playerWatermark">  </div>'+
						'<div id="${playerId}" preload="none" playerClass="playerVideo">'+
						'</div>'+
						'<div playerClass="playerContentWindow"></div>'+
						'<div playerClass="playerLinerContainer">'+
							'<div playerClass="beginTimeFont">'+
								'00:00'+
							'</div>'+
							'<div>'+
								'<div playerClass="totalTimeLineBar"></div>'+
								'<div playerClass="spendTimeLineBar"></div>'+
								'<i playerClass="timeLineDot" class="iconfont icon-dot" playlinedot></i>'+
							'</div>'+
							
							'<div playerClass="totalTimeFont">'+
								'00:00'+
							'</div>'+
						'</div>'+
						'<div playerClass="controllerDiv">'+
						
							'<div playerClass="leftCtrlDiv">'+
								'<i class="iconfont icon-yinliang" playerClass="voiceCtrlIcon" tips="${trans_text_silentVoice}" moveChange></i>'+
								'<div playerClass="voiceAdjustmentDiv">' +
									'<div playerClass="voiceTotalLine"></div>' +
									'<div playerClass="voiceCurLine" ></div>'+
									'<i playerclass="playerVoiceIcon" playvoicedot class="iconfont icon-dot"></i>'+
								'</div>'+
								
							'</div>'+
							
							'<div>'+
								'<i class="iconfont icon-year_prev" playerClass="reduceSpeedIcon" tips="${trans_text_jiansu}" moveChange></i>'+
								'<i class="iconfont icon-play" playerClass="playVideoIcon" tips="${trans_text_play}" moveChange></i>'+
								'<i class="iconfont icon-top_stop-copy" playerClass="pauseVideoIcon" tips="${trans_text_pause}" moveChange></i>' +
								'<i class="iconfont icon-kuaijin" playerClass="raiseSpeedIcon" tips="${trans_text_jiasu}" moveChange></i>'+
							'</div>'+
							
							'<div playerClass="rightCtrlDiv">'+
								'<i class="iconfont icon-quanping" playerClass="fullScreenIcon" tips="${trans_text_fullScreen}" moveChange></i>'+
							'</div>'+
							
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>' );
		}
	}
	
	/***暴露videoPlayer对象***/
	win.SwfVideoPlayer = videoPlayer;
	
	/***控制全屏及退出全屏事件***/	
	document.addEventListener('webkitfullscreenchange', function(e){ 
		if(isfullScreen){
			if(!nowFullScreenObject)
				nowFullScreenObject = window._video_player;
			if(nowFullScreenObject){
				nowFullScreenObject.exitFullScreen();
				isfullScreen = !isfullScreen;
			}
		}
	});
	
	document.addEventListener('mozfullscreenchange', function(e){ 
		if(isfullScreen){
			if(!nowFullScreenObject)
				nowFullScreenObject = window._video_player;
			if(nowFullScreenObject){
				nowFullScreenObject.exitFullScreen();
				isfullScreen = !isfullScreen;
			}
		}
	});
		
	
	
	
	
	/***JS 扩展插件 （用于拖动！）***/
	/*
	$.fn.extend({
			//---元素拖动插件
		dragging:function(data){   
			var $this = $(this);
			var xPage;
			var yPage;
			var X;//
			var Y;//
			var xRand = 0;
			var yRand = 0;
			var father = $this.parent();
			var defaults = {
				move : 'both',
				randomPosition : true ,
				hander:1
			}
			var opt = $.extend({},defaults,data);
			var movePosition = opt.move;
			var random = opt.randomPosition;
			
			var hander = opt.hander;
			
			if(hander == 1){
				hander = $this; 
			}else{
				hander = $this.find(opt.hander);
			}
			
			$this.css({"position":"absolute"});
			hander.css({"cursor":"move"});

			var faWidth = father.width();
			var faHeight = father.height();
			var thisWidth = $this.width()+parseInt($this.css('padding-left'))+parseInt($this.css('padding-right'));
			var thisHeight = $this.height()+parseInt($this.css('padding-top'))+parseInt($this.css('padding-bottom'));
			
			var mDown = false;//
			var positionX;
			var positionY;
			var moveX ;
			var moveY ;
			
			if(random){
				$thisRandom();
			}
			function $thisRandom(){ //随机函数
				$this.each(function(index){
					var randY = parseInt(Math.random()*(faHeight-thisHeight));
					var randX = parseInt(Math.random()*(faWidth-thisWidth));
					if(movePosition.toLowerCase() == 'x'){
						$(this).css({
							left:randX
						});
					}else if(movePosition.toLowerCase() == 'y'){
						$(this).css({
							top:randY
						});
					}else if(movePosition.toLowerCase() == 'both'){
						$(this).css({
							top:randY,
							left:randX
						});
					}
					
				});	
			}
			
			hander.mousedown(function(e){
				father.children().css({"zIndex":"0"});
				$this.css({"zIndex":"1"});
				mDown = true;
				X = e.pageX;
				Y = e.pageY;
				positionX = $this.position().left;
				positionY = $this.position().top;
				return false;
			});
				
			$(document).mouseup(function(e){
				mDown = false;
			});
				
			$(document).mousemove(function(e){
				xPage = e.pageX;//--
				moveX = positionX+xPage-X;
				
				yPage = e.pageY;//--
				moveY = positionY+yPage-Y;
				
				function thisXMove(){ //x轴移动
					if(mDown == true){
						
						if(opt.mouseMoveAction){
							if(opt.mouseMoveAction(moveX) === false){
								return;
							}
						}
						$this.css({"left":moveX});
					}else{
						return;
					}
					if(moveX < 0){
						//$this.css({"left":"0"});
					}
					if(moveX > (faWidth-thisWidth)){
						//$this.css({"left":faWidth-thisWidth});
					}
					return moveX;
				}
				
				function thisYMove(){ //y轴移动
					if(mDown == true){
						
						if(opt.mouseMoveAction){
							if(opt.mouseMoveAction(moveX,moveY) === false){
								return;
							}
						}
						
						$this.css({"top":moveY});
					}else{
						return;
					}
					if(moveY < 0){
						//$this.css({"top":"0"});
					}
					if(moveY > (faHeight-thisHeight)){
						//$this.css({"top":faHeight-thisHeight});
					}
					return moveY;
				}

				function thisAllMove(){ //全部移动
					if(mDown == true){
						$this.css({"left":moveX,"top":moveY});
					}else{
						return;
					}
					if(moveX < 0){
						$this.css({"left":"0"});
					}
					if(moveX > (faWidth-thisWidth)){
						$this.css({"left":faWidth-thisWidth});
					}

					if(moveY < 0){
						$this.css({"top":"0"});
					}
					if(moveY > (faHeight-thisHeight)){
						$this.css({"top":faHeight-thisHeight});
					}
				}
				if(movePosition.toLowerCase() == "x"){
					thisXMove();
				}else if(movePosition.toLowerCase() == "y"){
					thisYMove();
				}else if(movePosition.toLowerCase() == 'both'){
					thisAllMove();
				}
				
			});
		}
	});
	*/
	
})(window,jQuery);