package bugtracker.model;


import javax.persistence.*;


@Entity
@Table(name = "bugs")
public class Bug {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "tag")
    private String tag;

    // This is for when a bug is initialized with no data
    public Bug() {
    }

    // This is for when a bug is initialized with all necessary data
    public Bug(String name, String description, String tag) {
        super();
        this.name = name;
        this.description = description;
        this.tag = tag;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    @Override
    public String toString() {
        return ("<br>ID on test: " + this.id +
                "<br>Name: " + this.name +
                "<br>Description: " + this.description +
                "<br>Tag: " + this.tag);
    }
}
