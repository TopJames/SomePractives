package pattern.singleton.byenum;

/**
 * Created by Administrator on 2018/5/28.
 */
public enum Singleton {

    INSTANCE(){
        @Override
        public void doing() {

        }
    },
    DEMO(){
        @Override
        public void doing() {
            get("DEMO");
        }
    },
    KK("haha"){
        @Override
        public void doing() {
            get(str);
        }
    }
    ;


    TrueMan trueMan;

    String str;

    Singleton(){
        System.out.println("调用了无参构造方法");
    }
    Singleton(String str){
        System.out.println("调用了有参构造方法");
        this.str=str;
    }

    public static void get(String name){
        System.out.println("get "+name);
    }

    public abstract void doing();
}
