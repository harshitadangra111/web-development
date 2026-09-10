package com.yourorg.appname.repository;

import com.yourorg.appname.entity.TableReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TableReservationRepository extends JpaRepository<TableReservation, Long> {
    List<TableReservation> findByUserIdOrderByReservationTimeDesc(Long userId);
    List<TableReservation> findByStoreIdOrderByReservationTimeDesc(Long storeId);
}
