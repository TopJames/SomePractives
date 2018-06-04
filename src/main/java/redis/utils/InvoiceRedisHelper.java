package redis.utils;

import kryo.util.SerializeUtil;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;
import redis.entities.PrintableTicketDto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Administrator on 2018/6/4.
 */
public class InvoiceRedisHelper {
    private static final Jedis jedis=new Jedis("192.168.129.3",6379);

    private static final SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");

    public static void saveInvoiceData(String key,List<PrintableTicketDto> dataList){

        String sortedSetKey=key+"_sortedSet";
        String mapKey=key+"_mapKey";

        Pipeline pipeline=jedis.pipelined();
        try {
            pipeline.multi();
            for(PrintableTicketDto ptd:dataList){

                Date date=sdf.parse(ptd.getPrintableTicketcouopnList().get(0).getFlightDate());
                pipeline.zadd(sortedSetKey,date.getTime(),ptd.getTicketNo());
                pipeline.hset(SerializeUtil.serializeObj(mapKey),
                        SerializeUtil.serializeObj(ptd.getTicketNo()),
                        SerializeUtil.serializeObj(ptd));
            }
        } catch (ParseException e) {
            pipeline.discard();
        }finally {
            pipeline.exec();
            pipeline.sync();
        }
    }

    public static List<PrintableTicketDto> getNextPages(String key,int currentPage,int pageSize){

        return getPages(key,currentPage,pageSize,true);
    }


    public static List<PrintableTicketDto> getLastPages(String key,int currentPage,int pageSize){

        return getPages(key,currentPage,pageSize,false);
    }

    private static List<PrintableTicketDto> getPages(String key,int currentPage,
                                              int pageSize,boolean nextOrNot){

        String sortedSetKey=key+"_sortedSet";
        String mapKey=key+"_mapKey";

        long total=jedis.zcard(sortedSetKey);
        double caculate=((double)total)/pageSize;
        double temp=caculate-(int)caculate;
        int totalPages;
        if(temp==0){
            totalPages=(int)caculate;
        }else {
            totalPages=(int)caculate+1;
        }
        long start;
        long end;
        if(nextOrNot){
            if(currentPage==totalPages){
                return null;
            }else {
                start=currentPage*pageSize;
                end=start+pageSize;
                if(end>total){
                    end=total;
                }
            }
        }else {
            if(currentPage==totalPages){
                long finalCount=total%pageSize;
                start=total-finalCount-pageSize;
                end=total-finalCount;
            }else if(currentPage==1){
                return null;
            }else{
                start=(currentPage-2)*pageSize;
                end=(currentPage-1)*pageSize;
            }
        }

        Set<byte[]> invoiceSet=jedis.zrevrange(SerializeUtil.serializeObj(mapKey),start,end);
        Iterator<byte[]> iterator=invoiceSet.iterator();
        List<PrintableTicketDto> returnList=new ArrayList<>(invoiceSet.size());
        while (iterator.hasNext()){
            byte[] bytes=iterator.next();
            PrintableTicketDto ptd=SerializeUtil.deSerialize(bytes,PrintableTicketDto.class);
            returnList.add(ptd);
        }
        return returnList;
    }
}
