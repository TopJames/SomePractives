package reflect.test1;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2018/5/14.
 */
public class Main1 {

    public static void main(String[] args) throws NoSuchFieldException, IllegalAccessException {
        Map map=new HashMap<>();
        map.put("k1","this is k1");
        DemoObj demoObj=new DemoObj();

        try{
            System.out.println(demoObj.get("k1"));
        }catch (Exception e){
            System.out.println("Exception!msg:"+e.getMessage());
        }

        Field field=DemoObj.class.getDeclaredField("map");
        field.setAccessible(true);
        field.set(demoObj,map);
        demoObj.get("k1");

        try{
            System.out.println(demoObj.get("k1"));
        }catch (Exception e){
            System.out.println("Exception!msg:"+e.getMessage());
        }
        System.out.println(demoObj.get("k1"));
        System.out.println(demoObj.get("k1"));
    }
}
