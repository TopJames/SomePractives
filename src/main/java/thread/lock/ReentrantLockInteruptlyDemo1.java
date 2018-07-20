package thread.lock;

import java.util.concurrent.locks.ReentrantLock;

/**
 * Created by Zhan on 2018/7/4.
 */
public class ReentrantLockInteruptlyDemo1 {
    public static void main(String[] args) throws InterruptedException {

        ReentrantLock lock=new ReentrantLock();

        Thread t1=new Thread(()->{
            System.out.println("t1 get lock");
            lock.lock();
        },"t1");
        Thread t2=new Thread(()->{
            System.out.println(lock.tryLock());
            System.out.println("failure.");
            try {
                lock.lockInterruptibly();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("interrupt!");
        },"t2");
        t1.start();
        Thread.sleep(1000);
        t2.start();

        Thread.sleep(5000);
        System.out.println("t2 status:"+t2.getState());
        t2.interrupt();
    }
}
