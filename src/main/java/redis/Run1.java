package redis;

import kryo.util.SerializeUtil;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;
import redis.entities.User;

import java.io.UnsupportedEncodingException;

/**
 * Created by Administrator on 2018/5/31.
 */
public class Run1 {
    public static void main(String[] args) throws UnsupportedEncodingException {
        Jedis jedis=new Jedis("192.168.129.3",6379);
        System.out.println("service status:"+jedis.ping());
//        String key1=new String("key");
//        String key2=new String("key");
//        String val="val";
//        jedis.set(SerializeUtil.serializeObj(key1),SerializeUtil.serializeObj(val));
//        System.out.println(SerializeUtil.deSerialize(jedis.get(SerializeUtil.serializeObj(key2)),String.class));
        Pipeline pp=jedis.pipelined();
        long startTime=System.currentTimeMillis();
        for(int i=0;i<10000;i++){
//            User user=new User();
//            String key="user";
//        jedis.set("test1","test1value");
//        System.out.println("test1:"+jedis.get("test1"));
//            byte[] afterSerialized=SerializeUtil.serializeObj(user);
//            jedis.set(SerializeUtil.serializeObj(key),SerializeUtil.serializeObj(user));

//            byte[] data=jedis.get(SerializeUtil.serializeObj(key));
//            System.out.println(new String(data,"UTF-8"));
//            User userObj=SerializeUtil.deSerialize(data,User.class);
//            System.out.println("user info: "+userObj.toString());


//            pp.set("a","r");
//            pp.get("a");

            pp.set(SerializeUtil.serializeObj("a"),SerializeUtil.serializeObj("r"));
            pp.get(SerializeUtil.serializeObj("a"));

        }
        pp.sync();

        long endTime=System.currentTimeMillis()-startTime;
        System.out.println("last time(second):"+endTime);
    }
}
