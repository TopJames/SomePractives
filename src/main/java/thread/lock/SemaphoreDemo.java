package thread.lock;

import java.util.concurrent.Semaphore;

/**
 * Created by Administrator on 2018/7/3.
 */
public class SemaphoreDemo {
    public static void main(String[] args) {
        Semaphore semaphore=new Semaphore(2);
        Thread t1=new Thread(()->{
            try {
          //      semaphore.acquire();
                semaphore.acquire(semaphore.availablePermits());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("t1 enter");

            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
//            semaphore.release();
//            semaphore.release();
//            semaphore.release();
            semaphore.release(2);
        });
        Thread t2=new Thread(()->{
            try {
                semaphore.acquire();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("t2 enter");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            semaphore.release();
        });
        Thread t3=new Thread(()->{
            try {
                semaphore.acquire();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println("t3 enter");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            semaphore.release();
        });

        t1.start();t2.start();t3.start();

    }


}
