package Business;

import Data.DataBase;
import Models.SpecificDetails;
import Models.Young;

import java.util.ArrayList;
import java.util.Objects;

public class YoungBusiness {

    public ArrayList<Young> getALlYoungs(){
        return DataBase.getInstance().youngs;
    }
    public SpecificDetails specificDetailsOfYoung(Integer youngId){
        Young existedYoung = getALlYoungs().stream()
                .filter(young -> youngId == young.getId())
                .findAny()
                .orElse(null);
        return Objects.requireNonNull(existedYoung).getSpecificDetails();
    }

    public String removeYoungById(int idToDelete){
        Young youngToDelete = getALlYoungs().stream()
                .filter(young -> idToDelete == young.getId())
                .findAny()
                .orElse(null);
        if (youngToDelete != null) {
            DataBase.getInstance().delete(youngToDelete);
            return "success";
        } else {
            return "young dont  exist";
        }
    }
    public String addYoungByObject(Young newYoung){
        if (newYoung != null && newYoung.isValid()) {
            Young existedYoung =  getALlYoungs().stream()
                    .filter(young -> newYoung.getId() == young.getId())
                    .findAny()
                    .orElse(null);
            if (existedYoung == null) {
                DataBase.getInstance().insert(newYoung);
                return "success";
            } else {
                return "there is young with the same id";
            }
        } else {
            return "not Valid input";
        }
    }
}
