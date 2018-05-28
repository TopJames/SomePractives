package serialize;

import com.caucho.hessian.io.Hessian2Input;
import com.caucho.hessian.io.Hessian2Output;
import com.esotericsoftware.kryo.Kryo;
import com.esotericsoftware.kryo.io.Input;
import com.esotericsoftware.kryo.io.Output;
import kryo.entity.User;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * Created by Administrator on 2018/5/25.
 */
public class KryoAndHessian2 {
    public static void main(String[] args) throws IOException {
        String name="Tom";

        User user=new User("tony","98","500cm");


        Kryo kryo=new Kryo();
        kryo.setReferences(false);
        long time1=System.currentTimeMillis();
        for(int i=0;i<10000;i++){
            ByteArrayOutputStream baos=new ByteArrayOutputStream();
            Output output=new Output(baos);
            kryo.writeClassAndObject(output,user);
            output.flush();
            output.close();
            byte[] bytArray=baos.toByteArray();
            baos.flush();
            baos.close();
            ByteArrayInputStream bais=new ByteArrayInputStream(bytArray);
            Input input=new Input(bais);
            User namekryo=(User) kryo.readClassAndObject(input);
        }
        System.out.println("kryo:"+(System.currentTimeMillis()-time1));

        long time2=System.currentTimeMillis();
        for(int i=0;i<10000;i++){
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            Hessian2Output out = new Hessian2Output(bos);
            out.writeObject(user);
            out.flush();
            byte[] bytArray2 = bos.toByteArray();
            Hessian2Input inputHessian = new Hessian2Input(new ByteArrayInputStream(bytArray2));
            User nameHessian= (User) inputHessian.readObject(User.class);
        }
        System.out.println("hessian:"+(System.currentTimeMillis()-time2));
    }
}
