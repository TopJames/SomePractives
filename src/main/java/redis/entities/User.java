package redis.entities;

import java.io.Serializable;

/**
 * Created by Administrator on 2018/5/31.
 */
public class User implements Serializable{
    String name="tom";
    String[] sons=new String[]{"jim","bob"};

    @Override
    public String toString() {
        return "name:"+name+",son:"+sons[0]+","+sons[1];
    }
}
