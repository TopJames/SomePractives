package innerClass;

/**
 * Created by Administrator on 2018/5/31.
 */
public class Run1 {
    public static void main(String[] args) {
      Outer outer=new Outer();
      Outer.Inner inner=outer.new Inner();
      Outer.InnerStatic innerStatic=new Outer.InnerStatic();
      System.out.println(inner.innerName);
      System.out.println(innerStatic.fatherName);
      System.out.println(Outer.InnerStatic.innerStaticNameStatic);
        outer.print();
    }
}
