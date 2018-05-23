package spi.tools;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ServiceLoader;

/**
 * Created by Zhan on 2018/5/23.
 */
public class RunSpiImpl<O> {

    public  List<O> run(Class clazz){
        ServiceLoader<O> sl=ServiceLoader.load(clazz);
        Iterator<O> it=sl.iterator();
        List<O> list=new ArrayList<>();
        while (it.hasNext()){
            O o=it.next();
            list.add(o);
        }
        return list;
    }
}
