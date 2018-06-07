package redis.utils;

import kryo.util.SerializeUtil;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;
import redis.entities.PrintableTicketDto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by Administrator on 2018/6/4.
 */
public class InvoiceRedisHelper {
    private static final Jedis jedis=new Jedis("192.168.129.3",6379);
    private static final SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
    private static final String SORTED_SET_KEY_SUFFIX="_sortedSet";
    private static final String MAP_KEY_SUFFIX="_mapKey";
    private static final String NAME_MAP_KEY_SUFFIX="_nameMapKey";
    private static final String NAME_SORTED_SET_KEY_SUFFIX="_nameSortedSet";
    private static final String TICKET_PRINT_SET_KEY_SUFFIX="_ticketPrintSet";
    private static final String INVOICE_LOGIN_KEYS_SET="INVOICE_LOGIN_KEYS_SET";
    private static final String SPLIT="#";


    private static void deleteByKey(String key){
        String keysStr=jedis.hget(INVOICE_LOGIN_KEYS_SET,key);
        if(keysStr==null)return;
        Pipeline pipeline=jedis.pipelined();
        String[] keyArray=keysStr.split(SPLIT);
        for(String keyStr:keyArray){
            if(keyStr.contains(MAP_KEY_SUFFIX)){
                pipeline.del(SerializeUtil.serializeObj(keyStr));
            }else {
                pipeline.del(keyStr);
            }
        }
        pipeline.hdel(INVOICE_LOGIN_KEYS_SET,key);

        pipeline.sync();

    }

    public static void saveInvoiceData(String key,List<PrintableTicketDto> dataList){

        deleteByKey(key);

        String sortedSetKey=key+SORTED_SET_KEY_SUFFIX;
        String mapKey=key+MAP_KEY_SUFFIX;
        String nameMapKey=key+NAME_MAP_KEY_SUFFIX;


        Pipeline pipeline=jedis.pipelined();
        Map<String,String> tempMap=new HashMap<>();
        addKey(key,new String[]{sortedSetKey,mapKey,nameMapKey});
        try {
            pipeline.multi();
            for(PrintableTicketDto ptd:dataList){

                Date date=sdf.parse(ptd.getPrintableTicketcouopnList().get(0).getFlightDate());
                pipeline.zadd(sortedSetKey,date.getTime(),ptd.getTicketNo());
                pipeline.hset(SerializeUtil.serializeObj(mapKey),
                        SerializeUtil.serializeObj(ptd.getTicketNo()),
                        SerializeUtil.serializeObj(ptd));
                if(tempMap.containsKey(ptd.getPsgName())){
                    String ticketStr=tempMap.get(ptd.getPsgName());
                    ticketStr=ticketStr+SPLIT+ptd.getTicketNo();
                    tempMap.put(ptd.getPsgName(),ticketStr);
                }else{
                    tempMap.put(ptd.getPsgName(),ptd.getTicketNo());
                }

            }

            Iterator<Map.Entry<String,String>> iterator=tempMap.entrySet().iterator();
            while(iterator.hasNext()){
                Map.Entry<String,String> entry=iterator.next();
                pipeline.hset(nameMapKey,entry.getKey(),entry.getValue());
            }

            pipeline.exec();
        } catch (ParseException e) {
            pipeline.discard();
            deleteByKey(key);
        }finally {
            pipeline.sync();
        }
    }

    public static Object[] getPages(String key,int currentPage, int pageSize){

        String sortedSetKey=key+SORTED_SET_KEY_SUFFIX;
        String mapKey=key+MAP_KEY_SUFFIX;

        byte[] mapKeyBytes=SerializeUtil.serializeObj(mapKey);

        long total=jedis.zcard(sortedSetKey);
        double caculate=((double)total)/pageSize;
        double temp=caculate-(int)caculate;
        int totalPages;
        if(temp==0){
            totalPages=(int)caculate;
        }else {
            totalPages=(int)caculate+1;
        }
        if(currentPage>totalPages||currentPage==0){
            return null;
        }
        long start=(currentPage-1)*pageSize;
        long end=currentPage*pageSize-1;
        if(end>(total-1)){
            end=total-1;
        }

        Set<String> ticketSet=jedis.zrevrange(sortedSetKey,start,end);
        Iterator<String> iterator=ticketSet.iterator();
        List<PrintableTicketDto> returnList=new ArrayList<>(ticketSet.size());
        Pipeline pipeline=jedis.pipelined();
        while (iterator.hasNext()){
            String ticketNo=iterator.next();
            pipeline.hget(mapKeyBytes,SerializeUtil.serializeObj(ticketNo));
        }
        List<Object> dataList=pipeline.syncAndReturnAll();
        for(Object obj:dataList){
            byte[] bytes=(byte[])obj;
            PrintableTicketDto ptd=SerializeUtil.deSerialize(bytes,PrintableTicketDto.class);
            returnList.add(ptd);
        }
        return new Object[]{returnList,total,totalPages,currentPage};
    }

