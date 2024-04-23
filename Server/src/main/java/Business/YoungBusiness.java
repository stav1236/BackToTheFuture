package Business;

import Data.DataBase;
import Models.SpecificDetails;
import Models.Young;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Objects;

public class YoungBusiness {
    private DataBase dataLayer = new DataBase();

    public ArrayList<Young> getALlYoungs() {
        return dataLayer.findAllYoungsDetails();
    }
    public SpecificDetails specificDetailsOfYoung(Integer youngId) {
        return dataLayer.findSpecificDetailsById(youngId);
    }

    public void removeYoungById(int idToDelete)   {
        dataLayer.deleteYoungById(idToDelete);
    }

    public void addYoungByObject(Young newYoung) {
        dataLayer.insertYoung(newYoung);
    }
}
