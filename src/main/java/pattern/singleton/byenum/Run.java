package pattern.singleton.byenum;

/**
 * Created by Administrator on 2018/5/28.
 */
public class Run {
    public static void main(String[] args) {
        System.out.println(Singleton.DEMO);
        Singleton.DEMO.doing();
        System.out.println(Singleton.KK);
        Singleton.KK.doing();
    }
}
