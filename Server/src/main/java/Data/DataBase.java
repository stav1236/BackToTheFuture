package Data;

import Models.SpecificDetails;
import Models.Young;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import com.mongodb.*;
import com.mongodb.util.JSON;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class DataBase {
    private MongoClient mongoClient = new MongoClient();
    private DB stavDB = mongoClient.getDB("StavDB");
    private DBCollection youngsCollection = stavDB.getCollection("Youngs");
    private Gson gson = new Gson();

    public DataBase() {
    }

    protected BasicDBObject ProjectionsFields(String... fields) {
        BasicDBObject fieldToProjectObject = new BasicDBObject();
        for (String field : fields) {
            fieldToProjectObject.put(field, true);
        }

        return fieldToProjectObject;
    }

    public ArrayList<Young> findAllYoungsDetails() {
        BasicDBObject query = new BasicDBObject();
        List<DBObject> result = youngsCollection.find
                (query, ProjectionsFields("name", "place", "phone")).toArray();
        ArrayList<Young> youngs = new ArrayList<>();
        System.out.println(result);

        for (Object young : result) {
            Young tempYoung = gson.fromJson(young.toString(), Young.class);
            youngs.add(tempYoung);
        }

        return youngs;
    }

    public SpecificDetails findSpecificDetailsById(Integer id) {
        BasicDBObject qurey = new BasicDBObject();
        qurey.put("_id", id);
        DBObject result = youngsCollection.findOne(qurey,
                ProjectionsFields("specificDetails"));
        HashMap<String, Object> jsonMap = new Gson().fromJson(result.toString(), HashMap.class);

        return gson.fromJson(jsonMap.get("specificDetails").toString(), SpecificDetails.class);
    }

    public void insertYoung(Young newYoung) {
        Gson gson = new Gson();
        String json = gson.toJson(newYoung);
        DBObject dbObject = (DBObject) JSON.parse(json);
        youngsCollection.insert(dbObject);
    }

    public void deleteYoungById(Integer id) {
        BasicDBObject qurey = new BasicDBObject();
        qurey.put("_id", id);
        youngsCollection.remove(qurey);
    }
}
