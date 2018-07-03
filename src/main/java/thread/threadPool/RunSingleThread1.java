package thread.threadPool;

import thread.threadPool.task.Task1;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

/**
 * Created by Administrator on 2018/7/2.
 */
public class RunSingleThread1 {
    public static void main(String[] args) throws InterruptedException {
        Task1 task1=new Task1();
        ExecutorService executorService= Executors.newSingleThreadExecutor();

        for (int i=0;i<5;i++){
            executorService.submit(task1);
        }

        executorService.shutdown();
    }
}
