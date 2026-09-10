package com.yourorg.appname.repository;

import com.yourorg.appname.entity.GiftCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GiftCardRepository extends JpaRepository<GiftCard, Long> {
    Optional<GiftCard> findByCardNumber(String cardNumber);
    Optional<GiftCard> findByCardNumberAndPin(String cardNumber, String pin);
}
