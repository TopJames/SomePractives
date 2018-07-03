package thread.threadPool;

import thread.threadPool.task.Task1;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by Administrator on 2018/7/2.
 */
public class RunFixedThread1 {

    public static void main(String[] args) {

//        Thread t1=new Thread(new Task1(),"t1");
//        Thread t2=new Thread(new Task1(),"t2");
//        Thread t3=new Thread(new Task1(),"t3");

        Task1 task1=new Task1();

        ExecutorService executorService= Executors.newFixedThreadPool(2);
//        executorService.submit(new Task1());
//        executorService.submit(new Task1());
//        executorService.submit(new Task1());

        for (int i=0;i<20;i++){
            executorService.submit(task1);
        }


        executorService.shutdown();
    }
}
