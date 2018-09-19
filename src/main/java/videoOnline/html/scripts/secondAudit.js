requirejs(['jquery', 'vue', 'commonUtil','i18n', 'bootstrap', 'vue-colorPicker','vue-loading', 'vue-picsGallery','vue-simpleFileUpliad','vue-timeline','vue-advancedPagination','vue-videoDialog', 'vue-modalDialog','vue-image','vue-authority','vue-dictSelected'], function ($, Vue, CommonUtil,$i18n) {

    var $this = new Vue({

        el: '#vueBody',
        data: {
            isBeginAudit: false,
            allAppList: [],
            monitorApp: [],
            tmpPunishDataCache:{},
            simplyStatisList: [],
            reportDataList: [],
            checkedSecondPics : {},
            onlineCanDeliverUserList:[],
            warnningDialogObj:{
              title:"",
              content:""
            },
            warningTxt:{
                cTime: 0,
                text : ""
            },
            formData:{
              releaseOrderInput: '',
              pickUpValueInput:'',
              pickUpValueSelect: "0"
            },
            ordersList: [],
            curOrder:null,
            curOrderSupData:{},
            showPicsLists: [],
            punishReasonData:{},
            showPunishChildReasonList: [],
            hasLoadAllPics:false,
            isSlientVoice: false
        },
        methods:{
            setWarningTips:function(tips){
                this.warningTxt.text = tips;
                this.warningTxt.cTime = new Date().getTime();
            },
            listPunishHistory:function(){
              var url = "/cloud/app-live-admin-services/live/audit/secondAudit/info/listPunishHistory";
              var sendParams = {};
              sendParams.appId = this.curOrder.appId;
              sendParams.uid = this.curOrder.uid;
              $this.$refs.loading.show();
              $.post(url, sendParams, function(data){
                  $this.$refs.loading.hide();
                  if(data && data.success && data.result){
                      if(data.result.length == 0)
                          alert($i18n('live.audit.secondAudit.tips.punishhistory.not'));
                      else{
                          var timeLineList = [];
                          for(var i=0; i<data.result.length;i++){
                              var item = data.result[i];
                              var timelineData = {};
                              timelineData.date = new Date(parseFloat(item.punishTime));
                              timelineData.html = $this.getPunishHistoryItemHtml(item);
                              timeLineList.push(timelineData);
                          }
                          $this.$refs.punishHistoryTimeline.setList(timeLineList);
                          var dialogTitle = CommonUtil.fillPlaceholder(
                              $i18n('live.audit.secondAudit.dialog.title.punishhistroy'), sendParams.uid );
                          $this.$refs.punishHistoryDialogRef.setHead(dialogTitle);
                          $this.$refs.punishHistoryDialogRef.show();
                      }
                  }else{
                      var tips = $i18n('live.audit.secondAudit.tips.punishhistory.geterror');
                      if(data && data.description)
                          tips = data.description;
                      alert(tips);
                  }
              }).error(function(){
                  $this.$refs.loading.hide();
                  alert($i18n('live.audit.secondAudit.tips.punishhistory.geterror'));
              });
            },
            getPunishHistoryItemHtml:function(item){
                var brandHtml = $("<div><div class='timeline-content-form'><div class='content'></div></div></div>")
                brandHtml.find(".timeline-content-form:first").find("div:first").append("<div><span class='timeline-tt'>"
                    +$i18n('live.audit.secondAudit.dialog.punishhistroy.punishLevel')+"：</span><span class='timeline-ct'>"
                    +item.punishLevelText+"</span></div>");
                brandHtml.find(".timeline-content-form:first").find("div:first").append("<div style='margin-top: 6px'><span class='timeline-tt'>"
                    +$i18n('live.audit.secondAudit.dialog.punishhistroy.punishReason')+"：</span><span class='timeline-ct'>"
                    +item.punishReasonText+"</span></div>");
                brandHtml.find(".timeline-content-form:first").find("div:first").append("<div style='margin-top: 6px'><span class='timeline-tt'>"
                    +$i18n('live.audit.secondAudit.dialog.punishhistroy.auditor')+"：</span><span class='timeline-ct'>"
                    +item.dealerStaffNick+"</span></div>");
                brandHtml.find(".timeline-content-form:first").find("div:first").css("position"," relative");
                brandHtml.find(".timeline-content-form:first").prepend("<div class='water-mark'></div>");
                brandHtml.find(".water-mark:first").css({
                    position: "absolute",
                    "top": 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    background: "RGBA(255,255,255,0.8)",
                    "border-radius": "8px"
                });
                if(item.appealResult == 1){
                    brandHtml.find(".water-mark:first").append("<div>"+$i18n('live.audit.secondAudit.dialog.punishhistroy.appealSuccess')+"</div>");
                    brandHtml.find(".water-mark:first").find("div:first").css({
                        "font-size": "40px",
                        "color": "RGBA(217,83,79,.3)",
                        "transform": "rotate(19deg)",
                        "margin-top": "15px",
                        "margin-left": "20px",
                        "font-weight": "bold",
                        "border": "1px RGBA(217,83,79,.3) solid",
                        "text-align": "center",
                        "width": "170px",
                        "border-radius": "30px"
                    });
                }
                else if(item.isCancel == 1){
                    brandHtml.find(".water-mark:first").append("<div>"+$i18n('live.audit.secondAudit.dialog.punishhistroy.cancelPunish')+"</div>");
                    brandHtml.find(".water-mark:first").find("div:first").css({
                        "font-size": "43px",
                        "color": "RGBA(217,83,79,.3)",
                        "transform": "rotate(19deg)",
                        "margin-top": "15px",
                        "margin-left": "30px",
                        "font-weight": "bold",
                        "border": "1px RGBA(217,83,79,.3) solid",
                        "text-align": "center",
                        "width": "150px",
                        "border-radius": "30px"
                    });
                }

                return brandHtml.html();
            },
            delOrderInOrderList:function(orderArrs){
                var newOrderList = [];
                for(var i=0; i<this.ordersList.length; i++){
                    var orderItem = this.ordersList[i];
                    var isNeedDel = false;
                    for(var j=0; !isNeedDel && j<orderArrs.length;j++){
                        if(orderArrs[j] == orderItem.orderId)
                            isNeedDel = true;
                    }
                    if(!isNeedDel){
                        newOrderList.push(orderItem);
                    }
                }
                $this.ordersList = newOrderList;
                //判断当前选中的是不是在删除队列，是的话也移除掉咯
                var isRePick = false;
                for(var i=0; !isRePick && i<orderArrs.length;i++){
                    if(orderArrs[i] == this.curOrder.orderId)
                        isRePick = true;
                }
                if(isRePick){
                    this.resetData();
                    this.autoPickOrder();
                }
            },
            ignoreOrder: function(item){
                if(!item)
                    item = this.curOrder;
                var url = "/cloud/app-live-admin-services/live/audit/secondAudit/order/auditWithIgnore";
                var sendParams = {};
                sendParams.orderId = item.orderId;
                sendParams.appId = item.appId;
                $this.$refs.loading.show();
                $.post(url, sendParams, function(data){
                    $this.$refs.loading.hide();
                    if(data && data.success){
                        //然后剔除掉该工单
                        $this.delOrderInOrderList([sendParams.orderId]);
                    }else{
                        var tips = $i18n('live.audit.secondAudit.tips.ignoreOrder.error');
                        if(data && data.description)
                            tips = data.description;
                        alert(tips);
                    }
                }).error(function(){
                    $this.$refs.loading.hide();
                    alert($i18n('live.audit.secondAudit.tips.ignoreOrder.error'));
                });
                //console.log(item);
            },
            clickToSlientOrNot:function(){
                this.isSlientVoice = !this.isSlientVoice
            },
            pickUpOrder: function(){
              var ipValue = this.formData.pickUpValueInput;
              if(!ipValue){
                  alert($i18n('live.audit.secondAudit.tips.pickup.input.error'));
                  return;
              }
              var url = "/cloud/app-live-admin-services/live/audit/secondAudit/order/pickup";
              var sendParams = {};
              sendParams.valueType = this.formData.pickUpValueSelect;
              sendParams.valueData = ipValue;
              sendParams.appId = "";
              for(var i=0; i<this.monitorApp.length; i++){
                  var item = this.monitorApp[i];
                  if(sendParams.appId)
                      sendParams.appId += ","
                  sendParams.appId += item;
              }
              $this.$refs.loading.show();
              $.post(url, sendParams, function(data){
                  $this.$refs.loading.hide();
                  if(data && data.success){
                      $this.setWarningTips($i18n('live.audit.secondAudit.tips.pickup.success'));
                  }else{
                      $this.setWarningTips($i18n('live.audit.secondAudit.tips.pickup.error.1'));
                      alert($i18n('live.audit.secondAudit.tips.pickup.error.1'));
                  }
              }).error(function(){
                  alert($i18n('live.audit.secondAudit.tips.pickup.error.2'));
                  $this.$refs.loading.hide();
              });
            },
            getRecFromTrans: function(item){
                var dataList = $this.$refs.recFromDictSelected.getSelectList();
                for(var i=0; dataList && i<dataList.length; i++){
                    if(dataList[i].id + ''== item + '') {
                        if(item + '')
                            return dataList[i].text;
                    }
                }
                return $i18n('live.audit.secondAudit.recfrom.unknow');
            },
            releaseOrder:function(){
              var inputVal = this. formData.releaseOrderInput;
              if(!$.isNumeric(inputVal)){
                  alert($i18n('live.audit.secondAudit.tips.release.input.error'));
                  return ;
              }
              inputVal = parseInt(inputVal);
              if(inputVal > this.ordersList.length - 1){
                  var maxReleaseCount = this.ordersList.length - 1;
                  if(maxReleaseCount < 0)
                      maxReleaseCount = 0;
                  var tttips = CommonUtil.fillPlaceholder($i18n('live.audit.secondAudit.tips.release.over.max'),maxReleaseCount);
                  alert(tttips);
                  return;
              }
              var canReleaseIdList = [];
              for(var i=0; i<this.ordersList.length; i++){
                  var orderItem = this.ordersList[i];
                  if(!this.isCurOrder(orderItem)){
                      canReleaseIdList.push(orderItem.orderId);
                  }
              }
              if(canReleaseIdList.length > 0){
                  canReleaseIdList.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
              }
              var reallyReleaseIds = "";
              var reallyReleaseIdArrs = [];
              for(var i=0; i<inputVal && i<canReleaseIdList.length; i++){
                  if(reallyReleaseIds)
                      reallyReleaseIds += ",";
                  reallyReleaseIds += canReleaseIdList[i];
                  reallyReleaseIdArrs.push(canReleaseIdList[i]);
              }
              var url = "/cloud/app-live-admin-services/live/audit/secondAudit/order/release";
              var sendParams = {
                  releaseAll:0,
                  description:$i18n('live.audit.secondAudit.ajaxData.release.manual'),
                  releaseOrderId:reallyReleaseIds
              };
              $this.$refs.loading.show();
              $.post(url, sendParams, function(data){
                  $this.$refs.loading.hide();
                  if(data && data.success){
                    //将那些工单从列表中摘除
                    var curAliveOrderList = [];
                    for(var i=0; i<$this.ordersList.length; i++){
                        var orderItem = $this.ordersList[i];
                        if(CommonUtil.ArrayUtil.contain(reallyReleaseIdArrs, orderItem.orderId))
                            continue;
                        else
                            curAliveOrderList.push(orderItem);
                    }
                    alert($i18n('live.audit.secondAudit.tips.release.success'));
                    $this.ordersList = curAliveOrderList;
                  }else{
                    alert($i18n('live.audit.secondAudit.tips.release.error'));
                  }
                } ).error(function(){
                    $this.$refs.loading.hide();
                    alert($i18n('live.audit.secondAudit.tips.release.error'));
                });
            },
            getOrderItemOuterWinWrapClass: function(it){
               if(it == this.curOrder){
                    return "order-item-outer-win-active"
                }else{
                    return "";
                }
            },
            beginAudit:function(){

                var auditApp = [];
                for(var i=0; i<this.allAppList.length; i++){
                    if(this.allAppList[i].isChecked){
                        auditApp.push(this.allAppList[i].appId);
                    }
                }
                if(auditApp.length == 0){
                    alert($i18n('live.audit.secondAudit.tips.changeMonitor.input.error'));
                    return;
                }

                this.isBeginAudit = true;
                this.monitorApp = auditApp;
                this.ordersList = [];
                this.loadOrder(true);

            },
            hasReport: function(){
                return this.curOrderSupData.reportCount ;
            },
            getAppNameByAppId: function(appId){
                for(var i=0; i<this.allAppList.length; i++){
                    if(this.allAppList[i].appId == appId)
                        return this.allAppList[i].appName;
                }
                return "";
            },
            formatTime : function(t){
              if(!t || !$.isNumeric(t))
                  return "";
              return CommonUtil.formatDate(new Date(parseFloat(t)), "yyyy-MM-dd HH:mm:ss");
            },
            isBlankOrder:function(o){
                if(!o )
                    o = this.curOrder;
                return o==null || o.isEmpty;
            },
            autoPickOrder:function(){
                if(!this.isBlankOrder(this.curOrder))
                    return;
                if(this.ordersList.length > 0){
                    this.picsOrderAction(this.ordersList[0]);
                }
            },
            releaseAllOrder:function(){
                var url = "/cloud/app-live-admin-services/live/audit/secondAudit/order/killAlive";
                var sendParams = {
                    releaseAll:1,
                    description:$i18n('live.audit.secondAudit.ajaxData.release.stopAudit'),
                    appId:""
                };
                for(var i=0;i<this.allAppList.length;i++){
                    var item = this.allAppList[i];
                    if(sendParams.appId)
                        sendParams.appId += ";"
                    sendParams.appId += item.appId;
                }
                $.post(url, sendParams, function(data){});
            },
            stopAudit:function(){
                var url = "/cloud/app-live-admin-services/live/audit/secondAudit/order/killAlive";
                var sendParams = {
                    releaseAll:1,
                    description:$i18n('live.audit.secondAudit.ajaxData.release.stopAudit'),
                    appId:""
                };
                for(var i=0;i<this.allAppList.length;i++){
                    var item = this.allAppList[i];
                    if(sendParams.appId)
                        sendParams.appId += ";"
                    sendParams.appId += item.appId;
                }
                $this.$refs.loading.show();
                $.post(url, sendParams, function(data){
                    $this.$refs.loading.hide();
                    if(data && data.success){
                        $this.resetData();
                        $this.ordersList = [];
                        $this.isBeginAudit = false;
                    }else{
                        alert($i18n('live.audit.secondAudit.tips.release.error'));
                    }
                } ).error(function(){
                    $this.$refs.loading.hide();
                    alert($i18n('live.audit.secondAudit.tips.release.error'));
                });
            },
            checkSecondPicsAction:function(it){
              this.checkedSecondPics = it;
            },
            resetData:function(){
              this.curOrderSupData = this.getEmptyCurOrderSupData();
              this.curOrder = this.getEmptyCurOrder();
              this.showPicsLists = [];
              this.checkedSecondPics = {};
              this.hasLoadAllPics = false;
              this.punishReasonData = {};
              this.tmpPunishDataCache = {};
            },
            picsOrderAction : function(orderItem){
                this.resetData();
                this.curOrder = orderItem;
                this.loadOrderDetails();
            },
            getTumnUrl:function(url){
                if(!url)
                    return "";
                while(true){
                    var sizePa = CommonUtil.getParams("size",url);
                    if(!sizePa)
                        break;
                    else
                        url = url.replace("&size="+sizePa, "");
                }
                if(url.indexOf("aliyun") != -1 || url.indexOf("myqcloud") != -1){
                    return  url + "&x-oss-process=image/resize,h_400";
                }
                return url + "&size=500";
            },

            resetShowBigImg: function(target, ourl){

                var offset = $(target).offset();
                var windowWidth = $(window).width();
                var windowHeight =  $(window).height();
                var imgWidth = 712;
                var imgHeight = 400;
                var whrate = $(target).find("img").width() / $(target).find("img").height();
                imgWidth = Math.ceil(imgHeight * whrate);
                var showLeft = offset.left + $(target).width() + 8;
                var showTop = offset.top - 70;

                //宽度溢出，在左边展示
                var showWidth = showLeft + imgWidth;
                if(showWidth > windowWidth - 10){
                    showLeft = offset.left - imgWidth - 3;
                }
                //高度溢出，在上边展示
                var showHeight = showTop + imgHeight;
                if(showHeight > windowHeight - 10 ){
                    showTop =  windowHeight - imgHeight - 20;
                }

                $("#bigPicsShowDom").css("left", showLeft + "px");
                $("#bigPicsShowDom").css("top", showTop + "px");

                $("#bigPicsShowDom").find("img").first().css("width",imgWidth+"px");
                $("#bigPicsShowDom").find("img").first().css("height",imgHeight+"px");

                $("#bigPicsShowDom").find("img").first().attr("src","./css/images/imgLoading.gif");

               // $this.$refs.loading.show();
                window.setTimeout(function(){
                    var img=new Image();
                    img.onload=function(){
                        $("#bigPicsShowDom").find("img").first().attr("src",ourl);
                    }
                    img.onerror=function(){

                    };
                    img.src=ourl;
                    $("#bigPicsShowDom").fadeIn();
                },50);




            },

            mouseEnterPicsAction:function(url, e){
                window._tcache_enter_second_pics_url = url;
                //用户停留1s再执行操作
                if(window._second_pics_list_show_big_timeout){
                    window.clearTimeout(window._second_pics_list_show_big_timeout)
                }
                var ttarget = e.target;
                window._second_pics_list_show_big_timeout = window.setTimeout(function (args) {
                    $this.resetShowBigImg(ttarget, url);
                },500);

            },
            mouseLeavePicsAction:function(){
                window._tcache_enter_second_pics_url = null;
                $("#bigPicsShowDom").hide();
                $("#second-pics-show-area").css("opacity", 1);
                if(window._second_pics_list_show_big_timeout){
                    window.clearTimeout(window._second_pics_list_show_big_timeout)
                }
            },
            getPicsSplitStyle:function(){
                var windowWith = $(window).width();
                var retWidth = windowWith - 30;
                return {
                    width : retWidth + 'px'
                }
            },
            updateCollectPicsRecord:function(pics){
                var list = [];
                for(var i=0; i<pics.length; i++){
                    var picsItem = pics[i];
                    var tobj = CommonUtil.getClone(picsItem);
                    list.push(tobj);
                }
                if(list.length == 0)
                    return;
                var jsonStr = JSON.stringify(list);
                var url = "/cloud/app-live-admin-services/live/audit/secondAudit/pics/fillSecondAuditCollectData";
                $.post(url,{jsonString: jsonStr}, function(){});
            },
            loadOrderPics: function(){
                var url = "/cloud/app-live-admin-services/live/audit/secondAudit/pics/listPics";
                var sendParams = {};
                sendParams.uid = this.curOrder.uid;
                sendParams.appId = this.curOrder.appId;

                var getBeginDate = CommonUtil.formatDate(new Date(new Date().getTime() + 60 * 60 * 1000), "yyyy-MM-dd HH:mm:ss");
                if(this.showPicsLists.length > 0){
                    getBeginDate = this.showPicsLists[this.showPicsLists.length - 1].dataDate - 1 * 1000;
                    getBeginDate = CommonUtil.formatDate(new Date(getBeginDate), "yyyy-MM-dd HH:mm:ss");
                }
                sendParams.date = getBeginDate;
                sendParams.maxCount = 30;
                $this.$refs.loading.show();
                $.post(url, sendParams, function(data){
                    $this.$refs.loading.hide();
                    if(data && data.success && data.result){
                        var tpics = data.result.picsList;
                        if(!tpics || tpics.length == 0){
                            $this.hasLoadAllPics = true;
                        }else{
                            $this.updateCollectPicsRecord(tpics);
                            for(var i=0; i<tpics.length; i++){
                                var picsItem = tpics[i];
                                picsItem.isSplit = false;
                                picsItem.isUserDefPics = false;
                                picsItem.isReported = false;
                                if($this.showPicsLists.length == 0){
                                    $this.showPicsLists.push(picsItem);
                                }else{
                                    var lastPicsItem = $this.showPicsLists[$this.showPicsLists.length -1];
                                    if(lastPicsItem.isSplit)
                                        $this.showPicsLists.push(picsItem);
                                    else if(lastPicsItem.streamId == picsItem.streamId)
                                        $this.showPicsLists.push(picsItem);
                                    else{
                                        $this.showPicsLists.push({isSplit:true});
                                        $this.showPicsLists.push(picsItem);
                                    }
                                }
                            }
                        }
                    }
                }).error(function () {
                    alert($i18n('live.audit.secondAudit.tips.loadPhoto.error'));
                    $this.$refs.loading.hide();
                });

            },
            showLabelTooTips:function(e){
                $(e.target).tooltip('show');
            },
            getLabelTooTipsText:function(item){
              var txt = $i18n('live.audit.secondAudit.label.name')+"："+ item.label.labelName+"<br>";
              txt += $i18n('live.audit.secondAudit.label.remark')+"：<br>"+(item.relation.remark||"") + "<br>";
              txt += $i18n('live.audit.secondAudit.label.principal')+"："+(item.relation.liablePerson||"") ;
              return "<p align='left'>"+txt+"</p>";
            },
            changeMonitorBusiness: function(){
                $this.$refs.businessChangeDialog.setHead($i18n('live.audit.secondAudit.dialog.title.changeApp'));
                $this.$refs.businessChangeDialog.show();
            },
            sureToChangeMonitorBusiness:function(){
                var newAppList = [];
                for(var i=0; i<this.allAppList.length;i++){
                    if(this.allAppList[i].isChecked)
                        newAppList.push(this.allAppList[i].appId);
                }
                if(newAppList.length == 0){
                    alert($i18n('live.audit.secondAudit.tips.changeMonitor.input.error'));
                    return;
                }

                //和现在相比，获取减少了监控的appId
                var minuAppList = [];
                for(var i=0; i<this.monitorApp.length; i++){
                    var tmid = this.monitorApp[i];
                    var isAl = false;
                    for(var j=0;j<newAppList.length;j++){
                        if(newAppList[j] == tmid){
                            isAl = true;
                            break;
                        }
                    }
                    if(!isAl){
                        minuAppList.push(tmid);
                    }
                }
                var url = "/cloud/app-live-admin-services/live/audit/secondAudit/order/killAlive";
                var sendParams = {appId:''};
                for(var i=0; i<minuAppList.length; i++){
                    if(sendParams.appId)
                        sendParams.appId += ";";
                    sendParams.appId += minuAppList[i];
                }
                $this.$refs.loading.show();
                if(sendParams.appId){
                    $.post(url, sendParams, function(data){
                        $this.$refs.loading.hide();
                        if(data&& data.success){
                            $this.monitorApp = newAppList;
                            //释放工单完成，界面上也要释放掉工单
                            var orderIds=[];
                            for(var i=0; i<$this.ordersList.length; i++){
                                var iit = $this.ordersList[i];
                                var isNeedDel = false;
                                for(var j=0; j<minuAppList.length; j++){
                                    if(minuAppList[j] +"" == iit.appId+"")
                                        isNeedDel=true;
                                }
                                if(isNeedDel){
                                    orderIds.push(iit.orderId);
                                }
                            }
                            if(orderIds.length > 0)
                                $this.delOrderInOrderList(orderIds);
                        }else{
                            var tips = $i18n('live.audit.secondAudit.tips.changeMonitor.error');
                            if(data && data.description)
                                tips = data.description;
                            alert(tips);
                        }
                    }).error(function () {
                        $this.$refs.loading.hide();
                        alert($i18n('live.audit.secondAudit.tips.changeMonitor.error'));
                    });
                }else{
                    $this.$refs.loading.hide();
                    $this.monitorApp = newAppList;
                }
                $this.$refs.businessChangeDialog.hide();
            },
            showReportList:function(){
              if(!$this.hasReport())
                  return;
              var headTxt = CommonUtil.fillPlaceholder(
                  $i18n('live.audit.secondAudit.dialog.title.reportDetail'), this.curOrder.uid);
              $this.$refs.reportListOrderDialogRef.setHead(headTxt);
              $this.$refs.reportListOrderDialogRef.show();
              $this.reportDataList = [];
              $this.loadReportData(1);
            },
            loadReportData:function(page){
                var url = "/cloud/app-live-admin-services/live/audit/secondAudit/info/listUndealReportRecord";
                var sendParams = {};
                sendParams.page = page;
                sendParams.pagesize = $this.$refs.reportListPagination.getChooseSize();
                sendParams.appId = $this.curOrder.appId;
                sendParams.streamerUid = $this.curOrder.uid;
                $this.$refs.loading.show();
                $.post(url,sendParams, function(data){
                    $this.$refs.loading.hide();
                    if(data && data.success && data.dataList){
                        $this.reportDataList = data.dataList;
                        $this.$refs.reportListPagination.setTotalPage(sendParams.page,sendParams.pagesize,data.totalCount,5 );
                    }else{
                        alert($i18n('live.audit.secondAudit.tips.loadReport.error'));
                    }
                } ).error(function(){
                    $this.$refs.loading.hide();
                    alert($i18n('live.audit.secondAudit.tips.loadReport.error'));
                });
                console.log(sendParams);
            },
            loadReportedPics:function(){
                if(this.curOrderSupData.reportCount<=0)
                    return;
                var url = "/cloud/app-live-admin-services/live/audit/secondAudit/pics/listReportedPics";
                var sendParams = {};
                sendParams.uid = this.curOrder.uid;
                sendParams.appId = this.curOrder.appId;
                sendParams.maxCount = "8";
                $.post(url, sendParams, function(data){
                    if(data && data.success && data.result){
                        if(data.result.length > 0){
                            $this.showPicsLists.unshift({isSplit:true});
                        }
                        for(var i=data.result.length -1 ; i>=0; i--){
                            var item= data.result[i];
                            item.isSplit = false;
                            item.isUserDefPics = false;
                            item.isReported = true;
                            $this.showPicsLists.unshift(item);
                        }
                    }

                });
            },
            loadOrderDetails:function(){
                var url = "/cloud/app-live-admin-services/live/audit/secondAudit/order/detail";
                var params = {};
                params.orderId = this.curOrder.orderId;
                $this.$refs.loading.show();
                $.post(url, params, function(data){
                    $this.$refs.loading.hide();
                    $this.loadPunishReason();
                    $this.loadOrderPics();
                    if(data && data.success && data.result){
                        $this.curOrderSupData = data.result;
                        $this.loadReportedPics();
                    }else{
                        var tips = $i18n('live.audit.secondAudit.tips.load.orderdetails.error');
                        if(data && data.description)
                            tips = data.description;
                        alert(tips);
                    }


                }).error(function () {
                    $this.$refs.loading.hide();
                    $this.loadPunishReason();
                    $this.loadOrderPics();
                    alert($i18n('live.audit.secondAudit.tips.load.orderdetails.error'));
                });
            },
            getMonitorAppStrWithSplit: function(spl){
                var rstr = "";
                for(var i=0; i<this.monitorApp.length; i++){
                    if(rstr)
                        rstr += spl;
                    rstr +=this.monitorApp[i];
                }
                return rstr;
            },
            refreshToGetOrder: function(){
                this.loadOrder(true, false);
            },
            loadOrder: function(forceGet, isHideLoading){
                this.setWarningTips($i18n('live.audit.secondAudit.tips.order.loading'));
                var thisOrdersListCache = CommonUtil.getClone(this.ordersList);
                var tOrderMapCache = {};
                for(var i=0; i<thisOrdersListCache.length; i++){
                    tOrderMapCache[thisOrdersListCache[i].orderId] = thisOrdersListCache[i];
                }
                //加载数据
                var url = "/cloud/app-live-admin-services/live/audit/secondAudit/order/get";
                var sendParams = {};
                sendParams.forceGet = forceGet;
                sendParams.getNum = 4;
                sendParams.appId = this.getMonitorAppStrWithSplit(",");
                sendParams.unNeedDetailOrderIds = "";
                for(var i=0; i<this.ordersList.length;i++){
                    var item = this.ordersList[i];
                    if(sendParams.unNeedDetailOrderIds)
                        sendParams.unNeedDetailOrderIds+=";";
                    sendParams.unNeedDetailOrderIds += item.orderId;
                }

                if(!isHideLoading)
                    $this.$refs.loading.show();

                $.post(url, sendParams, function(data){
                    if(!isHideLoading){
                        $this.$refs.loading.hide();
                    }
                    if(data && data.success && data.result){
                        //获取当前所有的工单id
                        var curOrderIdMap = {};
                        for(var i=0; i<$this.ordersList.length;i++){
                            curOrderIdMap[$this.ordersList[i].orderId] = true;
                        }
                        //判断当前的新进工单
                        var addOrder = [];
                        var newOrderIdMap = {};
                        for(var i=0; i<data.result.length; i++){
                            newOrderIdMap[data.result[i].orderId] = true;
                            if(curOrderIdMap[data.result[i].orderId])
                                continue;
                            else {
                                if(data.result[i].uid) {
                                    addOrder.push($this.wrapOrderData(data.result[i]));
                                }else{
                                    addOrder.push(tOrderMapCache[data.result[i].orderId]);
                                }
                            }
                        }
                        //判断所有减少了的工单
                        var minuOrder = [];
                        var curOderMinu = false
                        for(var i=0; i<$this.ordersList.length;i++){
                            if(newOrderIdMap[$this.ordersList[i].orderId])
                                continue;
                            else {
                                minuOrder.push($this.ordersList[i].orderId);
                                if($this.curOrder.orderId == $this.ordersList[i].orderId)
                                    curOderMinu = true;
                            }
                        }
                        if(curOderMinu){
                            var isNeedAlert = false;
                            for(var i=0; !isNeedAlert && i<$this.monitorApp.length;i++){
                                if($this.curOrder.appId == $this.monitorApp[i])
                                    isNeedAlert = true;
                            }
                            if(isNeedAlert) {
                             //   alert($i18n('live.audit.secondAudit.tips.order.cur.inlock'));
                                $this.$refs.punishOrderConfirmDialogRef.hide();
                            }
                        }
                        for(var i=0; i<addOrder.length; i++){
                            $this.ordersList.push(addOrder[i]);
                        }
                        if(minuOrder.length > 0){
                            $this.delOrderInOrderList(minuOrder);
                        }
                        $this.autoPickOrder();
                        if(addOrder.length > 0 && !forceGet){
                            $this.doLoadNewOrderAction();
                        }
                        $this.setWarningTips($i18n('live.audit.secondAudit.tips.order.load.success'));
                    }
                }).error(function(){
                    if(!isHideLoading) {
                        alert($i18n('live.audit.secondAudit.tips.order.load.error.2'));
                        $this.$refs.loading.hide();
                    }
                    $this.setWarningTips($i18n('live.audit.secondAudit.tips.order.load.error.1'));
                });



            },
            doLoadNewOrderAction:function(){
                if(!this.isSlientVoice)
                    this.playNewOrderVoice();
            },
            playNewOrderVoice:function(){
                document.getElementById("voiceOrderIn").volume = 0.3;
                document.getElementById("voiceOrderIn").play();
            },
            playWarningDialogVoice:function(){
                document.getElementById("voiceWarnHappen").volume = 0.3;
                document.getElementById("voiceWarnHappen").play();
            },
            changeOrder:function(item){
                this.picsOrderAction(item);
            },
            checkedAppItem:function(item){
                item.isChecked = !item.isChecked;
            },
            deliverAction:function(item){
                var deliverOrderId = this.curDeliverOrderId;
                var deliverUserId = item.staffUid;
                var sendParams = {};
                sendParams.orderId = deliverOrderId;
                sendParams.staffUid = deliverUserId;
                var url = "/cloud/app-live-admin-services/live/audit/secondAudit/order/deliverOrder";
                $this.$refs.loading.show();
                $.post(url, sendParams, function(data){
                    $this.$refs.loading.hide();
                    if(data && data.success){
                        $this.$refs.deliverOrderDialogRef.hide();
                        $this.delOrderInOrderList([sendParams.orderId]);
                    }else{
                        alert($i18n('live.audit.secondAudit.tips.deliver.error'));
                    }
                }).error(function(){
                    $this.$refs.loading.hide();
                    alert($i18n('live.audit.secondAudit.tips.deliver.error'));
                });
            },
            deliverOrder:function(item){
                //获取当前工单数
                var url = "/cloud/app-live-admin-services/live/audit/secondAudit/info/listOnlineUser";
                var sendParams = {appId:item.appId, incluedSelf:0};
                $this.$refs.loading.show();
                $.post(url, sendParams, function(data){
                    $this.$refs.loading.hide();
                    if(data && data.success && data.result){
                        if(data.result.length ==0){
                            alert($i18n('live.audit.secondAudit.tips.deliver.disabled'));
                        }else{
                            $this.onlineCanDeliverUserList = data.result;
                            $this.$refs.deliverOrderDialogRef.setHead($i18n('live.audit.secondAudit.dialog.title.deliver'));
                            $this.$refs.deliverOrderDialogRef.show();
                            $this.curDeliverOrderId = item.orderId;
                        }
                    }else{
                        var tips = $i18n('live.audit.secondAudit.tips.deliver.online.error');
                        if(data.description)
                            tips = data.description;
                        alert(tips);
                    }
                }).error(function(){
                    $this.$refs.loading.hide();
                    alert($i18n('live.audit.secondAudit.tips.deliver.online.error'));
                });

            },
            getAppShortName:function(appId){
                for(var i=0; i<this.allAppList.length; i++){
                    if(this.allAppList[i].appId == appId)
                        return this.allAppList[i].appNameShort;
                }
                return "";
            },
            getOnlineCount: function(item){
                var appId = item.appId;
                for(var i=0; i<this.simplyStatisList.length; i++){
                    if(this.simplyStatisList[i].appId == appId)
                        return this.simplyStatisList[i].onLineAuditorCount;
                }
                return $i18n('live.audit.secondAudit.common.unknow');
            },
            getUndealCount:function(item){
              var appId = item.appId;
              for(var i=0; i<this.simplyStatisList.length; i++){
                  if(this.simplyStatisList[i].appId == appId)
                      return this.simplyStatisList[i].undealCount;
              }
              return $i18n('live.audit.secondAudit.common.unknow');
            },
            changePunishType:function(){
                var curSelected = $("#changePunishTypeSelect").val();
                if(!curSelected)
                    return;

                $("#punishReasonArea").find("input[type='radio']").attr("checked",false);
                $("#punishReasonArea").find("input[type='checkbox']").attr("checked",false);

                if(curSelected != "TS"){
                    var lowerType = curSelected.toLowerCase();
                    var punishReasonDList = this.punishReasonData.commonPunishType[lowerType];
                    if(!punishReasonDList)
                        return;
                    var showPunishChildReasonList = [];
                    for(var i=0; i<punishReasonDList.length; i++){
                        var dataItem = punishReasonDList[i];
                        if(i <6 ){
                            showPunishChildReasonList.push({
                                level : dataItem.level,
                                punishId : dataItem.detailId,
                                isChecked: false,
                                type: 'radio',
                                reason : dataItem.reason
                            });
                        }else{
                            if(showPunishChildReasonList[showPunishChildReasonList.length - 1].type != 'select'){
                                showPunishChildReasonList.push({
                                    type: 'select',
                                    isChecked: false,
                                    punishId:'none',
                                    childReason : [],
                                    reason:''
                                });
                            }
                            showPunishChildReasonList[showPunishChildReasonList.length - 1].childReason.push({
                                level : dataItem.level,
                                punishId : dataItem.detailId,
                                isChecked: false,
                                type: 'radio',
                                reason : dataItem.reason
                            });

                        }
                    }
                    $this.showPunishChildReasonList = showPunishChildReasonList;

                }else{
                    var punishReasonDList = this.punishReasonData.extraPunishType;
                    if(!punishReasonDList)
                        return;
                    var showPunishChildReasonList = [];
                    if(punishReasonDList.warn && punishReasonDList.warn.length > 0){
                        showPunishChildReasonList.push({
                            type: 'select',
                            punishId:'warn',
                            childReason : [],
                            reason:$i18n('live.audit.secondAudit.punish.ext.warn')
                        });
                        for(var i=0; i<punishReasonDList.warn.length; i++){
                            var dataItem = punishReasonDList.warn[i];
                            showPunishChildReasonList[showPunishChildReasonList.length - 1].childReason.push({
                                level : "TS",
                                punishId : dataItem.value,
                                isChecked: false,
                                isCheckBox:false,
                                type: 'radio',
                                reason : dataItem.text
                            });
                        }
                    }
                    if(punishReasonDList.mask && punishReasonDList.mask.length > 0){
                        showPunishChildReasonList.push({
                            type: 'select',
                            punishId:'mask',
                            childReason : [],
                            isCheckBox:true,
                            reason:$i18n('live.audit.secondAudit.punish.ext.mask')
                        });
                        for(var i=0; i<punishReasonDList.mask.length; i++){
                            var dataItem = punishReasonDList.mask[i];
                            showPunishChildReasonList[showPunishChildReasonList.length - 1].childReason.push({
                                level : "TS",
                                punishId : dataItem.value,
                                isChecked: false,
                                type: 'radio',
                                isCheckBox:true,
                                reason : dataItem.text + $i18n("common.timeunit.second")
                            });
                        }
                    }
                    if(punishReasonDList.killLive && punishReasonDList.killLive.length > 0){
                        showPunishChildReasonList.push({
                            type: 'select',
                            punishId:'killlive',
                            childReason : [],
                            reason:$i18n('live.audit.secondAudit.punish.ext.killive')
                        });
                        for(var i=0; i<punishReasonDList.killLive.length; i++){
                            var dataItem = punishReasonDList.killLive[i];
                            showPunishChildReasonList[showPunishChildReasonList.length - 1].childReason.push({
                                level : "TS",
                                punishId : dataItem.value,
                                isChecked: false,
                                isCheckBox:false,
                                type: 'radio',
                                reason : dataItem.text
                            });
                        }
                    }
                    $this.showPunishChildReasonList = showPunishChildReasonList;

                }
            },
            wrapOrderData: function(dataItem){
                var nData = CommonUtil.getClone(dataItem);
                if(nData.submitImgUrl && nData.submitImgUrl.indexOf("@") != -1 ){
                    nData.submitImgUrl = nData.submitImgUrl.split("@")[0];
                }

                nData.showLabel = [];
                //补充第一个标签
                if(nData.fromOWReport){
                    nData.showLabel.push({text:$i18n('live.audit.secondAudit.recfrom.short.owreport'), color:'RGB(153,153,0)'});
                }else if(nData.whiteUserReport && nData.whiteUserGround && nData.whiteUserGround.shortName){
                    nData.showLabel.push({text:nData.whiteUserGround.shortName, color:'RGB(153,153,0)'});
                }else if(nData.fromReport){
                    nData.showLabel.push({text:$i18n('live.audit.secondAudit.recfrom.short.report'), color:'RGB(153,153,0)'});
                }else if(nData.fromFirstAudit){
                    nData.showLabel.push({text:$i18n('live.audit.secondAudit.recfrom.short.firstAudit'), color:'RGB(99,99,99)'});
                }else if(nData.fromHighRisk){
                    nData.showLabel.push({text:$i18n('live.audit.secondAudit.recfrom.short.highriskAudit'), color:'RGB(255,0,0)'});
                }else if(nData.fromSystem){
                    nData.showLabel.push({text:$i18n('live.audit.secondAudit.recfrom.short.system'), color:'RGB(255,138,0)'});
                }
                //补充第二个标签
                if(nData.streamerLabel && nData.streamerLabel.length > 0 ){
                    nData.showLabel.push({text:nData.streamerLabel[0].labelAbb, color:'RGB(22,155,213)'});
                }
                //补充第三个标签
                var appShortName = this.getAppShortName(nData.appId);
                nData.showLabel.push({text:appShortName, color:'RGB(128,0,128)'});
                return nData;
            },
            loadPunishReason: function(appId){
                if(!appId)
                    appId = this.curOrder.appId;
                var punishReasonList =
                    CommonUtil.CacheUtil.get("punishReason#"+appId, function(){

                        var url = "/cloud/app-admin-services/setting/access/punishReason/listWithTS";
                        var ajaxParams = {appId : appId};

                        var retData = null;

                        $.ajax({
                            type: "post",
                            url: url,
                            data:ajaxParams,
                            async:false,
                            success: function(data){
                                if(data.result && data.success){
                                    var comm = data.result.common;
                                    var punishReasonType = [];
                                    if(comm.a && comm.a.length > 0)
                                        punishReasonType.push({value:'A', text:$i18n('live.audit.secondAudit.punish.level.A')})
                                    if(comm.b && comm.b.length > 0)
                                        punishReasonType.push({value:'B', text:$i18n('live.audit.secondAudit.punish.level.B')})
                                    if(comm.c && comm.c.length > 0)
                                        punishReasonType.push({value:'C', text:$i18n('live.audit.secondAudit.punish.level.C')})
                                    if(data.result.extra){
                                        punishReasonType.push({value:'TS', text:$i18n('live.audit.secondAudit.punish.level.TS')});
                                    }

                                    var setData = {
                                        punishReasonType : punishReasonType,
                                        commonPunishType : comm,
                                        extraPunishType : data.result.extra
                                    }

                                    retData = setData;

                                }
                            }
                        });

                        if(!retData){
                            alert($i18n('live.audit.secondAudit.tips.punishreason.load.error'));
                        }else{
                            //缓存20分钟
                            CommonUtil.CacheUtil.set("punishReason#"+appId, retData, 20 * 60 * 1000);
                        }
                        return retData;
                    });

                this.punishReasonData = punishReasonList;
                window.setTimeout(function () {
                    $this.changePunishType();
                },100);


            },
            isCurOrder: function(order){
              return order.orderId == this.curOrder.orderId;
            },
            getLabelItemStyle:function(item){
              return {
                  "background":item.color
              }
            },
            getInCheckedCount:function(){
              return this.ordersList.length;
            },
            getChildItemCount:function(key){
                var retC = 0;
                for(var i=0; i<this.ordersList.length;i++){
                    var item = this.ordersList[i];
                    if(item[key])
                        retC++;
                }
                return retC;
            },
            getWaitingCheckedCount:function(){
                var retC = 0;
                for(var i=0; i<this.simplyStatisList.length; i++) {
                    var item = this.simplyStatisList[i];
                    var isMonitorApp = false;
                    for(var j=0; !isMonitorApp && j<this.monitorApp.length;j++){
                        if(item.appId == this.monitorApp[j])
                            isMonitorApp = true;
                    }
                    if(isMonitorApp){
                        retC += parseInt(item.undealCount);
                    }
                }
                return retC;
            },
            getAlreadyCheckedCount:function(){
                var retC = 0;
                for(var i=0; i<this.simplyStatisList.length; i++){
                    var item = this.simplyStatisList[i];
                    if(item.alreadyAuditCount)
                        retC += parseInt(item.alreadyAuditCount);
                }
                return retC;
            },
            loadFirstStatisData: function(){
                var url = "/cloud/app-live-admin-services/live/audit/secondAudit/order/statisInSimplyModel";
                var params = {appId:""};
                for(var i=0; i<this.allAppList.length; i++){
                    if(params.appId)
                        params.appId += ",";
                    params.appId+=this.allAppList[i].appId;
                }
                $.post(url, params, function(rs){
                    if(rs && rs.success && rs.result && rs.result.length > 0){
                        $this.simplyStatisList = rs.result;
                    }
                });
            },
            initAppList: function(){
                var url = "/cloud/app-admin-services/setting/access/live/getList";
                var params = {
                    page : 1,
                    pagesize: 10000,
                    status:'S0A'
                };
                $.post(url, params, function (data) {
                    $this.allAppList = [];
                    for(var i=0 ; data && data.dataList && i<data.dataList.length; i++){
                        $this.allAppList.push({
                            appid : data.dataList[i].appId,
                            appId : data.dataList[i].appId,
                            appName: data.dataList[i].appName,
                            appNameShort : data.dataList[i].appNameShort,
                            showPercent : data.dataList[i].showPercent,
                            showIndex :data.dataList[i].showIndex,
                            isChecked: false
                        });
                    }
                    $this.loadFirstStatisData();
                });
            },
            getEmptyCurOrder: function(){
                return {
                    appId:"", fromFirstAudit:"", fromHighRisk:"", fromOWReport:"", fromReport:"", liveAuditRecord:"",
                    orderId:"", showLabel:"", sid:"", streamerLabel:"", submitImgUrl:"", submitTime:"", submitType:"",
                    uid:"", whiteUserGround:"", whiteUserReport:"", isEmpty:true
                }
            },
            getEmptyCurOrderSupData: function(){
                return {
                    anchorLabelList: "", appId: "", categoryName: "", firstAccusationRaw:"", liveTitle:"",
                    liveUrl:"", orderId:"", pcu:"", recFrom:"", reportCount:"", streamerNickName:"",
                    streamerUid: "", submitTime:"", submiterStaffId:"", submiterStaffName:"",
                    submiterStaffUid:"", isEmpty:true
                }
            },
            isFromReport: function(){
                if(this.curOrder && this.curOrder.fromReport)
                    return true;
                else
                    return false;
            },
            showUploadDialog: function(){
               $this.$refs.fileUploadRef.show();
            },
            getOuterWinPicsClass: function(item){
                if(item.id == this.checkedSecondPics.id){
                    return "checked-pics-outer-win";
                }
                var paramsT = CommonUtil.getParams("t", this.curOrder.submitImgUrl);
                if(paramsT + "" == item.dataDate + "")
                    return "submit-pics-outer-win";
                else
                    return "";
            },
            uploadSuccessAction: function(url){
                var userDItem = {};
                userDItem.createDate = new Date().getTime();
                userDItem.dataDate = new Date().getTime();
                userDItem.isSplit = false;
                userDItem.isUserDefPics = true;
                userDItem.isReported = false;
                userDItem.uid = this.curOrder.uid;
                userDItem.appId = this.curOrder.appId;
                userDItem.id = 0;
                userDItem.streamId = "";
                if(url.indexOf("?") == -1)
                    url += "?";
                else
                    url += "&";
                userDItem.url = url + "t="+userDItem.dataDate
                this.showPicsLists.unshift(userDItem);
            },
            showWarnDialog:function(title,content){
                if(window._showWarnDialog_hide_timeoutfun){
                    window.clearTimeout(window._showWarnDialog_hide_timeoutfun);
                }
                this.playWarningDialogVoice();
                this.warnningDialogObj.title = title;
                this.warnningDialogObj.content = content;
                $("#bottom-right-warning-dialog").slideDown();
                window._showWarnDialog_hide_timeoutfun = window.setTimeout(function(){
                    $this.closeWarningDialog();
                },6 * 1000)
            },
            closeWarningDialog:function(){
                $("#bottom-right-warning-dialog").slideUp();
            },
            checkTimeoutOrder:function(){
                var timeOutOrderNum = 0;
                for(var i=0; i<this.ordersList.length; i++){
                    var orderItem = this.ordersList[i];
                    if(new Date().getTime() - orderItem.submitTime > 10 * 60 *1000){
                        timeOutOrderNum++;
                    }
                }
                if(timeOutOrderNum > 0){
                    var title= $i18n('live.audit.secondAudit.dialog.title.timeout.warning');
                    var content = $i18n('live.audit.secondAudit.tips.order.timeout.warning.content');
                    var content = CommonUtil.fillPlaceholder(content, timeOutOrderNum);
                    this.showWarnDialog(title, content);
                }
            },
            keepAlive:function(){
                var url = "/cloud/app-live-admin-services/live/audit/secondAudit/order/keepAlive";
                var sendParams = {appId:''};
                for(var i=0; i<this.monitorApp.length;i++){
                    if(sendParams.appId)
                        sendParams.appId += ";";
                    sendParams.appId += this.monitorApp[i];
                }
                $.post(url,sendParams,function(){} );
            },
            initTimeout: function(){
                var timeoutFunc = function(){
                    //加载统计信息
                    //待检统计信息10秒统计一次
                    if(!window._refresh_statis_data_time)
                        window._refresh_statis_data_time = 0;
                    if(new Date().getTime() - window._refresh_statis_data_time > 10 * 1000){
                        $this.loadFirstStatisData();
                        window._refresh_statis_data_time = new Date().getTime();
                    }
                    if($this.isBeginAudit){
                        $this.loadOrder(false,true);
                        $this.keepAlive();
                        if(!window._check_timeout_order_time)
                            window._check_timeout_order_time = 0;
                        if(new Date().getTime() - window._check_timeout_order_time > 30  * 1000){
                            $this.checkTimeoutOrder();
                            window._check_timeout_order_time = new Date().getTime();
                        }
                    }else{
                        if(!window._last_release_order_time)
                            window._last_release_order_time = 0;
                        if($this.ordersList.length > 0
                            || new Date().getTime() - window._last_release_order_time > 60  * 1000) {
                            $this.releaseAllOrder();
                            window._last_release_order_time = new Date().getTime();
                        }
                    }
                }
                window._time_interval_sss = window.setInterval(function () {
                    timeoutFunc();
                },4000);
            },
            getSelectPunishProofUrl:function(){
              if(!this.curOrder)
                 return "";
              if(this.checkedSecondPics.url)
                  return this.checkedSecondPics.url;
              else
                  return this.curOrder.submitImgUrl;
            },
            sureToPunish:function(){
                var url = "/cloud/app-live-admin-services/live/audit/secondAudit/order/auditWithPunish";
                var sendParams = {};
                sendParams.orderId = this.tmpPunishDataCache.orderId;
                sendParams.proofUrl = this.tmpPunishDataCache.proofUrl;
                sendParams.saveOtherJsonData = JSON.stringify(this.curOrderSupData);
                if(sendParams.saveOtherJsonData.length >= 2500)
                    sendParams.saveOtherJsonData = "{}";
                sendParams.punishReason = this.tmpPunishDataCache.punishReason;
                sendParams.punishLevel = this.tmpPunishDataCache.punishLevel;
                sendParams.punishOrginal = this.curOrderSupData.recFrom;
                var punishSource = this.curOrder.fromFirstAudit ? 1 :
                                   this.curOrder.fromHighRisk ? 2:
                                   this.curOrder.fromReport ? 3:4;
                sendParams.punishSource = punishSource;
                sendParams.appId =this.tmpPunishDataCache.appId;
                //特殊违规的情况下，punishReason参数要特殊化
                if(sendParams.punishLevel == "TS"){
                    var maskReason = "";
                    var warnReason = "";
                    var killiveReason = "";
                    for(var i=0; i<sendParams.punishReason.length; i++){
                        var ttitem = sendParams.punishReason[i];
                        if(ttitem.type=="warn")
                            warnReason = ttitem.reason;
                        else if(ttitem.type=="mask")
                            maskReason = ttitem.reason;
                        else if(ttitem.type=="killlive")
                            killiveReason = ttitem.reason;
                    }
                    var newPunishReason = warnReason;
                    if(newPunishReason && maskReason)
                        newPunishReason += ";" + maskReason;
                    else if(killiveReason)
                        newPunishReason = killiveReason;
                    sendParams.punishReason = newPunishReason;
                }
                if(!sendParams.punishOrginal)
                    sendParams.punishOrginal = 0;
                $this.$refs.loading.show();
                $.post(url, sendParams, function(data){
                    $this.$refs.loading.hide();
                    if(data && data.success){
                        alert($i18n('live.audit.secondAudit.tips.punish.success'));
                        $this.$refs.punishOrderConfirmDialogRef.hide();
                        $this.delOrderInOrderList([sendParams.orderId]);
                    }else{
                        var tips = $i18n('live.audit.secondAudit.tips.punish.error.1');
                        if(data && data.description)
                            tips = data.description;
                        alert(tips);
                    }
                }).error(function(){
                    $this.$refs.loading.hide();
                    alert($i18n('live.audit.secondAudit.tips.punish.error.2'));
                });
            },
            checkedSelectReasonRadio:function(e){
              if(e && e.target) {
                  var isCheckedNow = $(e.target).parent().find("input[type='checkbox'], input[type='radio']").is(":checked");
                  if(!isCheckedNow)
                    $(e.target).parent().find("input[type='checkbox'], input[type='radio']").trigger("click");
              }
            },
            getFirstReportContent:function(){
                if(this.curOrderSupData.firstAccusationRaw)
                    return this.curOrderSupData.firstAccusationRaw.illegalDetails;
                else
                    return "";
            },
            punishOrder:function(){
                //获取违规级别
                var punishLevel = $("#changePunishTypeSelect").val();
                if(punishLevel != 'TS') {
                    var punishReason = $("#punishReasonArea").find("input:checked").val();
                    if(punishReason === "none")
                        punishReason = $("#punishReasonArea").find("select:last").val();
                }else{
                    var punishType = $("#punishReasonArea").find("input[type='radio']:checked").val()
                    var punishMask = $("#punishReasonArea").find("input[type='checkbox']:checked").val();
                    if(punishType != 'warn' && punishMask){
                        alert($i18n('live.audit.secondAudit.tips.punish.mask.input.error'));
                        return;
                    }
                    var punishReason = [];
                    if(punishType == 'killlive'){
                        var reason = $("#punishReasonArea").find("select").eq(3).val();
                        var txt = $("#punishReasonArea").find("select").eq(3).find("option[value='"+reason+"']").text();
                        punishReason.push({type:'killlive', reason:reason, text:txt});
                    }
                    else if(punishType == 'warn'){
                        var reason = $("#punishReasonArea").find("select").eq(1).val();
                        var txt = $("#punishReasonArea").find("select").eq(1).find("option[value='"+reason+"']").text();
                        punishReason.push({type:'warn', reason:reason, text:txt});
                        if(punishMask){
                            var reason = $("#punishReasonArea").find("select").eq(2).val();
                            var txt = $("#punishReasonArea").find("select").eq(2).find("option[value='"+reason+"']").text();
                            punishReason.push({type:'mask', reason:reason, text:txt});
                        }
                    }
                    if(punishReason.length == 0){
                        alert($i18n('live.audit.secondAudit.tips.punish.input.notreason'));
                        return;
                    }

                }
                if(!punishLevel){
                    alert($i18n('live.audit.secondAudit.tips.punish.input.notlevel'));
                    return;
                }
                if(!punishReason){
                    alert($i18n('live.audit.secondAudit.tips.punish.input.notreason'));
                    return;
                }

                var selectUrl = this.getSelectPunishProofUrl();
                if(!selectUrl){
                    alert($i18n('live.audit.secondAudit.tips.punish.input.notproof'));
                    return;
                }

                var confiremTitle = $i18n('live.audit.secondAudit.tips.punish.confirm.punish');
                confiremTitle = CommonUtil.fillPlaceholder(confiremTitle,$this.curOrder.uid );
                $this.$refs.punishOrderConfirmDialogRef.setHead(confiremTitle);
                $this.$refs.punishOrderConfirmDialogRef.show();

                var punishObj = {};
                punishObj.uid = $this.curOrder.uid;
                punishObj.appId = $this.curOrder.appId;
                punishObj.proofUrl = selectUrl;
                punishObj.punishLevel = punishLevel;
                punishObj.punishReason = punishReason;
                punishObj.orderId = $this.curOrder.orderId;
                punishObj.appId = $this.curOrder.appId;
                if(!CommonUtil.getParams("t",  punishObj.proofUrl)){
                    if(punishObj.proofUrl.indexOf("?") == -1)
                        punishObj.proofUrl  = punishObj.proofUrl + "?";
                    else
                        punishObj.proofUrl  = punishObj.proofUrl + "&";
                    punishObj.proofUrl = punishObj.proofUrl + "t="+new Date().getTime();
                }
                this.tmpPunishDataCache = punishObj;

            },
            getCurUserLabelWithFullName:function(){
                if(!this.curOrderSupData || !this.curOrderSupData.anchorLabelList)
                    return $i18n('live.audit.secondAudit.label.none');
                var retTxt = "";
                for(var i=0; i<this.curOrderSupData.anchorLabelList.length;i++){
                    if(retTxt)
                        retTxt += "；"
                    retTxt += this.curOrderSupData.anchorLabelList[i].label.labelName;
                }
                return retTxt || $i18n('live.audit.secondAudit.label.none');
            },
            getConfirmPunishLevel:function(){
                if(!this.punishReasonData.punishReasonType)
                    return ;
                var punishLevel = this.tmpPunishDataCache.punishLevel;
                for(var i=0; i<this.punishReasonData.punishReasonType.length; i++){
                    var titem = this.punishReasonData.punishReasonType[i];
                    if(titem.value == punishLevel)
                        return titem.text;
                }
                //容错返回
                return $("#changePunishTypeSelect").find("option[value='"+punishLevel+"']").text();
            },
            getConfirmPunishReason: function(){
                var punishReason = this.tmpPunishDataCache.punishReason;
                //特殊违规
                if(this.tmpPunishDataCache.punishLevel == 'TS'){
                    var retTxt = "";
                    for(var i=0; i<punishReason.length;i++){
                        if(retTxt)
                            retTxt += "/";
                        var transT = punishReason[i].type=="warn"? $i18n('live.audit.secondAudit.punish.ext.warn') :
                                      punishReason[i].type=="mask"? $i18n('live.audit.secondAudit.punish.ext.mask') :
                                      punishReason[i].type=="killlive"? $i18n('live.audit.secondAudit.punish.ext.killive') : $i18n('live.audit.secondAudit.common.unknow');
                        retTxt +=  transT+"（"+punishReason[i].text+"）"
                    }
                    return retTxt;
                }
                //其它政策的违规
                else{
                    if(!this.punishReasonData.commonPunishType)
                        return "";
                    var tkeys = ["A","B","C", "a","b","c"];
                    for(var i=0; i<tkeys.length; i++){
                        var targetList = this.punishReasonData.commonPunishType[tkeys[i]];
                        if(!targetList)
                            continue;
                        for(var j=0; j<targetList.length; j++){
                            if(targetList[j].detailId == punishReason )
                                return targetList[j].reason;
                        }
                    }
                }
            },
            initKeyboardListener:function(){
                $(document).keydown(function(e){
                    var keyCode = e.keyCode;
                    if(keyCode == 70){
                        $this.showBigPics();
                    }
                });

                $(document).keypress(function (e) {
                    var keyCode = e.keyCode;
                    //按下q键盘
                    if(keyCode == 81 || keyCode == 113){
                        if($this.isBeginAudit){
                            $this.refreshToGetOrder();
                        }
                    }
                });
            },
            playVideo:function(){
                var obj = {};
                var appId = this.curOrder.appId;
                obj.header = {
                    version : "100",
                    appId : appId,
                    currentTime: new Date().getTime()
                };
                obj.uid = this.curOrder.uid;
                obj.endTime = this.curOrder.submitTime / 1000 + 60;
                obj.beginTime = 0;
                this.$refs.loading.show();
                $.ajax({
                    type: 'post',
                    url: '/cloud/app-api/live/record/getReplayStream',
                    contentType: 'application/json',
                    data: JSON.stringify(obj),
                    error: function () {
                        alert($i18n('live.audit.secondAudit.tips.replay.errpr'));
                        $this.$refs.loading.hide();
                    },
                    success: function (data) {
                        $this.$refs.loading.hide();
                        if (data && data.url && data.url.url) {
                            var tendTime = new Date(data.videoEndTime * 1000);
                            $this.$refs.videoDialog.showVideo(data.url.url);
                            if ($this.$refs.videoDialog.getPlayer()) {

                                if($this.curOrderSupData.submitTime){
                                    var reallySeekTime = $this.curOrderSupData.submitTime - (60 * 1000);
                                    var diffSeek = parseInt(( reallySeekTime - tendTime.getTime()) / 1000);
                                    $this.$refs.videoDialog.getPlayer().seekTo(diffSeek);
                                }else{
                                    $this.$refs.videoDialog.getPlayer().seekTo(-60);
                                }

                                $this.$refs.videoDialog.getPlayer().setTimerFunction(function (cur, total) {

                                    if (!$.isNumeric(cur) || !$.isNumeric(total))
                                        return;
                                    var diffSecond = parseInt(total) - parseInt(cur);
                                    var curTimes = tendTime - (diffSecond * 1000);
                                    var curTimeDate = new Date(curTimes);
                                    var showDate = CommonUtil.formatDate(curTimeDate, "yyyy-MM-dd HH:mm:ss");
                                    if ($this.$refs.videoDialog.getPlayer()) {
                                        var rate = $this.$refs.videoDialog.getPlayer().getSpeed();
                                        if (rate != 1)
                                            showDate = showDate + "（" + rate + +$i18n('live.audit.secondAudit.init.loading.rate')+"）";
                                        var waterMarkHtml = "<div style='font-size:22px;background:RGBA(56,56,56,0.7);color:#f0ad4e'>" + showDate + "</div>"
                                        $this.$refs.videoDialog.getPlayer().setPlayWatermark(waterMarkHtml);
                                    }

                                });
                            }
                        }
                    }});
            },
            showBigSubmitImg:function(img){
                var proofUrl = CommonUtil.trimParams("size",img);
                proofUrl = CommonUtil.trimParams("x-oss-process",proofUrl);
                var title = $i18n('live.audit.secondAudit.dialog.title.upload');
                this.$refs.submitImgGallery.show(proofUrl, title);
            },
            showBigPics:function(){
                if(window._tcache_enter_second_pics_url){
                    window.open(window._tcache_enter_second_pics_url);
                }
            },
            init: function () {
                this.initAppList();
                this.curOrderSupData = this.getEmptyCurOrderSupData();
                this.curOrder = this.getEmptyCurOrder();
                this.$refs.reportListPagination.setClickAction(this.loadReportData);
                this.$refs.reportListPagination.setChooseData([10]);
                this.initKeyboardListener();
                this.initTimeout();
            }
        },
        mounted: function () {
            //初始化
            this.init();
            this.$refs.loading.show();
            CommonUtil.ready(function () {
                return $this.simplyStatisList.length > 0;
            },function () {
                $this.$refs.loading.hide();
            },function () {
                alert($i18n('live.audit.secondAudit.init.loading.error'));
                $this.$refs.loading.hide();
            });

        }

    });

    window.ttt = $this;

});