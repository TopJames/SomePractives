package rocketmq.boot.listener;

import com.alibaba.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import com.alibaba.rocketmq.client.consumer.listener.ConsumeOrderlyContext;
import com.alibaba.rocketmq.client.consumer.listener.ConsumeOrderlyStatus;
import com.alibaba.rocketmq.client.consumer.listener.MessageListenerOrderly;
import com.alibaba.rocketmq.common.message.MessageExt;

import java.util.List;

/**
 * Created by Administrator on 2018/5/29.
 */
public class ConsumerListenerOrderly implements MessageListenerOrderly {
    @Override
    public ConsumeOrderlyStatus consumeMessage(List<MessageExt> msgs, ConsumeOrderlyContext context) {
        MessageExt msg = msgs.get(0);
        try {
            String topic = msg.getTopic();
            String tags = msg.getTags();
            String keys = msg.getKeys();

            System.out.println("balance服务收到消息, keys : " + keys + ", body : " + new String(msg.getBody(), "utf-8")+
                    ",queue:"+msg.getQueueId()+",tags:"+msg.getTags()+",topic:"+topic
            );

        } catch (Exception e) {
            e.printStackTrace();
            //重试次数为3情况
            if(msg.getReconsumeTimes() == 3){
                return ConsumeOrderlyStatus.SUCCESS;
                //记录日志
            }
            return ConsumeOrderlyStatus.SUSPEND_CURRENT_QUEUE_A_MOMENT;
        }
        return ConsumeOrderlyStatus.SUSPEND_CURRENT_QUEUE_A_MOMENT;
    }
}
