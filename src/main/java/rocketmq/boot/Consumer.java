package rocketmq.boot;

import com.alibaba.rocketmq.client.consumer.DefaultMQPushConsumer;
import com.alibaba.rocketmq.client.exception.MQClientException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import rocketmq.boot.listener.ConsumerListener;
import rocketmq.boot.listener.ConsumerListenerOrderly;

/**
 * Created by Zhan on 2018/5/28.
 */
public class Consumer {
    public static void main(String[] args) throws MQClientException {
        ApplicationContext ac=new ClassPathXmlApplicationContext("classpath:rocketmq-spring.xml");
        DefaultMQPushConsumer dpc=(DefaultMQPushConsumer)ac.getBean("consumer");
//        dpc.createTopic("pay-key","pay",5);
        dpc.setConsumeThreadMax(1);
        dpc.setConsumeThreadMin(1);
        dpc.subscribe("wow", "*");
        dpc.registerMessageListener(new ConsumerListenerOrderly());
        dpc.start();
    }
}
