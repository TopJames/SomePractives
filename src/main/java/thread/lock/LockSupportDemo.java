package thread.lock;

import java.util.concurrent.locks.LockSupport;

/**
 * Created by Zhan on 2018/7/5.
 */
public class LockSupportDemo {
    public static void main(String[] args) {

        Thread thread=Thread.currentThread();

        Thread t1=new Thread(()->{
            Thread t=Thread.currentThread();
            try {
                Thread.sleep(5000);
                LockSupport.unpark(t);
                System.out.println("release");
                Thread.sleep(3000);
                LockSupport.unpark(thread);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        },"t1");

        t1.start();
        LockSupport.park(thread);
        System.out.println("yyyyyyyyy");
        LockSupport.park(thread);
        System.out.println("cccccccc");
    }
}
