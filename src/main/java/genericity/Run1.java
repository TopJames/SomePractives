package genericity;


import java.util.TreeMap;

/**
 * Created by Administrator on 2018/5/31.
 */
public class Run1 {
    public static void main(String[] args) {
        GenericityMethod gm=new GenericityMethod();
        System.out.println(gm.doing(GIImpl.class));
        System.out.println(gm.doing(GIInterface.class));
    }
}
