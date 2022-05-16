package bugtracker.repository;

import bugtracker.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CardsRepository extends JpaRepository<Card, Long> {
    List<Card> findByTag(String tag);
    List<Card> findByNameContaining(String name);
}
