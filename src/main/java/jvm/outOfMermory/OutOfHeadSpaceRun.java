package jvm.outOfMermory;

import java.util.ArrayList;
import java.util.List;

public class OutOfHeadSpaceRun {
    public static void main(String[] args) {
        List<TestCaes> list=new ArrayList<>();
        while (true){
            list.add(new TestCaes());
        }

    }
}

class TestCaes{

}