package innerClass;

/**
 * Created by Administrator on 2018/5/31.
 */
public class Outer  extends Father implements DemoInterface{

    static String outerNameStatic="outerNameStatic";

    String outerName="outerName";

    private String outerNamePrivate="outerNamePrivate";

    String innerStaticString=InnerStatic.innerStaticNameStatic;
    Inner inner=new Inner();
    public void print(){
        System.out.println(inner.innerNamePrivate);
    }

    @Override
    public void print(String name) {

    }

    class Inner extends Father implements DemoInterface{
        String innerName=outerName+",innerName";
        private String innerNamePrivate=outerNamePrivate+",innerNamePrivate";
        String innerNameStatic=outerNameStatic;

        @Override
        public void print(String name) {

        }
        //    static String innerNameStaticStatic=outerNameStatic;//编译不过
    }

    static class InnerStatic extends Father implements DemoInterface{
//        String innerStaticName=outerName;//编译不过
        String innerStaticName=outerNameStatic;
        static String innerStaticNameStatic=outerNameStatic;

        @Override
        public void print(String name) {

        }
    }
}
