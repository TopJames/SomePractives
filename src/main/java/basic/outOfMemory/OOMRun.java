package basic.outOfMemory;

import org.icepdf.core.pobjects.Document;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2018/6/29.
 */
public class OOMRun {
    public static void main(String[] args) {

        List list=new ArrayList<>();

        for(;;){
     //       list.add(new Document());
//            list.add(new ByteArrayOutputStream());
//            list.add(new byte[1024]);
            list.add(new ByteArrayInputStream(new byte[1024]));
        }
    }
}
