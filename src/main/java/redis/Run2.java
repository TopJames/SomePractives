package redis;

import kryo.util.SerializeUtil;
import redis.clients.jedis.*;

import java.util.List;

/**
 * Created by Administrator on 2018/6/4.
 */
public class Run2 {
    public static void main(String[] args) {
//        Jedis jedis=new Jedis("192.168.129.3",6379);

        JedisCluster jedisCluster=new JedisCluster(new HostAndPort("10.79.1.143",7379));

        Jedis jedis=new Jedis("10.79.1.143",7379);
        System.out.println("service status:"+jedis.ping());


        jedis.zadd("demoset",1,"11");

        double temp=jedisCluster.zscore("demoset","11");


        Pipeline pp=jedis.pipelined();
        pp.multi();
        pp.zadd("demoset",1,"11");
        pp.hset(SerializeUtil.serializeObj("keymap"),
                SerializeUtil.serializeObj("1st"),
                SerializeUtil.serializeObj("first"));
        List<Object> reslist=pp.syncAndReturnAll();

        Response<List<Object>> res=pp.exec();
        List<Object> reslist2=pp.syncAndReturnAll();
    }
}
