/**
 *
 * 视频播放
 * 18/03/14
 * Rhea
 *
 * 方法：
 * 	showVideo ： 显示视频
 *
 * 使用示例：
 * 	html：
 * 		<videodialog ref="videodialog"></videodialog>
 *
 * 	call js method：
 * 		this.$refs.videodialog.showVideo(url);
 *
 */

define(['vue', 'jquery','scripts/videoPlayer/videoplayer'], function (Vue, $) {
    Vue.component('videodialog', {
        template: '<div v-show="isShowVideo" :id="domId" class="vueVideoPlaerDialogClass" style="position: absolute;z-index:99998;box-shadow: rgb(136, 136, 136) 10px 10px 8px, rgb(136, 136, 136) -10px -10px 8px; ">\
                        <div style="position: absolute; right:15px; top: 5px; font-size:30px; color: RGB(255,138,0); z-index:99999;cursor: pointer;" class="vueVideoPlaerDialogCloseIcoClass" @click="closeVideoWin"> X </div>\
                        <div :id="seconddomId" style="height:100%;width:100%;position: absolute;" class="vueVideoPlaerDialogSecondDomClass" ></div>\
                   </div>',
        props: [],
        data: function () {
            return {
                domId: "_videoPlayer_" + new Date().getTime() + "" + Math.round(Math.random() * 10000),
                seconddomId: "_videodialog_" + new Date().getTime() + "" + Math.round(Math.random() * 10000),
                isShowVideo:false,
                videoPlayer: undefined
            }
        },
        methods: {
            initVideo:function () {
                var $this = this;
                $("#" + this.domId).draggable();
                $("#" + this.domId).resizable({
                    resize: function (e, elem) {
                        var width = $("#" + $this.domId).width();
                        var height = $("#" + $this.domId).height();
                        $this.videoPlayer.setLayout(width, height);
                    }
                });
            },
            getPlayer : function(){
              return this.videoPlayer;
            },
            setLayout: function(width,height){
                var $this = this;
                $("#" + $this.domId).width(width);
                $("#" + $this.domId).height(height);
                $this.videoPlayer.setLayout(width, height);
            },
            setCenterLayout:function (width,height) {
                var $this = this;
                $("#" + $this.domId).width(width);
                $("#" + $this.domId).height(height);
                $this.videoPlayer.setLayout(width, height);

                $("#" + $this.domId).css({
                    left: ($(window).width() - $("#" + $this.seconddomId).width()) / 2,
                    top: ($(window).height() - $("#" + $this.seconddomId).height()) / 3,
                });
            },
            closeVideoWin: function () {
                if (this.videoPlayer) {
                    this.videoPlayer.destroy();
                    this.videoPlayer = null;
                }

                this.isShowVideo = false;
            },
            showVideo: function (url) {

                if (this.videoPlayer) {
                    this.videoPlayer.destroy();
                    this.videoPlayer = null;
                }

                if (!this.isShowVideo) {
                    $("#" + this.seconddomId).css({
                        width: "700px",
                        height: "394px"
                    });

                    $("#" + this.domId).css({
                        width: $("#" + this.seconddomId).width() + 'px',
                        height: $("#" + this.seconddomId).height() + 'px',
                        left: ($(window).width() - $("#" + this.seconddomId).width()) / 2,
                        top: ($(window).height() - $("#" + this.seconddomId).height()) / 3,
                    });
                }

                this.isShowVideo = true;

                var player = new VideoPlayer($("#" + this.seconddomId)[0], url);
                player.init();
               
                this.videoPlayer = player;
                window.setTimeout(function () {
                    player.play();
                }, 100);
            }
        },
        mounted: function () {
            this.initVideo();
        }
    });
});
