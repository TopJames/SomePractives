package webmagic;

import us.codecraft.webmagic.Spider;
import webmagic.processor.DemoProcessor1;

/**
 * Created by Administrator on 2018/7/16.
 */
public class Crawler1 {
    public static void main(String[] args) {

        long startTime, endTime;
        System.out.println("开始爬取...");
        startTime = System.currentTimeMillis();
        Spider spider=Spider.create(new DemoProcessor1());

        spider.addUrl("http://10.79.1.167/dashboard/projects").thread(1).run();
        endTime = System.currentTimeMillis();
    }
}
