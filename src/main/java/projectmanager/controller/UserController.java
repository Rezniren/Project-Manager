package projectmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectmanager.model.Card;
import projectmanager.model.User;
import projectmanager.repository.UsersRepository;

import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:8081", "http://192.168.1.65:8081"})
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    public UsersRepository usersRepository;

    @GetMapping("/login")
    public String getUser() {
        return "login is working!";
    }

    @PostMapping("/login")
    public ResponseEntity<User> createUser(/*@RequestBody User user*/) {
        try {
             User _user = usersRepository
                     .save(new User("Name", "Password", "DefaultBoard"));
            return new ResponseEntity<>(_user, HttpStatus.CREATED);
        } catch (Exception E) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/login")
    public ResponseEntity<User> addBoard() {
        long id = 1;
        Optional<User> userData = usersRepository.findById(id);
        if (userData.isPresent()) {
            User _user = userData.get();
            _user.addBoard("TestBoard");
            return new ResponseEntity<>(usersRepository.save(_user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<User> removeBoard() {
        return null;
    }


}
