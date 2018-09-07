package thrift.helloworld;

import org.apache.thrift.TException;
import org.apache.thrift.TProcessor;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.server.TServer;
import org.apache.thrift.server.TSimpleServer;
import org.apache.thrift.transport.TServerSocket;
import org.apache.thrift.transport.TTransportException;

/**
 * Created by Administrator on 2018/9/7.
 */
public class HelloService implements Hello.Iface {
    @Override
    public String helloString(String para) throws TException {
        return "invoked:"+para;
    }

    public static void main(String[] args) {
        try {
            System.out.println("服务端开启....");
            TProcessor tprocessor = new Hello.Processor<Hello.Iface>(new HelloService());
            // 简单的单线程服务模型
            TServerSocket serverTransport = new TServerSocket(9898);
            TServer.Args tArgs = new TServer.Args(serverTransport);
            tArgs.processor(tprocessor);
            tArgs.protocolFactory(new TBinaryProtocol.Factory());
            TServer server = new TSimpleServer(tArgs);
            server.serve();
        }catch (TTransportException e) {
            e.printStackTrace();
        }
    }
}
