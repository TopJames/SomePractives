package rocketmq.boot;

import com.alibaba.rocketmq.client.exception.MQClientException;
import com.alibaba.rocketmq.client.producer.MessageQueueSelector;
import com.alibaba.rocketmq.client.producer.TransactionMQProducer;
import com.alibaba.rocketmq.common.message.Message;
import com.alibaba.rocketmq.common.message.MessageQueue;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Created by Zhan on 2018/5/28.
 */
public class Producer {
    public static void main(String[] args) throws Exception {
        ApplicationContext ac=new ClassPathXmlApplicationContext("classpath:rocketmq-spring.xml");
        TransactionMQProducer tp=(TransactionMQProducer)ac.getBean("producer");
        tp.start();
        String key=tp.getCreateTopicKey();
        tp.createTopic(key,"wow",5);
        Message msg=new Message();
        msg.setBody("hello".getBytes("UTF-8"));
        msg.setTopic("wow");
        MessageQueue msgq=new MessageQueue("pay","name",1);
        int count=0;
        MessageQueueSelector mqs1= (mqs, msg1, arg) -> {
            int size=mqs.size();
            int id=(int)arg;
            int index;
            if(id!=0){
                index=id%size;
            }else {
                index=id;
            }
            msg1.setTags("queue"+index);
            try {
                System.out.println("message: topic_"+ msg1.getTopic()+" ,content:"+new String(msg1.getBody(),"UTF-8")+",index:"+index+",id:"+id+",size:"+size);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            return mqs.get(index);
        };
        for(;;){
            msg.setKeys("thisiskey"+count);
            System.out.println("send....");
            tp.send(msg, mqs1,count);

            TimeUnit.SECONDS.sleep(1);
            count++;
        }
    }
}
