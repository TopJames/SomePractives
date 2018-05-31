package kryo.util;

import com.esotericsoftware.kryo.Kryo;
import com.esotericsoftware.kryo.io.Input;
import com.esotericsoftware.kryo.io.Output;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * Created by Administrator on 2018/5/31.
 */
public class SerializeUtil {

    public static byte[] serializeObj(Object obj){
        ByteArrayOutputStream baos=new ByteArrayOutputStream();
        Output op=new Output(baos);
        Instance.kryo.writeClassAndObject(op,obj);
        op.flush();
        op.close();
        byte[] bytes=baos.toByteArray();
        try {
            baos.flush();
            baos.close();
        } catch (IOException e) {
        }
        return bytes;
    }

    @SuppressWarnings("unchecked")
    public static <T> T deSerialize(byte[] data,Class<T> tClass){
        ByteArrayInputStream bais=new ByteArrayInputStream(data);
        Input in=new Input(bais);
        Object obj=Instance.kryo.readClassAndObject(in);
        in.close();
        try {
            bais.close();
        } catch (IOException e) {
        }
        return (T)obj;

    }

    private static class Instance{
        private static Kryo kryo=new Kryo();
    }
}
