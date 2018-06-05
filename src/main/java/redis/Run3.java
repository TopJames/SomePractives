package redis;


import redis.entities.PrintableTicketCouopn;
import redis.entities.PrintableTicketDto;
import redis.utils.InvoiceRedisHelper;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2018/6/4.
 */
public class Run3 {
    public static void main(String[] args) {
        List<PrintableTicketDto> dataList1=new ArrayList<>();
        for(int i=0;i<10;i++){
            PrintableTicketDto ptd=new PrintableTicketDto();
            ptd.setTicketNo("78"+i);
            if(i%2==0){
                ptd.setPsgName("tom");
            }else {
                ptd.setPsgName("jim");
            }
            PrintableTicketCouopn ptc=new PrintableTicketCouopn();
            ptc.setFlightDate("2018-12-1"+i);
            ptd.getPrintableTicketcouopnList().add(ptc);
            dataList1.add(ptd);
        }
        InvoiceRedisHelper.saveInvoiceData("invoiceKey",dataList1);

//        List<PrintableTicketDto> dataList2=InvoiceRedisHelper.getNextPages("invoiceKey",2,4);
//        Object[] objArray=InvoiceRedisHelper.getPages("invoiceKey",3,4);
        Object[] objArray=InvoiceRedisHelper.getPageByName("invoiceKey","tom",1,2);
        List<PrintableTicketDto> dataList2=(List<PrintableTicketDto>)objArray[0];
        for(PrintableTicketDto ptd:dataList2){
            System.out.println("tickno:"+ptd.getTicketNo());
            System.out.println("flightDate:"+ptd.getPrintableTicketcouopnList().get(0).getFlightDate());
        }
    }
}
