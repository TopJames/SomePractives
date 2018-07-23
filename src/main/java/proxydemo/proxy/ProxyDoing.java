package proxydemo.proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 * Created by Administrator on 2018/7/20.
 */
public class ProxyDoing implements InvocationHandler {
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        System.out.println("proxy obj name:"+proxy.getClass().getName());
        System.out.println("method name:"+method.getName());
        if(args!=null&&args.length!=0){
            System.out.println("args:"+args[0]);
        }else {
            System.out.println("args:null");
        }


        return null;
    }
}
