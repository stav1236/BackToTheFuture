package UI;

import java.util.HashMap;

import Business.YoungBusiness;
import Models.Young;
import spark.*;
import com.google.gson.Gson;

import static spark.Spark.staticFiles;

public final class App {
    private static final HashMap<String, String> corsHeaders = new HashMap<>();

    static {
        corsHeaders.put("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        corsHeaders.put("Access-Control-Allow-Origin", "*");
        corsHeaders.put("Access-Control-Allow-Headers", "*");
    }

    public static void apply() {
        Filter filter = (request, response) -> corsHeaders.forEach(response::header);
        Spark.after(filter);
    }

    public static void main(String[] args) {
        YoungBusiness youngBusiness = new YoungBusiness();

        Gson gsonIncludedAllFields = new Gson();

        staticFiles.location("/public");

        App.apply(); // Call this before mapping thy routes

        //Back To The Future
        Spark.get("/youngs", ((request, response) ->
                gsonIncludedAllFields.toJson(youngBusiness.getALlYoungs())));
        Spark.get("/specificDetails/:id", ((request, response) -> {
            int youngId = Integer.parseInt(request.params(":id"));
            return gsonIncludedAllFields.toJson(youngBusiness.specificDetailsOfYoung(youngId));
        }));
        Spark.post("/insertYoung", ((request, response) -> {
            Young newYoung = gsonIncludedAllFields.fromJson(request.body(), Young.class);
            youngBusiness.addYoungByObject(newYoung);
            return "new Document is add";
        }));
        Spark.post("/removeYoung/:id", ((request, response) -> {
            int idToDelete = Integer.parseInt(request.params(":id"));
            youngBusiness.removeYoungById(idToDelete);
            return "new Document is add";
        }));
    }
}
