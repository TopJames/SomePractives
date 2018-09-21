package fileUpload.controller;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.apache.catalina.servlet4preview.http.ServletMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Collection;

@Controller
public class UploadFile {

    @RequestMapping("/upload")
    public void uploadFile(MultipartFile multipartFile, HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
//        String name=multipartFile.getName();
//        InputStream inputStream = multipartFile.getInputStream();
//        FileOutputStream fileOutputStream=new FileOutputStream("E:\\TempTest\\testupload.jpg");
//        byte[] bytes=new byte[1024];
//        int lenght;
//        while((lenght=inputStream.read(bytes,0,bytes.length))!=-1){
//            fileOutputStream.write(bytes,0,lenght);
//        }
//        fileOutputStream.flush();
//        fileOutputStream.close();
//        inputStream.close();
        Collection<Part> parts = req.getParts();
        int count =0;
        for (Part part:parts){
            InputStream inputStream = part.getInputStream();
            System.out.println(part.getSubmittedFileName()+","+part.getName());
            FileOutputStream fileOutputStream=new FileOutputStream("E:\\TempTest\\"+count+".jpg");
            byte[] bytes=new byte[1024];
            int lenght;
            while((lenght=inputStream.read(bytes,0,bytes.length))!=-1){
                fileOutputStream.write(bytes,0,lenght);
            }
            fileOutputStream.flush();
            fileOutputStream.close();
            inputStream.close();
            count++;
        }

        ServletMapping servletMapping = req.getServletMapping();
        int status = res.getStatus();
        System.out.println("haha");
        res.setHeader("Access-Control-Allow-Origin", "*");
        PrintWriter writer = res.getWriter();
        writer.print("sesfdsfsdfsdfsdf");
        writer.flush();
        writer.close();

    }

}
