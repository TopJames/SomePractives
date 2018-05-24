package kryo.entity;

import java.io.Serializable;

/**
 * Created by Zhan on 2018/5/24.
 */
public class User implements Serializable {
    String name;
    String age;
    String height;

    public User(){}
    public User(String name,String age,String height){
        this.name=name;
        this.age=age;
        this.height=height;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    @Override
    public String toString() {
        return this.name+","+this.age+","+this.height;
    }
}
