package generic;

/**
 * Created by Administrator on 2018/4/10.
 */
public class TestObj2 {

    public static <A,V>Object print(ExObj<A,V> e){
        return e.getA()+",print";
    }

    public static String print2(ExObj<String,String> e){
        return "print2";
    }

    public static <A,V> V print3(ExObj<A,V> e){
        return e.getV();
    }

    public static <B,W>String print4(ExObj<B,W> e){
        return "print";
    }

    public  static <W,J,B,K>String print5(ExObj<B,W> e, ExObj2<J,K> e2){
        return "";
    }

    public  static <W,J,BF,K>BF print6(ExObj<BF,W> e, ExObj2<J,K> e2){
        return e.getA();
    }

    public static Object print7(ExObj<Parent,Son> e){
        return e.getA()+",print";
    }
    public static Object print8(ExObj<Son,Parent> e){
        return e.getA()+",print";
    }

    public static Object print9(ExObj<? extends Parent,? extends Parent> e){
        return e.getA()+",print";
    }

    public static Object print10(ExObj<? super Parent,? super Parent> e){
        return e.getA()+",print";
    }

    public static Object print11(ExObj<? super Son,? super Son> e){
        return e.getA()+",print";
    }
}


class Parent{
    private String parentStr;

    public Parent(String parentStr) {
        this.parentStr = parentStr;
    }

    public String getParentStr() {
        return parentStr;
    }

    public void setParentStr(String parentStr) {
        this.parentStr = parentStr;
    }
}

class Son extends Parent{
    private String sonStr;

    public Son(String sonStr) {
        super("parentStr");
        this.sonStr = sonStr;
    }

    public String getSonStr() {
        return sonStr;
    }

    public void setSonStr(String sonStr) {
        this.sonStr = sonStr;
    }
}


class ExObj3<J,K> {

    private J j;
    private K k;

    public ExObj3(J j, K k) {
        this.j = j;
        this.k = k;
    }

    public J getJ() {
        return j;
    }

    public void setJ(J j) {
        this.j = j;
    }

    public K getK() {
        return k;
    }

    public void setK(K k) {
        this.k = k;
    }
}


class ExObj2<J,K> {

    private J j;
    private K k;

    public ExObj2(J j, K k) {
        this.j = j;
        this.k = k;
    }

    public J getJ() {
        return j;
    }

    public void setJ(J j) {
        this.j = j;
    }

    public K getK() {
        return k;
    }

    public void setK(K k) {
        this.k = k;
    }
}

class ExObj<A,V>{
    private A a;
    private V v;

    public ExObj(A a, V v) {
        this.a = a;
        this.v = v;
    }

    public ExObj() {}

    public A getA() {
        return a;
    }

    public void setA(A a) {
        this.a = a;
    }

    public V getV() {
        return v;
    }

    public void setV(V v) {
        this.v = v;
    }
}