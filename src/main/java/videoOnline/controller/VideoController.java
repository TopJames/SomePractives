package videoOnline.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;

@Controller
public class VideoController {

    @RequestMapping("/watch.do")
    public void downloadVideo(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("video/mp4");
        res.setBufferSize(10*1024);
        OutputStream outputStream=res.getOutputStream();
        FileInputStream fis=new FileInputStream("E:\\TestVideo\\JayChou&Hannah'sWeddingMoment.mp4");
//        FileInputStream fis=new FileInputStream("E:\\测试视频\\格式工厂JayChou&Hannah'sWeddingMoment.mp4");
//        FileInputStream fis=new FileInputStream("E:\\测试视频\\2018-09-12-19_37_04_2018-09-12-23_17_25.m3u8");
        byte[] byteData=new byte[10*2048];
        int length=0;
        while((length=fis.read(byteData,0,byteData.length))!=-1){
            outputStream.write(byteData,0,length);
        }
        outputStream.flush();
        fis.close();
        outputStream.close();
    }
}
