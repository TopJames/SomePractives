package basic.collection.map.hashmap;

import java.util.Map;
import java.util.Set;

/**
 * Created by Administrator on 2018/6/25.
 */
public class RunHashMap {

    public static void main(String[] args) {
        FakeHashMap<String,String> hashMap=new FakeHashMap();
        hashMap.put("name","tom");
        System.out.println(hashMap.get("name"));
        hashMap.put("name","kim");
        System.out.println(hashMap.get("name"));
        Set<Map.Entry<String,String>> set=hashMap.entrySet();
        Map.Entry<String,String> entry=set.iterator().next();
        if("name".equals(entry.getKey())){
            FakeHashMap.Node node=(FakeHashMap.Node)entry;
            FakeHashMap.Node nextNode=node.next;
            System.out.println("nextNode:"+nextNode.getValue());
        }
    }
}
