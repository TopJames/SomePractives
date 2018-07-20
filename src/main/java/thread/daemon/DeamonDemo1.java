package thread.daemon;

/**
 * Created by Zhan on 2018/7/4.
 */
public class DeamonDemo1 {
    public static void main(String[] args) throws InterruptedException {
        Thread t1=new Thread(()->{
            try {
                while (!Thread.currentThread().isInterrupted()){

//                    Thread.sleep(2000);
                    System.out.println("this is daemon.");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

        },"t1");
        Thread t2=new Thread(()->{
            t1.setDaemon(true);
            try {
                while (!Thread.currentThread().isInterrupted()){

//                    Thread.sleep(2000);
                    System.out.println("this is main.");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        },"t2");

        t2.start();

        Thread.sleep(1000);

        t1.start();
        try {
            Thread.sleep(8000);
            t1.interrupt();
            System.out.println("main end");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
