package thread.lock.spinLock;

import java.util.concurrent.atomic.AtomicReference;

/**
 * Created by Administrator on 2018/7/2.
 */
public class SpinLock {

    static AtomicReference<Runnable> atomicReference=new AtomicReference<>();


    public static void lock(){
        Thread t=Thread.currentThread();
        while (!(atomicReference.compareAndSet(null,t)));
    }

    public static void unlock(){
        Thread t=Thread.currentThread();
        atomicReference.compareAndSet(t,null);
    }
}
