package basic.outOfMemory;

/**
 * Created by Administrator on 2018/7/10.
 */
public class OutOfStackRun {
    public static void main(String[] args) {
        OutOfStackRun outOfStackRun=new OutOfStackRun();
        try{
            outOfStackRun.doing();
        }catch (Error e){
            e.printStackTrace();
            System.out.println("long:"+e.getStackTrace().length+",or:"+outOfStackRun.count+",cause:"+e.getMessage());
        }
    }

    int count=0;

    public void doing(){
        count++;
        doing();
    }
}
