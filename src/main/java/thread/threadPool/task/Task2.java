package thread.threadPool.task;

/**
 * Created by Administrator on 2018/7/2.
 */
public class Task2 implements Runnable{
    @Override
    public void run() {
        for(int i=0;i<5;i++){
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
