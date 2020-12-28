package Data;

import Models.Young;

import com.google.gson.Gson;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;

public class DataBase {
    //Singleton class
    private static DataBase dataBase = null;
    public ArrayList<Young> youngs;

    //init Data Base
    private DataBase() {
        this.youngs = new ArrayList<>();
        Gson gson = new Gson();
        JSONParser jsonParser = new JSONParser();
        JSONArray jsonArray = null;
        try {
            jsonArray = (JSONArray) jsonParser.parse(new FileReader("src/main/resources/db.json"));
            for (Object var : jsonArray) {
                Young young = gson.fromJson(var.toString(), Young.class);
                youngs.add(young);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public void writeDataToDB(){
        Gson gsonIncludedAllFields = new Gson();
        try (FileWriter file = new FileWriter("src/main/resources/db.json")) {
            file.write(gsonIncludedAllFields.toJson(this.youngs));
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void insert(Young newYoung) {
        this.youngs.add(newYoung);
        writeDataToDB();
    }

    public void delete(Young newYoung) {
        this.youngs.remove(newYoung);
        writeDataToDB();
    }

    public static DataBase getInstance() {
        if (dataBase == null)
            dataBase = new DataBase();
        return dataBase;
    }

}