    public static Object[] getPageByName(String key,String name,int currentPage, int pageSize){

        String mapKey=key+MAP_KEY_SUFFIX;
        String nameMapKey=key+NAME_MAP_KEY_SUFFIX;
        String sortedSetKey=key+SORTED_SET_KEY_SUFFIX;
        String nameSortedSetKey=key+"_"+name+NAME_SORTED_SET_KEY_SUFFIX;
        byte[] mapKeyBytes=SerializeUtil.serializeObj(mapKey);

        Pipeline pipeline=jedis.pipelined();

        if(jedis.zcard(nameSortedSetKey)==0){
            try{
                String ticketNos=jedis.hget(nameMapKey,name);
                if(ticketNos==null||"".equals(ticketNos)){
                    return null;
                }

                addKey(key,new String[]{nameSortedSetKey});

                String[] ticketNoArray=ticketNos.split(SPLIT);

                for (String ticketNo:ticketNoArray){
                    pipeline.zscore(sortedSetKey,ticketNo);
                }

                List<Object> scoreList=pipeline.syncAndReturnAll();
                int length=ticketNoArray.length;
                for (int i=0;i<length;i++){
                    pipeline.zadd(nameSortedSetKey,(double)scoreList.get(i),ticketNoArray[i]);
                }
                pipeline.sync();
            }catch (Exception e){
                deleteByKey(key);
            }
        }

        long total=jedis.zcard(nameSortedSetKey);
        double caculate=((double)total)/pageSize;
        double temp=caculate-(int)caculate;
        int totalPages;
        if(temp==0){
            totalPages=(int)caculate;
        }else {
            totalPages=(int)caculate+1;
        }
        if(currentPage>totalPages||currentPage==0){
            return null;
        }
        long start=(currentPage-1)*pageSize;
        long end=currentPage*pageSize-1;
        if(end>(total-1)){
            end=total-1;
        }

        Set<String> ticketSet=jedis.zrevrange(nameSortedSetKey,start,end);
        Iterator<String> iterator=ticketSet.iterator();
        List<PrintableTicketDto> returnList=new ArrayList<>(ticketSet.size());
        while (iterator.hasNext()){
            String ticketNo=iterator.next();
            pipeline.hget(mapKeyBytes,SerializeUtil.serializeObj(ticketNo));
        }
        List<Object> dataList=pipeline.syncAndReturnAll();
        for(Object obj:dataList){
            byte[] bytes=(byte[])obj;
            PrintableTicketDto ptd=SerializeUtil.deSerialize(bytes,PrintableTicketDto.class);
            returnList.add(ptd);
        }
        return new Object[]{returnList,total,totalPages,currentPage};
    }

    private static void addKey(String key,String[] subKeys){
        String keysStr=jedis.hget(INVOICE_LOGIN_KEYS_SET,key);
        StringBuffer sb=new StringBuffer();
        for (String subkey:subKeys){
            sb.append(subkey);
            sb.append(SPLIT);
        }
        if(keysStr==null){
            keysStr=sb.toString();
        }else {
            keysStr=keysStr+sb.toString();
        }
        jedis.hset(INVOICE_LOGIN_KEYS_SET,key,keysStr);
    }

    public static boolean ifKeyExit(String key){
        String keysStr=jedis.hget(INVOICE_LOGIN_KEYS_SET,key);
        if(keysStr==null){
            return false;
        }else {
            return true;
        }
    }


    public static void addToPrintList(String key,List<String> ticketList){
        String printKey=key+TICKET_PRINT_SET_KEY_SUFFIX;
        String sortedSetKey=key+SORTED_SET_KEY_SUFFIX;
        String keysStr=jedis.hget(INVOICE_LOGIN_KEYS_SET,key);

        if(!keysStr.contains(printKey)) addKey(key,new String[]{printKey});

        Pipeline pipeline=jedis.pipelined();

        ticketList=ticketList.stream().distinct().collect(Collectors.toList());
        ticketList.stream().forEach(ticketNo -> pipeline.zscore(sortedSetKey,ticketNo));

        List<Object> scoreList=pipeline.syncAndReturnAll();

        int length=ticketList.size();

        for(int i=0;i<length;i++){
            pipeline.zadd(printKey,(double)scoreList.get(i),ticketList.get(i));
        }
        pipeline.sync();

    }

    public static void removeFromPrintList(String key,List<String> ticketList){
        String printKey=key+TICKET_PRINT_SET_KEY_SUFFIX;
        Pipeline pipeline=jedis.pipelined();
        ticketList.stream().forEach(ticketNo -> pipeline.zrem(printKey,ticketNo));
        pipeline.sync();
    }

    public static Object[] getPrintListPage(String key,int currentPage, int pageSize){

        String mapKey=key+MAP_KEY_SUFFIX;
        String printKey=key+TICKET_PRINT_SET_KEY_SUFFIX;

        byte[] mapKeyBytes=SerializeUtil.serializeObj(mapKey);

        long total=jedis.zcard(printKey);
        double caculate=((double)total)/pageSize;
        double temp=caculate-(int)caculate;
        int totalPages;
        if(temp==0){
            totalPages=(int)caculate;
        }else {
            totalPages=(int)caculate+1;
        }
        if(currentPage>totalPages||currentPage==0){
            return null;
        }
        long start=(currentPage-1)*pageSize;
        long end=currentPage*pageSize-1;
        if(end>(total-1)){
            end=total-1;
        }


        Set<String> ticketSet=jedis.zrevrange(printKey,start,end);
        Iterator<String> iterator=ticketSet.iterator();
        List<PrintableTicketDto> returnList=new ArrayList<>(ticketSet.size());
        Pipeline pipeline=jedis.pipelined();
        while (iterator.hasNext()){
            String ticketNo=iterator.next();
            pipeline.hget(mapKeyBytes,SerializeUtil.serializeObj(ticketNo));
        }
        List<Object> dataList=pipeline.syncAndReturnAll();

        double amount=0;

        for(Object obj:dataList){
            byte[] bytes=(byte[])obj;
            PrintableTicketDto ptd=SerializeUtil.deSerialize(bytes,PrintableTicketDto.class);
            amount=amount+Double.valueOf(ptd.getAmount());
            returnList.add(ptd);
        }
        return new Object[]{returnList,total,totalPages,amount,currentPage};

    }
}
