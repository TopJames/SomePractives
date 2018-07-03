package thread.threadPool;

import thread.threadPool.task.Task1;
import thread.threadPool.task.Task2;

import java.util.concurrent.*;

/**
 * Created by Administrator on 2018/7/2.
 */
public class RunThreadPoolExecutor1 {
    public static void main(String[] args) throws InterruptedException {
        Task2 task2=new Task2();

        ArrayBlockingQueue<Runnable> arrayBlockingQueue=new ArrayBlockingQueue<Runnable>(2);

        ThreadPoolExecutor tpe=
                new ThreadPoolExecutor(2,4,10, TimeUnit.SECONDS,arrayBlockingQueue,new RejectedExecutionHandler(){
                    @Override
                    public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
                        System.out.println("sorry,"+r.toString()+",can not be executor.");
                        System.out.print("because:");
                        print(executor);
                    }
                });
        print(tpe);
        tpe.submit(task2);
        print(tpe);
        tpe.submit(task2);
        print(tpe);
        tpe.submit(task2);
        print(tpe);
        tpe.submit(task2);
        print(tpe);
        tpe.submit(task2);
        print(tpe);
        tpe.submit(task2);
        print(tpe);
        tpe.submit(task2);
        print(tpe);

        Thread.sleep(15000);
        print(tpe);


    }

    static void print(ThreadPoolExecutor tpe){
        BlockingQueue<Runnable> blockingQueue=tpe.getQueue();
        System.out.println("active acount:"+tpe.getActiveCount()
                +",coreSize:"+tpe.getCorePoolSize()
                +",poolSize:"+tpe.getPoolSize()
                +",completed task:"+tpe.getCompletedTaskCount()
                +",queueSize:"+blockingQueue.size());
    }
}
