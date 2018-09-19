package basic.acquireIP;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

public class TestMain {
    public static void main(String[] args) throws SocketException {
        for (Enumeration<NetworkInterface> en = NetworkInterface.getNetworkInterfaces(); en.hasMoreElements(); ) {
            NetworkInterface intf = en.nextElement();
            System.out.println(intf.getName());
            Enumeration<InetAddress> enumeration=intf.getInetAddresses();
            while (enumeration.hasMoreElements()){
                InetAddress inetAddress=enumeration.nextElement();
                String ip=inetAddress.getHostAddress();
                System.out.println(ip);
            }
        }
    }
}
