package Models;

public class Young {
    private Integer _id;
    private String name;
    private String place;
    private String phone;
    private SpecificDetails specificDetails;

    public Young(Integer _id, String name, String place, String phone, SpecificDetails specificDetails) {
        this._id = _id;
        this.place = place;
        this.name = name;
        this.phone = phone;
        this.specificDetails = specificDetails;
    }
}
