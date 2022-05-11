package bugtracker.controller;

import bugtracker.model.Bug;
import bugtracker.repository.BugsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class BugController {



    @Autowired
    public BugsRepository bugsRepository;

    //@GetMapping("/bugs")
    //public List<Bug> getAllBugs() {
    //return bugsRepository.findAll();
    //}

    @GetMapping("/bugs")
    public ResponseEntity<List<Bug>> getAllBugs(@RequestParam(required = false) String name) {
        try {
            List<Bug> bugs = new ArrayList<Bug>();
            if (name == null) {
                bugsRepository.findAll().forEach(bugs::add);
            } else {
                bugsRepository.findByNameContaining(name).forEach(bugs::add);
            }
            if (bugs.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(bugs, HttpStatus.OK);
        } catch (Exception E) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/bugs/{id}")
    public ResponseEntity<Bug> getBugById(@PathVariable("id") long id) {
        Optional<Bug> bugData = bugsRepository.findById(id);
        if (bugData.isPresent()) {
            return new ResponseEntity<>(bugData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/bugs")
    public ResponseEntity<Bug> createBug(@RequestBody Bug bug) {
        try {
            Bug _bug = bugsRepository
                    .save(new Bug(bug.getName(), bug.getDescription(), bug.getTag()));
            return new ResponseEntity<>(_bug, HttpStatus.CREATED);
        } catch (Exception E) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/bugs/{id}")
    public ResponseEntity<Bug> updateBug(@PathVariable("id") long id, @RequestBody Bug bug) {
        Optional<Bug> bugData = bugsRepository.findById(id);
        if (bugData.isPresent()) {
            Bug _bug = bugData.get();
            _bug.setName(bug.getName());
            _bug.setDescription(bug.getDescription());
            _bug.setTag(bug.getTag());
            return new ResponseEntity<>(bugsRepository.save(_bug), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/bugs/{id}")
    public ResponseEntity<HttpStatus> deleteBug(@PathVariable("id") long id) {
        try {
            bugsRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/bugs")
    public ResponseEntity<HttpStatus> deleteAllBugs() {
        try {
            bugsRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }








/*
    public List<Bug> bugList = new ArrayList<>(); // Create a stack that holds all the Bug Data
    List<String> categories = new ArrayList<>(); // Create a stack that holds the card categories

    @GetMapping("/CreateBugs")
    @ResponseBody
    public String home(@RequestParam(value = "name", defaultValue= "World") String name) {

        // Generate Test Categories
        categories.add("Stories");
        categories.add("TODO");
        categories.add("Active");
        categories.add("Complete");
        // Generate Test Bugs to populate stack
        for (int i = 1; i < 26; i++) {

            String tag;
            if (i % 3 == 0) {
                tag = "Active";
            } else if (i % 2 == 0) {
                tag = "Complete";
            } else {
                tag = "TODO";
            }

            Bug bug = new Bug("Bug " + i, "Description " + i, tag);
            bugList.add(bug);
        }

        return (String.format("Hello %s!", name) +  "\n" + bugList + categories.get(0));
    }*/
}
