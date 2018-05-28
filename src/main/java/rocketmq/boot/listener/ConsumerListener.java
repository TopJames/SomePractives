package rocketmq.boot.listener;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import com.alibaba.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import com.alibaba.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import com.alibaba.rocketmq.common.message.MessageExt;

import java.util.List;

/**
 * Created by Zhan on 2018/5/28.
 */
public class ConsumerListener implements MessageListenerConcurrently {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
        MessageExt msg = msgs.get(0);
        try {
            String topic = msg.getTopic();
            //Message Body
//            JSONObject messageBody = FastJsonConvert.convertJSONToObject(new String(msg.getBody(), "utf-8"), JSONObject.class);
            String tags = msg.getTags();
            String keys = msg.getKeys();

            System.out.println("balance服务收到消息, keys : " + keys + ", body : " + new String(msg.getBody(), "utf-8")+
                "queue:"+msg.getQueueId()
            );
            //userid
//            String userid = messageBody.getString("userid");
            //money
//            double money = messageBody.getDouble("money");
            //mode
//            String balance_mode = messageBody.getString("balance_mode");
            //业务逻辑处理
//            balanceService.updateAmount(userid, balance_mode, money);



        } catch (Exception e) {
            e.printStackTrace();
            //重试次数为3情况
            if(msg.getReconsumeTimes() == 3){
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
                //记录日志
            }
            return ConsumeConcurrentlyStatus.RECONSUME_LATER;
        }
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }
}
