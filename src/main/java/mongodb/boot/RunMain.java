package mongodb.boot;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.Iterator;
import java.util.Map;

/**
 * Created by Administrator on 2018/5/21.
 */
public class RunMain {
    public static void main(String[] args) {
        System.out.println(System.currentTimeMillis());
        MongoClient mongoClient = new MongoClient( "192.168.129.3" , 27017 );

        MongoDatabase mongoDatabase = mongoClient.getDatabase("demoDB");

        MongoCollection<Document> collection = mongoDatabase.getCollection("test");

        Document document=new Document();
        document.put("eval","getNextSeq(\"recordId\")");
    //    document.put("args","recordId");

        Document document2= mongoDatabase.runCommand(document);
        Iterator<Map.Entry<String,Object>> iterator= document2.entrySet().iterator();
        while (iterator.hasNext()){
            Map.Entry<String,Object> entry=  iterator.next();
            System.out.println(entry.getKey()+","+entry.getValue());
        }
    }
}
