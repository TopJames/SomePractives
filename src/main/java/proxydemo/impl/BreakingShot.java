package proxydemo.impl;

import proxydemo.Shotting;

/**
 * Created by Administrator on 2018/5/14.
 */
public class BreakingShot implements Shotting {
    @Override
    public String shot(String name) {
        name="shotting "+name+"'s mouths.";
        System.out.println(name);
        return name;
    }

    @Override
    public void rest() {
        System.out.println("get some rest....");
    }
}
