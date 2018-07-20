package redis;

import redis.clients.jedis.HostAndPort;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisCluster;

/**
 * Created by Administrator on 2018/7/5.
 */
public class Run7 {
    public static void main(String[] args) {
//        Jedis jedis=new Jedis("192.168.129.3",6379);
        JedisCluster jedisCluster=new JedisCluster(new HostAndPort("10.79.1.143",6379));
        jedisCluster.zadd("name",2,"222");
        double score=jedisCluster.zscore("name","222");
        Double aDouble=jedisCluster.zscore("name","23123");
        System.out.println(aDouble.isNaN());
    }
}
