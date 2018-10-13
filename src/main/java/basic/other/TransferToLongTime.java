package basic.other;

import java.text.ParseException;
import java.text.SimpleDateFormat;

/**
 * Created by Zhan on 2018/7/6.
 */
public class TransferToLongTime {
    public static void main(String[] args) throws ParseException {
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(sdf.parse("2018-06-13 14:30:49").getTime());
        System.out.println(sdf.parse("2018-06-13 14:30:54").getTime());
    }
}
