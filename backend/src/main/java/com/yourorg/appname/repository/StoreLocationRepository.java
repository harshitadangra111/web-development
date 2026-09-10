package com.yourorg.appname.repository;

import com.yourorg.appname.entity.StoreLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreLocationRepository extends JpaRepository<StoreLocation, Long> {

    List<StoreLocation> findByIsActiveTrue();

    @Query("SELECT s FROM StoreLocation s WHERE s.isActive = true " +
           "AND (:query IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "     OR LOWER(s.neighborhood) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "     OR LOWER(s.city) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<StoreLocation> searchStores(@Param("query") String query);
}
