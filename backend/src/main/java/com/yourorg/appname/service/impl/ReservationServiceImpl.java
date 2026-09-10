package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.ReservationRequest;
import com.yourorg.appname.dto.response.ReservationResponse;
import com.yourorg.appname.entity.StoreLocation;
import com.yourorg.appname.entity.TableReservation;
import com.yourorg.appname.entity.User;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.DtoMapper;
import com.yourorg.appname.repository.StoreLocationRepository;
import com.yourorg.appname.repository.TableReservationRepository;
import com.yourorg.appname.repository.UserRepository;
import com.yourorg.appname.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final TableReservationRepository reservationRepository;
    private final StoreLocationRepository storeRepository;
    private final UserRepository userRepository;
    private final DtoMapper mapper;

    @Override
    @Transactional
    public ReservationResponse createReservation(ReservationRequest request, String userEmail) {
        StoreLocation store = storeRepository.findById(request.getStoreId())
                .orElseThrow(() -> new ResourceNotFoundException("Store not found with id: " + request.getStoreId()));

        User user = null;
        if (userEmail != null) {
            user = userRepository.findByEmail(userEmail).orElse(null);
        }

        TableReservation reservation = TableReservation.builder()
                .store(store)
                .user(user)
                .guestName(request.getGuestName())
                .guestEmail(request.getGuestEmail())
                .guestPhone(request.getGuestPhone())
                .partySize(request.getPartySize())
                .reservationTime(request.getReservationTime())
                .seatingPreference(request.getSeatingPreference() != null ? request.getSeatingPreference() : "Standard")
                .specialRequests(request.getSpecialRequests())
                .status("CONFIRMED")
                .createdAt(LocalDateTime.now())
                .build();

        return mapper.toReservationResponse(reservationRepository.save(reservation));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReservationResponse> getUserReservations(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userEmail));
        return reservationRepository.findByUserIdOrderByReservationTimeDesc(user.getId())
                .stream()
                .map(mapper::toReservationResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReservationResponse> getStoreReservations(Long storeId) {
        return reservationRepository.findByStoreIdOrderByReservationTimeDesc(storeId)
                .stream()
                .map(mapper::toReservationResponse)
                .collect(Collectors.toList());
    }
}
