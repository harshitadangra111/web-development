package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.CelebrationBookingRequest;
import com.yourorg.appname.dto.response.CelebrationBookingResponse;
import com.yourorg.appname.entity.CelebrationBooking;
import com.yourorg.appname.mapper.DtoMapper;
import com.yourorg.appname.repository.CelebrationBookingRepository;
import com.yourorg.appname.service.CelebrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CelebrationServiceImpl implements CelebrationService {

    private final CelebrationBookingRepository bookingRepository;
    private final DtoMapper mapper;

    @Override
    @Transactional
    public CelebrationBookingResponse bookCelebration(CelebrationBookingRequest request) {
        CelebrationBooking booking = CelebrationBooking.builder()
                .celebrationType(request.getCelebrationType())
                .contactName(request.getContactName())
                .contactEmail(request.getContactEmail())
                .contactPhone(request.getContactPhone())
                .eventDate(request.getEventDate())
                .timeSlot(request.getTimeSlot())
                .guestCount(request.getGuestCount())
                .cakePreference(request.getCakePreference())
                .packageTier(request.getPackageTier() != null ? request.getPackageTier() : "CELESTIAL")
                .specialRequests(request.getSpecialRequests())
                .status("IN_REVIEW")
                .createdAt(LocalDateTime.now())
                .build();

        return mapper.toCelebrationBookingResponse(bookingRepository.save(booking));
    }

    @Override
    @Transactional(readOnly = true)
    public List<CelebrationBookingResponse> getCelebrationsByEmail(String email) {
        return bookingRepository.findByContactEmailOrderByEventDateDesc(email)
                .stream()
                .map(mapper::toCelebrationBookingResponse)
                .collect(Collectors.toList());
    }
}
