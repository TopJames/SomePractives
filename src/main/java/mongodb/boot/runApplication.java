package mongodb.boot;

import mongodb.boot.entity.InvoiceMsgSend;
import org.bson.Document;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.*;


@EnableAutoConfiguration
@PropertySource("classpath:runApplication.yml")
//@ComponentScan
public class runApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext ca=SpringApplication.run(runApplication.class,args);
        MongoTemplate mt=(MongoTemplate)ca.getBean("mongoTemplate");

        List<InvoiceMsgSend> list=new ArrayList<>();
        InvoiceMsgSend ims=new InvoiceMsgSend();
        InvoiceMsgSend ims2=new InvoiceMsgSend();
        ims.setAmount("2300").setChannel("b2c").setBusinessType("S")
                .setCheckCode("tr").setCreationTime(new Date())
                .setEmail("asd@asd.asd").setFfpCardNo("2323232")
                .setPsgName("llkk").setTicketNo("78444ahaha44444");
        ims2.setAmount("2100").setChannel("bqwewqc").setBusinessType("w")
                .setCheckCode("tr").setCreationTime(new Date())
                .setEmail("asd@asd.asd").setFfpCardNo("2323232")
                .setPsgName("yony").setTicketNo("784442224444444");
        list.add(ims);
        list.add(ims2);
//        mt.save(list,"invoiceApplyRecords");
        mt.insert(list,"invoiceApplyRecords");
//        Criteria criteria=Criteria.where("psgName").is("啊实打实的");
//        Query query=new Query(criteria);
//        List<InvoiceMsgSend> list= mt.find(query,InvoiceMsgSend.class,"invoiceApplyRecords");
//        for(InvoiceMsgSend im:list){
//            System.out.println(im.getPsgName());
//        }
  //      mt.execute()
//       Document document =mt.executeCommand("db.invoiceApplyRecords.insert({\"name\":\"asdsadas\"})");
//       Iterator<Map.Entry<String,Object>> iterator= document.entrySet().iterator();
//        while (iterator.hasNext()){
//            Map.Entry<String,Object> entry=  iterator.next();
//            System.out.println(entry.getKey()+","+entry.getValue());
//        }

    }
}
