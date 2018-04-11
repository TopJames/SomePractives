package generic;

import java.util.ArrayList;
import java.util.List;


public class Test5 {

    public static void main(String[] args) {
        ExObj<String,String> e1=new ExObj<>("s","d");
        ExObj<Integer,Integer> e2=new ExObj<>(1,2);
        List list=new ArrayList<>();
        list.add(TestObj2.print2(e1));
   //     list.add(TestObj2.print2(e2)); //compile fail
        list.add(TestObj2.print(e1));
        list.add(TestObj2.print(e2));
        list.add(TestObj2.print3(e1));
        list.add(TestObj2.print3(e2));




        ExObj<Parent,Son> e3=new ExObj<>(new Parent("p1"),new Son("son1"));
        ExObj<Son,Parent> e4=new ExObj<>(new Son("son2"),new Parent("p2"));

        list.add(TestObj2.print(e3));
        list.add(TestObj2.print(e4));

        list.add(TestObj2.print7(e3));
//        TestObj2.print7(e4);

//        TestObj2.print8(e3);
        list.add(TestObj2.print8(e4));

        list.add(TestObj2.print9(e3));
        list.add(TestObj2.print9(e4));

//        TestObj2.print10(e3);
//        TestObj2.print10(e4);

        list.add(TestObj2.print11(e3));
        list.add(TestObj2.print11(e4));

        for(Object obj:list){
            System.out.println(obj);
        }
    }
}
