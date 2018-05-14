package proxydemo;

import proxydemo.impl.BreakingShot;
import proxydemo.proxy.ProxyHandler;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Proxy;

/**
 * Created by Administrator on 2018/5/14.
 */
public class Main1 {
    public static void main(String[] args) {

        Shotting shotObj=new BreakingShot();

        ProxyHandler ph=new ProxyHandler(shotObj);

        Object obj= Proxy.newProxyInstance(ProxyHandler.class.getClassLoader(),new Class[]{Shotting.class},ph);

       Class[] classes= obj.getClass().getInterfaces();
        for(Class clazz:classes){
            System.out.println("class name:"+clazz.getName());
        }

        Shotting shot=(Shotting)obj;

        shot.rest();

        Field[] fields= ph.getClass().getDeclaredFields();
        for(Field field:fields){
            System.out.println("field:"+field.getName()+",type:"+field.getType().getName());
            Annotation[] annotations=field.getAnnotations();
            for (Annotation annotation:annotations){
                System.out.println("annotation:"+annotation.toString());
            }
        }


        System.out.println("result:"+shot.shot("beauty"));
    }
}
