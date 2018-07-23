package proxydemo;


import proxydemo.impl.BreakingShot;
import proxydemo.impl.Hello;
import proxydemo.interfaces.Doing;
import proxydemo.proxy.ProxyDoing;

import java.lang.reflect.Proxy;

/**
 * Created by Administrator on 2018/7/20.
 */
public class Main2 {
    public static void main(String[] args) {
        Class<?>[] classes=new Class[]{Doing.class};
        Class<?>[] classes2=new Class[]{BreakingShot.class};
        Object obj= Proxy.newProxyInstance(Main2.class.getClassLoader(),classes2,new ProxyDoing());
//        Doing doing=(Doing)obj;
//        doing.doSomething("fucking");
//        doing.doNothing();
        BreakingShot breakingShot=(BreakingShot)obj;
        breakingShot.rest();

    }
}
