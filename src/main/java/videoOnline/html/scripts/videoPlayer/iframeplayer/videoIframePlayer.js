requirejs(['jquery', 'vue', 'commonUtil', 'vue-videoDialog'], function ($, Vue, CommonUtil) {

    var $this = new Vue({
        el: '#vueBody',
        data: {
            playerUrl: '',
            videoPlayer: null
        },
        methods: {

            init: function(){
                if(this.playerUrl){
                    var player = new VideoPlayer($("#playerDom")[0], this.playerUrl);
                    player.init();
                    this.videoPlayer = player;
                    window.setTimeout(function () {
                        $this.videoPlayer.play();
                    }, 100);
                }
            }


        },
        mounted: function () {

            $("#playerDom").css("height", $(window).height()+"px");
            $("#playerDom").css("width", $(window).width()+"px");

            if(window.parent._iframePlayerUrl){
                this.playerUrl = window.parent._iframePlayerUrl;
            }else{
                var parUrl = CommonUtil.getParams("url");
                if(parUrl){
                    this.playerUrl = decodeURI(parUrl);
                }
            }

            this.init();

        }
    });

    window._vue_obj = $this;

});