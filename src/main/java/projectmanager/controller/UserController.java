package projectmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectmanager.model.User;
import projectmanager.repository.UsersRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:8081", "http://192.168.1.65:8081", "http://192.168.1.29:8081"})
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    public UsersRepository usersRepository;

    @GetMapping("/login")
    public String getUser() {
        return "login is working!";
    }

    @PostMapping("/login/createUser")
    public ResponseEntity<User> createUser(/*@RequestBody User user*/) {
        try {
             User _user = usersRepository
                     .save(new User("Name", "Password", "DefaultBoard"));
            return new ResponseEntity<>(_user, HttpStatus.CREATED);
        } catch (Exception E) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{userid}/boards/getlist")
    public ResponseEntity<List<String>> getBoardList(@PathVariable("userid") long id) {
        Optional<User> userData = usersRepository.findById(id);
        if (userData.isPresent()) {
            User _user = userData.get();
             return new ResponseEntity<>(_user.getBoardList(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/{userid}/boards/add")
    public ResponseEntity<User> addBoard(@PathVariable("userid") long id, @RequestBody String board) {
        System.out.println("Made it into function");
        Optional<User> userData = usersRepository.findById(id);
        if (userData.isPresent()) {
            User _user = userData.get();
            _user.addBoard(board);
            return new ResponseEntity<>(usersRepository.save(_user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{userid}/boards/remove")
    public ResponseEntity<User> removeBoard(@PathVariable("userid") long id, @RequestBody String board) {
        System.out.println("Made it into function");

        Optional<User> userData = usersRepository.findById(id);
        if (userData.isPresent()) {
            User _user = userData.get();
            _user.removeBoard(board);
            return new ResponseEntity<>(usersRepository.save(_user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
