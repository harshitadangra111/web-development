package com.yourorg.appname.repository;

import com.yourorg.appname.entity.CelebrationBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CelebrationBookingRepository extends JpaRepository<CelebrationBooking, Long> {
    List<CelebrationBooking> findByContactEmailOrderByEventDateDesc(String contactEmail);
    List<CelebrationBooking> findAllByOrderByEventDateDesc();
}
