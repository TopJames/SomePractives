package spi.interfaces.impl;

import spi.interfaces.Search;

/**
 * Created by Zhan on 2018/5/23.
 */
public class DoSearch implements Search {
    @Override
    public String doSearch(String thing) {
        return "search for "+thing;
    }
}
