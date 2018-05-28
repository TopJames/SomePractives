package kryo;

import com.esotericsoftware.kryo.Kryo;
import com.esotericsoftware.kryo.io.Input;
import com.esotericsoftware.kryo.io.Output;
import com.esotericsoftware.kryo.serializers.JavaSerializer;
import kryo.entity.User;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * Created by Zhan on 2018/5/24.
 */
public class KryoRun {
    public static void main(String[] args) {

        User user=new User("tony","98","500cm");

        String name="Tom";

        Kryo kryo=new Kryo();
        kryo.setReferences(false);
   //     kryo.register(name.getClass(),new JavaSerializer());
        ByteArrayOutputStream baos=new ByteArrayOutputStream();
        Output output=new Output(baos);
        kryo.writeClassAndObject(output,name);
        output.flush();
        output.close();
        byte[] bytArray=baos.toByteArray();
        String str=new String(bytArray);
        System.out.println(str);

        ByteArrayInputStream bais=new ByteArrayInputStream(bytArray);
        Input input=new Input(bais);
     //   User user2=(User) kryo.readClassAndObject(input);
        String name2=(String) kryo.readClassAndObject(input);

        System.out.println(name2);

        try {
            baos.flush();
            baos.close();
            bais.close();
        } catch (IOException e) {
            e.printStackTrace();
        }



    }
}
