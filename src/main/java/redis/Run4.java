package redis;

import com.alibaba.fastjson.JSON;
import redis.clients.jedis.Jedis;
import redis.entities.Entity1;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by Administrator on 2018/6/5.
 */
public class Run4 {
    public static void main(String[] args) {
//        String string="k,l,";
//        String[] strings=string.split(",");
//        System.out.println(strings.length);

//        Jedis jedis=new Jedis("192.168.129.3",6379);
//
//        String keysStr=jedis.hget("aaa","bb");
//
//        StringBuffer sb=new StringBuffer();
//        String str=null;
//        System.out.println(sb.length()+","+sb.capacity());
//        sb.append(str);
//        System.out.println(sb.length()+","+sb.capacity());

//        Entity1 e1=new Entity1();
//        e1.setAge(2);
//        e1.setName("tom");
//        System.out.println(JSON.toJSON(e1));
//        String str="{\"age\":\"2\",\"name\":\"tom\"}";
//        Entity1 e2=JSON.parseObject(str,Entity1.class);
//        System.out.println(e2.getAge()+","+e2.getName());

        List<String> list1=new ArrayList<>();
        list1.add("1");
        list1.add("1");
        list1.add("2");
        Stream<String> stream=list1.stream();
        stream=stream.distinct();
        stream.forEach(c -> {
            System.out.println(c);
        });
//        list1=stream.collect(Collectors.toList());
//        for(String str:list1){
//            System.out.println(str);
//        }

        Object obj="111";
        System.out.println(obj.toString());
        double num=Double.valueOf((String)obj);
        System.out.println(num);

    }
}
