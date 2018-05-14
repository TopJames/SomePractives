package proxydemo.proxy;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 * Created by Administrator on 2018/5/14.
 */
public class ProxyHandler implements InvocationHandler {

    private Object proxyedObj;

    public ProxyHandler(Object proxyedObj){
        this.proxyedObj=proxyedObj;
    }


    @Override
    public String invoke(Object proxy, Method method, Object[] args) throws Throwable {


        System.out.println("proxy name:"+proxy.getClass().getName());
        Field[] fields= proxy.getClass().getDeclaredFields();
        for(Field field:fields){
            System.out.println("field:"+field.getName()+",type:"+field.getType().getName());
        }
        Method[] methods=proxy.getClass().getDeclaredMethods();
        for(Method method1:methods){
            System.out.println("methodName:"+method1.getName()+",ReturnType:"+method1.getReturnType().getName()
                +",annotationReturnType:"+method1.getAnnotatedReturnType().getType().getTypeName()
            );
        }
        System.out.println("proxy ");
        System.out.println("before real method.");


        Object result=null;
        if(args!=null){
            String arg=(String)args[0];

            System.out.println("arg:"+arg);
            String newArg="new_"+arg;

            result=method.invoke(proxyedObj,newArg);
        }else {
            result=method.invoke(proxyedObj);
        }

        String typeName=method.getAnnotatedReturnType().getType().getTypeName();

        System.out.println("return type name:"+typeName);

        System.out.println("return:"+result);

        String res="";

        if(result != null){
            res=(String)result;
        }

        System.out.println("after real method");


        return res;
    }
}
