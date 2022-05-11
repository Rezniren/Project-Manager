package bugtracker.repository;

import bugtracker.model.Bug;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BugsRepository extends JpaRepository<Bug, Long> {
    List<Bug> findByTag(String tag);
    List<Bug> findByNameContaining(String name);
}
