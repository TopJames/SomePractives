package interceptor_filter_listener_boot.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Administrator on 2018/6/6.
 */
@RestController
public class Entrance {

    @RequestMapping("/yeye")
    public String yeye(@RequestParam String name){
        return "yeye,"+name;
    }
}
