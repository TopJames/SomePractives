package thread.threadLocal;

import java.util.concurrent.FutureTask;
import java.util.concurrent.TimeUnit;

/**
 * Created by Administrator on 2018/6/20.
 */
public class Run1 {
    public static void main(String[] args) throws Exception {
        Task task1=new Task();
        Task task2=new Task();
        FutureTask<String> futureTask1=new FutureTask<>(task1);
        FutureTask<String> futureTask2=new FutureTask<>(task1);
        Thread t1=new Thread(futureTask1,"t1");
        Thread t2=new Thread(futureTask2,"t2");

        task1.threadLocal.set("aa");


        t1.start();
        TimeUnit.SECONDS.sleep(1);
        t2.start();



        System.out.println(task1.threadLocal.get());




    }
}
