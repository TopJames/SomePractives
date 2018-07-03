package thread.lock;

import thread.lock.spinLock.SpinLock;

/**
 * Created by Administrator on 2018/7/2.
 */
public class Demo1 {
    public static void main(String[] args) throws InterruptedException {

        Thread t1=new Thread(()->{
//            Demo1.doing();
            Demo1.doing2();
        },"t1");
        Thread t2=new Thread(()->{
//            Demo1.doing();
            Demo1.doing2();
        },"t2");
        t1.start();
        t2.start();

        System.out.println("t1:"+t1.getState()+",t2:"+t2.getState());

        Thread.sleep(5000);

        System.out.println("t1:"+t1.getState()+",t2:"+t2.getState());

        t1.join();
        t2.join();

        System.out.println("t1:"+t1.getState()+",t2:"+t2.getState());


    }




    public static synchronized void doing(){
        Thread t=Thread.currentThread();
        for (int i=0;i<20;i++){
            System.out.println(t.getName()+":is running...");
        }

        try {
            System.out.println(t.getName()+":is sleeping...");
            Thread.sleep(20000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    public static void doing2(){
        SpinLock.lock();
        Thread t=Thread.currentThread();
        for (int i=0;i<20;i++){
            System.out.println(t.getName()+":is running...");
        }

        try {
            System.out.println(t.getName()+":is sleeping...");
            Thread.sleep(20000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        SpinLock.unlock();
    }

}
