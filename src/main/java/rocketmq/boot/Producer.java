package rocketmq.boot;

import com.alibaba.rocketmq.client.exception.MQClientException;
import com.alibaba.rocketmq.client.producer.TransactionMQProducer;
import com.alibaba.rocketmq.common.message.Message;
import com.alibaba.rocketmq.common.message.MessageQueue;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.UnsupportedEncodingException;
import java.util.concurrent.TimeUnit;

/**
 * Created by Zhan on 2018/5/28.
 */
public class Producer {
    public static void main(String[] args) throws Exception {
        ApplicationContext ac=new ClassPathXmlApplicationContext("classpath:rocketmq-spring.xml");
        TransactionMQProducer tp=(TransactionMQProducer)ac.getBean("producer");
        tp.start();
        Message msg=new Message();
        msg.setBody("hello".getBytes("UTF-8"));
        msg.setTopic("pay");
        MessageQueue msgq=new MessageQueue("pay","name",1);
        int count=0;
        for(;;){
            msg.setKeys("thisiskey"+count);
            System.out.println("send....");
            tp.send(msg,msgq);
            TimeUnit.SECONDS.sleep(1);
            count++;
        }
    }
}
