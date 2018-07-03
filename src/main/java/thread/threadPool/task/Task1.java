package thread.threadPool.task;

/**
 * Created by Administrator on 2018/7/2.
 */
public class Task1 implements Runnable{
    @Override
    public void run() {
        for(int i=0;i<5;i++){
            Thread t=Thread.currentThread();
            System.out.println(t.getName()+"::::print:"+i);
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
