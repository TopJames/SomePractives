package redis;

import redis.entities.PrintableTicketDto;
import redis.utils.InvoiceRedisHelper;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2018/6/8.
 */
public class Run5 {
    public static void main(String[] args) {
        String key="invoiceKey";
        List<String> ticketList=new ArrayList<>();
        ticketList.add("789");
        ticketList.add("789");
        ticketList.add("787");
//        InvoiceRedisHelper.addToPrintList(key,ticketList);
        Object[] objects=InvoiceRedisHelper.getPrintListPage(key,1,5);
        List<PrintableTicketDto> returnList=(List)objects[0];
        returnList.stream().forEach(a -> {
            System.out.println(a.getPsgName()+","+a.getPrintableTicketcouopnList().get(0).getFlightDate());
        });
    }
}
