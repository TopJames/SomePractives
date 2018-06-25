package jvm.outOfMermory;

/**
 * Created by Administrator on 2018/6/22.
 */
public class OutOfStackRun {

    public static void main(String[] args) {
        StackCase sc=new StackCase();
        try{
            sc.doing();
        }catch (Exception e){
            System.out.println("exception stack length:"+sc.count);
        //    e.printStackTrace();
        }catch (Error error){
            System.out.println("error stack length:"+sc.count);
          //  error.printStackTrace();
        }
    }
}

class StackCase{

    int count;

    void doing(){
        count++;
        doing();
    }

}
