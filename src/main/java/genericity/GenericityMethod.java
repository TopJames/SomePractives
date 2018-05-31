package genericity;

/**
 * Created by Administrator on 2018/5/31.
 */
public class GenericityMethod {

    public <T extends GenericityInterface> String doing(Class<T> clazz){
        return clazz.getName();
    }
}
