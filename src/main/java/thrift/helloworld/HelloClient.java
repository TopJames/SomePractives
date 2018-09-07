package thrift.helloworld;

import org.apache.thrift.TException;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;
import org.apache.thrift.transport.TTransportException;

/**
 * Created by Administrator on 2018/9/7.
 */
public class HelloClient {

    public static void main(String[] args) {
        System.out.println("客户端启动....");
        TTransport transport = null;
        try {
            transport = new TSocket("localhost", 9898, 30000);
            // 协议要和服务端一致
            TProtocol protocol = new TBinaryProtocol(transport);
            Hello.Client client = new Hello.Client(protocol);
            transport.open();
            String result = client.helloString("大人打人");
            System.out.println(result);
        } catch (TTransportException e) {
            e.printStackTrace();
        } catch (TException e) {
            e.printStackTrace();
        } finally {
            if (null != transport) {
                transport.close();
            }
        }
    }
}
