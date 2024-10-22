package org.backend.service.Impl;

import org.backend.Exceptions.TripNotFoundException;
import org.backend.repository.TripRepository;
import org.backend.service.TripService;
import org.backend.domain.Trip;
import org.backend.dto.request.CreateTripRequest;
import org.backend.dto.response.TripResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripServiceImpl implements TripService {
    @Autowired
    private TripRepository tripRepository;
    @Override
    public List<TripResponse> findAll() {
        return tripRepository.findAll()
                .stream()
                .map(TripResponse::from)
                .toList();
    }

    @Override
    public TripResponse findById(Long tripId) {
        Trip trip = tripRepository.findById(tripId).orElseThrow(()-> new TripNotFoundException(String.format("Trip with that id not found")));
        return TripResponse.from(trip);
    }

    @Override
    public TripResponse createTrip(CreateTripRequest tripRequest) {
        Trip trip = new Trip();
        trip.setHotel(tripRequest.getHotel());
        trip.setGallery(tripRequest.getGallery());
        trip.setCountry(tripRequest.getCountry());
        trip.setAirport(tripRequest.getAirport());
        trip = tripRepository.save(trip);
        return TripResponse.from(trip);
    }
}
