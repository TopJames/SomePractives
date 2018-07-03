package thread.other;

/**
 * Created by Administrator on 2018/7/2.
 */
public class InteruptDemo {

    public static void main(String[] args) throws InterruptedException {
        Thread t1=new Thread(()->{
            Thread t=Thread.currentThread();
            while (true){
//                try {
//                    Thread.sleep(2000);
//                } catch (InterruptedException e) {
//                    e.printStackTrace();
//                }
                System.out.println("interupt?:::"+t.isInterrupted());
            }
        });
        t1.start();

        Thread.sleep(4000);
        t1.interrupt();
        System.out.println("==============================================");

        while (true){}
    }

}
