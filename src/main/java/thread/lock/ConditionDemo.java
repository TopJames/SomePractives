package thread.lock;

import java.util.Queue;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Created by Administrator on 2018/7/3.
 */
public class ConditionDemo {

    public static void main(String[] args) {

        ConditionDemo conditionDemo=new ConditionDemo();
        Thread t1=new Thread(()->{
            while (true) try {
                conditionDemo.put();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        Thread t2=new Thread(()->{
            while (true) try {
                conditionDemo.take();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        t1.start();
        t2.start();
    }


    Lock lock=new ReentrantLock();
    Condition isNull=lock.newCondition();
    Condition isFull=lock.newCondition();
    Queue<String> queue=new ArrayBlockingQueue<String>(10);
//    AtomicInteger length=new AtomicInteger(0);

    public void put() throws InterruptedException {
        lock.lock();
        try {

            if(queue.size()==10){
                isFull.await();
            }
            queue.offer("ball");
            System.out.println("put:ball");
            isNull.signal();
        }catch (Exception e){

        }finally {
            lock.unlock();
        }


    }

    public void take() throws InterruptedException {
        lock.lock();
        try {

            if(0==queue.size()){
                isNull.await();
            }

            System.out.println("take:"+queue.poll());
            isFull.signal();
        }catch (Exception e){

        }finally {
            lock.unlock();
        }
    }

}
