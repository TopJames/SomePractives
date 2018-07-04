package thread.lock;

import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.Stack;
import java.util.concurrent.ArrayBlockingQueue;

/**
 * Created by Administrator on 2018/7/4.
 */
public class Demo2 {

    public static void main(String[] args) {

        Demo2 demo2=new Demo2();

        Thread t1=new Thread(()->{
            while (true) try {
                demo2.put();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        },"t1");
        Thread t2=new Thread(()->{
            while (true) try {
                demo2.take();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        },"t2");
        t1.start();
        t2.start();

    }

    Stack<String> stack=new Stack<>();
    Queue<String> queue=new ArrayBlockingQueue<String>(10);

    public synchronized void put() throws InterruptedException {
        if(10==queue.size()){
            System.out.println("is full...");
            this.wait();
        }

        queue.offer("ball");
        this.notifyAll();
    }

    public synchronized void take() throws InterruptedException {
        if(0==queue.size()){
            System.out.println("is null...");
            this.wait();
        }
        queue.poll();

        this.notifyAll();
    }
}
