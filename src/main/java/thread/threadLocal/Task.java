package thread.threadLocal;

import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

/**
 * Created by Administrator on 2018/6/20.
 */
public class Task implements Callable<String>{

    ThreadLocal<String> threadLocal=new ThreadLocal<>();
    String name="";


    @Override
    public String call() throws Exception {
        String threadName=Thread.currentThread().getName();
        name=threadName;
        threadLocal.set(threadName);
        System.out.println("this is ThreadLoacal :"+threadLocal.get()+",name:"+name);
        return threadLocal.get();
    }
}
