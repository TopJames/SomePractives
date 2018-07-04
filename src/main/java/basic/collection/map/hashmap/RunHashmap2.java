package basic.collection.map.hashmap;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Created by Administrator on 2018/7/4.
 */
public class RunHashmap2 {
    public static void main(String[] args) {
        HashMap<String,String> hashMap=new HashMap();
        Set<Map.Entry<String,String>> set=hashMap.entrySet();
        hashMap.put("a","aaa");
        Set<Map.Entry<String,String>> set2=hashMap.entrySet();
    }
}
