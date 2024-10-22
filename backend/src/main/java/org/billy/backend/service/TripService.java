package org.billy.backend.service;

import org.billy.backend.dto.response.TripResponse;

import java.util.List;

public interface TripService {
    List<TripResponse> findAll();

    TripResponse findById(Long tripId);
}
