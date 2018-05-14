package reflect.test1;

import java.util.Map;

/**
 * Created by Administrator on 2018/5/14.
 */
public class DemoObj {

    Map map;

    public String get(String key){
        String str=(String)map.get(key);
        return str;
    }
}
