package spi.interfaces.impl;

import spi.interfaces.Hit;

/**
 * Created by Zhan on 2018/5/23.
 */
public class Hitting implements Hit {
    @Override
    public String doHit(String name) {
        return "hit pool "+name+"!!!";
    }
}
