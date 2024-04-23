package Models;

public class SpecificDetails {
    private String hobby;
    private String favoriteBook;

    public SpecificDetails(String hobby, String favoriteBook) {
        this.hobby = hobby;
        this.favoriteBook = favoriteBook;
    }

    @Override
    public String toString() {
        return "SpecificDetails{" +
                "hobby='" + hobby + '\'' +
                ", favoriteBook='" + favoriteBook + '\'' +
                '}';
    }
}
