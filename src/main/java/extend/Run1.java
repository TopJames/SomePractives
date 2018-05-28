package extend;

/**
 * Created by Administrator on 2018/5/28.
 */
public class Run1 {
    public static void main(String[] args) {
        TFather1 tf1=new TFather1();
        System.out.println(tf1.get("tom"));
        TFather1 tf2=new TSon1();
        System.out.println(tf2.get("tom"));
    }
}
