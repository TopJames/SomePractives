package webmagic.processor;

import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.processor.PageProcessor;

/**
 * Created by Administrator on 2018/7/16.
 */
public class DemoProcessor1 implements PageProcessor {

    // 抓取网站的相关配置，包括编码、抓取间隔、重试次数等
    private Site site = Site.me().setRetryTimes(3).setSleepTime(100);
    private static int count =0;

    @Override
    public void process(Page page) {

        System.out.println("start getting page....");

        System.out.println("finish getting page....");
    }

    @Override
    public Site getSite() {
        return site;
    }
}
