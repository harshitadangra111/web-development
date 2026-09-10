package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.CelebrationBookingRequest;
import com.yourorg.appname.dto.response.CelebrationBookingResponse;

import java.util.List;

public interface CelebrationService {
    CelebrationBookingResponse bookCelebration(CelebrationBookingRequest request);
    List<CelebrationBookingResponse> getCelebrationsByEmail(String email);
}
