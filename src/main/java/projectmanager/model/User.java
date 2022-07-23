package projectmanager.model;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "userKey")
    private String userKey;

    @Column(name="boards")
    private String boards;

    public User(){}

    public User(String name, String password, String key, String boards) {
        super();
        this.name = name;
        this.password = password;
        this.boards = boards;
        this.userKey = key;
    }
    public User(String name, String password) {
        super();
        this.name = name;
        this.password = password;
    }

    public void addBoard(String board) {
        if (this.boards == null) {
            this.boards = board;
        }
        else {
            this.boards += "," + board;
        }
    }
    public void removeBoard(String board) {
        if (board.contains(",")) {
        board = "," + board;
        }
        this.boards = this.boards.replaceFirst(board, "");
    }

    public List<String> getBoardList() {
        return Arrays.asList(this.boards.split(",", -1));
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getuserKey() {
        return userKey;
    }

    public void setuserKey(String key) {
        this.userKey = key;
    }

    public String getBoards() {
        return boards;
    }

    public void setBoards(String boards) {
        this.boards = boards;
    }

    @Override
    public String toString() {
        return ("<br/>ID: " + this.id +
                "<br/>Name: " + this.name +
                "<br/>Password: " + this.password) +
                "<br/>Boards: " + this.boards;
    }
}
