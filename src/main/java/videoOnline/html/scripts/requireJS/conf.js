var mainContent = "/static/";

require.config({
    baseUrl: mainContent,
    urlArgs:'random=random',
    paths: {
        'jquery': 'libs/jquery/jquery.min',
        'jquery-cookie': 'libs/jquery/jquery.cookie',
        'vue': 'libs/vue/vue.min',
        'datetimePicker': 'libs/bootstrap-plugins/datepicker/bootstrap-datetimepicker.zh-CN',
        'bootstrap-selected': ['libs/bootstrap-plugins/selected/defaults-zh_CN'],
        'bootstrap-treeview': ['libs/bootstrap-plugins/treeview/bootstrap-treeview'],
        'bootstrap-validate': ['libs/bootstrap-plugins/validate/bootstrapValidator'],
        'bootstrap-fileinput': ['libs/bootstrap-plugins/fileinput/js/locales/zh'],
        'vue-datepicker': 'libs/vue-component/datetimePicker',
        'vue-fileUpload': 'libs/vue-component/fileUpload',
        'vue-staffSelector': 'libs/vue-component/staffSelector',
        'vue-appSelector': 'libs/vue-component/appSelector',
        'vue-multSelect': 'libs/vue-component/multSelect',
        'vue-loading': 'libs/vue-component/loading',
        'vue-cityTree': 'libs/vue-component/cityTree',
        'vue-modalDialog': 'libs/vue-component/modalDialog',
        'vue-modalSubmitDialog': 'libs/vue-component/modalSubmitDialog',
		'vue-advancedPagination': 'libs/vue-component/advancedPagination',
		'vue-dictCheckbox': 'libs/vue-component/dictCheckbox',
        'vue-pagination': 'libs/vue-component/pagination',
        'vue-videoDialog': 'libs/vue-component/videoDialog',
        'vue-authority': 'libs/vue-component/authority',
        'vue-queryCondation': 'libs/vue-component/queryCondation',
        'vue-dictSelected': 'libs/vue-component/dictSelected',
        'vue-codeSelected': 'libs/vue-component/codeSelected',
        'vue-scrollTable':'libs/vue-component/scrollTable',
        'vue-alertTips' :  'libs/vue-component/alertTips',
        'vue-eventBus' :  'libs/vue-component/eventBus',
        'vue-image' :  'libs/vue-component/image',
        'vue-picsGallery': 'libs/vue-component/picsGallery',
        'i18n': 'libs/i18n/vue-i18n',
        'bootstrap': 'libs/bootstrap/js/bootstrap.min',
        'echarts': 'libs/echarts/echarts.common.min',
        'videoplayer': 'libs/videoPlayer/videoplayer',
        'videojs': 'libs/videoPlayer/videojs/video',
        'videojs-hls': 'libs/videoPlayer/videojs/videojs-contrib-hls',
        'jqueryui': 'libs/jquery/jquery-ui.min',
        'commonUtil' : 'libs/common/commonUtil',
        'clipboardBase': 'libs/utils/clipboard/clipboard.min',
        'clipboard' : 'libs/utils/clipboard/clipboardHelper',
        'vue-colorPicker': 'libs/vue-component/colorPickerDialog',
        'vue-timeline': 'libs/vue-component/timeline',
        'colorPicker' : 'libs/colorPicker/js/colorpicker',
        'vue-simpleFileUpliad': 'libs/vue-component/simpleFileUpload',
        'imgZoomView' : 'libs/utils/imgZoomView',
        'vue-iframeVideoDialog': 'libs/vue-component/iframeVideoDialog'
    },

    shim: {
        'i18n': {
            deps: ['vue', 'jquery']
        },
        'vue-datepicker': {
            deps: ['vue', 'jquery', 'datetimePicker'],
        },
        'vue-fileUpload': {
            deps: ['vue', 'jquery', 'bootstrap-fileinput'],
        },
        'datetimePicker': {
            deps: ['jquery', 'libs/bootstrap-plugins/datepicker/bootstrap-datetimepicker.min', 'libs/bootstrap-plugins/datepicker/bootstrap-datetimepicker.css']
        },
		'vue-advancedPagination':{
            deps: ['vue','vue-pagination']
        },
        'vue-videoDialog':{
           deps: ['videoplayer']
		},
        'vue-staffSelector': {
            deps: ['vue', 'bootstrap-selected']
        },
        'vue-multSelect': {
            deps: ['vue', 'bootstrap-selected']
        },
        'vue-picsGallery': {
            deps: ['vue','jquery']
        },
        'vue-appSelector': {
            deps: ['vue', 'bootstrap-selected']
        },
        'bootstrap-selected': {
            deps: ['jquery', 'libs/bootstrap-plugins/selected/bootstrap-select', 'libs/bootstrap-plugins/selected/bootstrap-select-css']
        },
        'bootstrap-treeview': {
            deps: ['jquery']
        },
        'bootstrap-validate': {
            deps: ['jquery']
        },
        'bootstrap-fileinput': {
            deps: ['jquery', 'libs/bootstrap-plugins/fileinput/js/fileinput', 'libs/bootstrap-plugins/fileinput/js/fileinput.css']
        },
        'vue-loading': {
            deps: ['vue']
        },
        'vue-alertTips': {
            deps: ['vue']
        },
        'vue-eventBus': {
            deps: ['vue']
        },
        'vue-cityTree': {
            deps: ['vue']
        },
        'vue-authority': {
            deps: ['vue', 'jquery']
        },
        'vue-image':{
           deps: ['vue', 'jquery']
        },
        'vue-modalDialog': {
            deps: ['vue', 'libs/vue-component/modalDialog-css']
        },
        'vue-modalSubmitDialog': {
            deps: ['vue']
        },
        'vue-queryCondation': {
            deps: ["vue", "vue-datepicker", 'vue-dictSelected', 'vue-codeSelected', 'vue-staffSelector', 'vue-multSelect', 'vue-dictCheckbox']
        },
        'vue-dictSelected':{
            deps: ["vue","jquery", "vue-eventBus"]
		},
        'vue-codeSelected':{
            deps: ["vue","jquery"]
		},
        'vue-dictCheckbox':{
            deps: ["vue","jquery", 'libs/vue-component/dictCheckbox-css']
		},
        'vue-scrollTable':{
            deps: ["vue"]
        },
        'vue-pagination': {
            deps: ['vue']
        },
        'bootstrap': {
            deps: ['libs/bootstrap/js/bootstrap.css', 'jquery']
        },
        'videoplayer': {
            deps: ['libs/videoPlayer/videoplayer.css', 'videojs-hls']
        },
        'videojs': {
            deps: ['jqueryui']
        },
        'videojs-hls': {
            deps: ['videojs', 'libs/videoPlayer/videojs/hls-requestjs-adapter']
        },
        'jqueryui': {
            deps: ['jquery']
        },
        'commonUtil': {
            deps : ['jquery']
        },
        'clipboardBase':{
            deps : ['jquery']
        },
        'clipboard': {
            deps : ['clipboardBase','commonUtil']
        },
        'colorPicker' :{
            deps: ['jquery','libs/colorPicker/css/colorpicker.css']
        },
        'vue-colorPicker':{
            deps: ['vue','jquery','colorPicker','vue-modalDialog']
        },
        'vue-timeline':{
            deps : ['vue']
        },
        'vue-simpleFileUpliad':{
            deps: ['vue', 'jquery']
        },
        'imgZoomView': {
            deps: ['jquery']
        },
        'vue-iframeVideoDialog':{
            deps: ['vue','jquery']
        }
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