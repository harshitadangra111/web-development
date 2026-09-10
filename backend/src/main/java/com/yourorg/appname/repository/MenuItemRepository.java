package com.yourorg.appname.repository;

import com.yourorg.appname.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

    List<MenuItem> findByIsAvailableTrue();

    List<MenuItem> findByCategoryIdAndIsAvailableTrue(Long categoryId);

    List<MenuItem> findByIsFeaturedTrueAndIsAvailableTrue();

    @Query("SELECT m FROM MenuItem m WHERE m.isAvailable = true " +
           "AND (:searchTerm IS NULL OR LOWER(m.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "     OR LOWER(m.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) " +
           "AND (:categoryName IS NULL OR :categoryName = 'All' OR LOWER(m.category.name) = LOWER(:categoryName)) " +
           "AND (:vegOnly IS NULL OR :vegOnly = false OR m.isVeg = true) " +
           "AND (:eggless IS NULL OR :eggless = false OR m.isEggless = true)")
    List<MenuItem> searchMenuItems(
            @Param("searchTerm") String searchTerm,
            @Param("categoryName") String categoryName,
            @Param("vegOnly") Boolean vegOnly,
            @Param("eggless") Boolean eggless
    );
}
