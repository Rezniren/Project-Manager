package projectmanager.controller;

import projectmanager.model.Card;
import projectmanager.repository.CardsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = {"http://localhost:8081", "http://192.168.1.65:8081"})
@RestController
@RequestMapping("/api")
public class CardController {



    @Autowired
    public CardsRepository cardsRepository;


    @GetMapping("/board")
    public ResponseEntity<List<Card>> getAllCards(@RequestParam(required = false) String name,
                                                  @RequestParam(required = false) String tag) {
        try {
            List<Card> cards = new ArrayList<Card>();
            if (name == null && tag == null) {
                cardsRepository.findAll().forEach(cards::add);
            } else if (name != null && tag == null){
                cardsRepository.findByNameContaining(name).forEach(cards::add);
            } else {
                cardsRepository.findByTag(tag).forEach(cards::add);
            }
            if (cards.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(cards, HttpStatus.OK);
        } catch (Exception E) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/board/{id}")
    public ResponseEntity<Card> getCardById(@PathVariable("id") long id) {
        Optional<Card> cardData = cardsRepository.findById(id);
        if (cardData.isPresent()) {
            return new ResponseEntity<>(cardData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/board")
    public ResponseEntity<Card> createCard(@RequestBody Card card) {
        try {
            Card _card = cardsRepository
                    .save(new Card(card.getName(), card.getDescription(),
                            card.getTag(), card.getStarted(), card.getFinished()));
            return new ResponseEntity<>(_card, HttpStatus.CREATED);
        } catch (Exception E) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/board/{id}")
    public ResponseEntity<Card> updateCard(@PathVariable("id") long id, @RequestBody Card card) {
        Optional<Card> cardData = cardsRepository.findById(id);
        if (cardData.isPresent()) {
            Card _card = cardData.get();
            _card.setName(card.getName());
            _card.setDescription(card.getDescription());
            _card.setTag(card.getTag());
            _card.setStarted((card.getStarted()));
            _card.setFinished(card.getFinished());
            return new ResponseEntity<>(cardsRepository.save(_card), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/board/{id}")
    public ResponseEntity<HttpStatus> deleteCard(@PathVariable("id") long id) {
        try {
            cardsRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/board")
    public ResponseEntity<HttpStatus> deleteAllCards() {
        try {
            cardsRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/board/tags")
    public List<String> getTags(@RequestBody ArrayList<Card> cards) {
        List<String> tags = new ArrayList<>();
        for (Card card : cards) {
            String tag = card.getTag();
            if (!tags.contains(card.getTag())) {
                tags.add(tag);
            }

        }
        return tags;
    }


}
