package shutDownHook;

/**
 * Created by topJames on 2019/10/17.
 */
public class Hook1 {

    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("this is shutdown hook.");
            }
        });
        Runtime.getRuntime().addShutdownHook(t1);
        for(int i=0;i<3;i++){
            System.out.println("循环。。");
            Thread.sleep(1000);
        }
    }
}
