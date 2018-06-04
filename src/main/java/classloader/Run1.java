package classloader;

/**
 * Created by Administrator on 2018/6/4.
 */
public class Run1 {
    public static void main(String[] args) throws ClassNotFoundException, IllegalAccessException, InstantiationException {
        ClassLoader cl=Run1.class.getClassLoader();
        ClassLoader clp=cl.getParent();
        ClassLoader clpp=clp.getParent();
//        ClassLoader clppp=clpp.getParent();
        System.out.println("this loader:"+cl);
        System.out.println("this loader p:"+clp);
        System.out.println("this loader pp:"+clpp);
//        System.out.println("this loader ppp:"+clppp);

//        Class clazz=Class.forName("classloader.DoingImpl",true,clp);
        Class clazz=Class.forName("classloader.DoingImpl",true,cl);
        Class clazz1=Class.forName("classloader.DoingImpl",true,cl);
        Object obj= clazz.newInstance();
        Object obj1=clazz1.newInstance();
        Doing doing=(Doing)obj;
        Doing doing1=(Doing)obj1;
        System.out.println(doing.doSomething());
        System.out.println(doing1.doSomething());

    }
}
