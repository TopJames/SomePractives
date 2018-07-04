package thread.lock;

import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

/**
 * Created by Zhan on 2018/7/4.
 */
public class CyclicBarrierDemo {
    public static void main(String[] args) throws BrokenBarrierException, InterruptedException {
        CyclicBarrier cyclicBarrier=new CyclicBarrier(3);
        Thread t1=new Thread(()->{
            try {
                cyclicBarrier.await();
                System.out.println("t1 finished");
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
            }
        },"t1");

        t1.start();
        cyclicBarrier.await();

        System.out.println("all done!");
    }
}
