package thread.threadPool;

import thread.threadPool.task.Task1;

import java.util.concurrent.*;

/**
 * Created by Administrator on 2018/7/2.
 */
public class RunScheduledThread1 {
    public static void main(String[] args) throws InterruptedException {
        Task1 task1=new Task1();
        ScheduledExecutorService scheduledExecutorService= Executors.newScheduledThreadPool(2);

        ThreadPoolExecutor threadPoolExecutor=(ThreadPoolExecutor)scheduledExecutorService;

        System.out.println("thread nums:"+threadPoolExecutor.getPoolSize());

        for (int i=0;i<1;i++){
            scheduledExecutorService.scheduleAtFixedRate(task1,5,6, TimeUnit.SECONDS);

        }
        System.out.println("thread nums:"+threadPoolExecutor.getPoolSize());

        Thread.sleep(70000);

        System.out.println("thread nums:"+threadPoolExecutor.getPoolSize());

        scheduledExecutorService.shutdown();
    }
}
