package projectmanager.model;

import javax.persistence.*;
import java.util.ArrayList;
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



    @Column(name="boards")
    private String boards;

    public User(){}

    public User(String name, String password, String boards) {
        super();
        this.name = name;
        this.password = password;
        this.boards = boards;
    }

    public void addBoard(String item) {
        if (this.boards == null) {
            this.boards = item;
        }
        else {
            this.boards += "," + item;
        }
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
