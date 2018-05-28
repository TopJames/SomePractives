package rocketmq.boot.listener;

import com.alibaba.rocketmq.client.producer.LocalTransactionState;
import com.alibaba.rocketmq.client.producer.TransactionCheckListener;
import com.alibaba.rocketmq.common.message.MessageExt;

/**
 * Created by Zhan on 2018/5/28.
 */
public class Listener1 implements TransactionCheckListener {
    @Override
    public LocalTransactionState checkLocalTransactionState(MessageExt msg) {
        System.out.println("state -- "+ new String(msg.getBody()));
        return LocalTransactionState.COMMIT_MESSAGE;
    }
}
