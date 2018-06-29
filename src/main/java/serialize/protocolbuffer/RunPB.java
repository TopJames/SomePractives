package serialize.protocolbuffer;

import serialize.protocolbuffer.protofiles.UserMsg;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * Created by Administrator on 2018/6/27.
 */
public class RunPB {
    public static void main(String[] args) throws IOException {

        UserMsg.User.Builder userBuilder=UserMsg.User.newBuilder();
        userBuilder.setName("tom").setId(1).setPhone("11111113245").addFriends("Jim");

        UserMsg.User user=userBuilder.build();

        ByteArrayOutputStream baos=new ByteArrayOutputStream();
        user.writeTo(baos);

        byte[] bytes=baos.toByteArray();

        ByteArrayInputStream bais=new ByteArrayInputStream(bytes);

        UserMsg.User user1=UserMsg.User.parseFrom(bais);
        System.out.println(user1.getName()+","+user1.getFriends(0)+","+user1.getPhone()+","+user1.getId());
    }
}
