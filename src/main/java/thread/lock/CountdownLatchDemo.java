package thread.lock;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

/**
 * Created by Administrator on 2018/7/3.
 */
public class CountdownLatchDemo {

    public static void main(String[] args) {
        CountDownLatch countDownLatch=new CountDownLatch(3);
        Thread t1=new Thread(()->{
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            countDownLatch.countDown();
            System.out.println("t1 finished");
        });

        Thread t2=new Thread(()->{
            try {
                Thread.sleep(6000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            countDownLatch.countDown();
            System.out.println("t2 finished");
        });

        Thread t3=new Thread(()->{
            try {
                Thread.sleep(9000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            countDownLatch.countDown();
            System.out.println("t3 finished");
        });


        t1.start();t2.start();t3.start();


        try {
//            countDownLatch.await();
            countDownLatch.await(3, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("全部完成");
    }

}
