package fileUpload;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoReactiveDataAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoReactiveRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoReactiveAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoAutoConfiguration;

@SpringBootApplication(exclude={
        MongoAutoConfiguration.class,MongoDataAutoConfiguration.class,MongoReactiveAutoConfiguration.class,MongoRepositoriesAutoConfiguration.class,MongoReactiveDataAutoConfiguration.class,
        MongoReactiveRepositoriesAutoConfiguration.class,EmbeddedMongoAutoConfiguration.class
})
public class Run1 {
    public static void main(String[] args) {

        String str="sdfsefe??sdf?se";

        Long lObj=NumberUtils.toLong(str);

        if(str.contains("#")) str.substring(0, str.indexOf("#"));
        System.out.println("");

        SpringApplication.run(Run1.class);
    }
}
