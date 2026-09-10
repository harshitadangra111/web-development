package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.ReservationRequest;
import com.yourorg.appname.dto.response.ReservationResponse;

import java.util.List;

public interface ReservationService {
    ReservationResponse createReservation(ReservationRequest request, String userEmail);
    List<ReservationResponse> getUserReservations(String userEmail);
    List<ReservationResponse> getStoreReservations(Long storeId);
}
