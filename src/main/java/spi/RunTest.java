package spi;


import spi.interfaces.Hit;
import spi.interfaces.Search;
import spi.tools.RunSpiImpl;

import java.util.List;

/**
 * Created by Zhan on 2018/5/23.
 */
public class RunTest {
    public static void main(String[] args) {
        RunSpiImpl<Search> rsi=new RunSpiImpl<>();
        List<Search> list=rsi.run(Search.class);
        for (Search s:list){
            System.out.println(s.doSearch("big tips"));
        }

        RunSpiImpl<Hit> rsi1=new RunSpiImpl<>();
        List<Hit> list1=rsi1.run(Hit.class);
        for (Hit h:list1){
            System.out.println(h.doHit("Obama"));
        }

    }
}
