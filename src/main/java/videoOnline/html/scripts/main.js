require([ 'jquery','scripts/jquery-ui.min','vue','videoDialog','videojs'], function (A,v,Vue,vd,videojs){

    window.videojs = videojs;

    var $this = new Vue({
        el: '#vueBody',
        methods:{
            play:function(){
                $this.$refs.videoDialog.showVideo("http://localhost:8000/JayChou&Hannah'sWeddingMoment.mp4");
            }
        }
    });

    $this.play();

});
