package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.CelebrationBookingRequest;
import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.CelebrationBookingResponse;
import com.yourorg.appname.service.CelebrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/celebrations")
@RequiredArgsConstructor
public class CelebrationController {

    private final CelebrationService celebrationService;

    @PostMapping
    public ResponseEntity<ApiResponse<CelebrationBookingResponse>> bookCelebration(@Valid @RequestBody CelebrationBookingRequest request) {
        CelebrationBookingResponse res = celebrationService.bookCelebration(request);
        return ResponseEntity.ok(ApiResponse.success("Celebration booking inquiry submitted", res));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<CelebrationBookingResponse>>> getCelebrations(@RequestParam String email) {
        return ResponseEntity.ok(ApiResponse.success("Celebration bookings retrieved", celebrationService.getCelebrationsByEmail(email)));
    }
}
