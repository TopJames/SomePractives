require.config({

    paths: {

        "jquery": "../html/scripts/jquery.min",
        "vue": "../html/scripts/vue/vue.min",
        "bootstrap": "../html/scripts/js/bootstrap.min",
        "videoDialog": "../html/scripts/videoDialog",
        'videojs': '../html/scripts/video'

    }

});

function addCss(url) {
    var head = document.getElementsByTagName('HEAD').item(0);
    var style = document.createElement('link');
    style.href = url;
    style.rel = 'stylesheet';
    style.type = 'text/css';
    head.appendChild(style);
}