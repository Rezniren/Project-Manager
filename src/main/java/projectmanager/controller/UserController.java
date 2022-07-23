package projectmanager.controller;

import com.fasterxml.jackson.core.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectmanager.model.User;
import projectmanager.model.LoginForm;
import projectmanager.repository.UsersRepository;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = {"http://localhost:8081", "http://192.168.1.65:8081", "http://192.168.1.29:8081"})
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    public UsersRepository usersRepository;

    @PostMapping("/login")
    public ResponseEntity<String> getUser(@RequestBody LoginForm info) {
        try {
            List<User> _users = usersRepository.findAll();
            for (User user : _users) {
                if ((info.getName().equals(user.getName()) && (info.getPassword().equals(user.getPassword())))) {
                    return new ResponseEntity<>(user.getuserKey(), HttpStatus.CREATED);
                }

            }
            return new ResponseEntity<>("Could not find username or password!", HttpStatus.CREATED);


        } catch (Exception E) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login/createUser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            UUID userKey = UUID.randomUUID();
            User _user = usersRepository
                    .save(new User(user.getName(), user.getPassword(), userKey.toString(), "DefaultBoard"));
            return new ResponseEntity<>(_user, HttpStatus.CREATED);
        } catch (Exception E) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{userid}/delete")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("userid") long id) {
        try {
            usersRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
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

        Optional<User> userData = usersRepository.findById(id);
        if (userData.isPresent()) {
            User _user = userData.get();
            _user.removeBoard(board);
            return new ResponseEntity<>(usersRepository.save(_user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{userid}/changepass")
    public ResponseEntity<User> changePassword(@PathVariable("userid") long id, @RequestBody String password) {
        System.out.println(password);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
