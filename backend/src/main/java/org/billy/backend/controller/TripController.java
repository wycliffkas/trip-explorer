package org.billy.backend.controller;

import lombok.RequiredArgsConstructor;
import org.billy.backend.dto.request.CreateTripRequest;
import org.billy.backend.dto.response.TripResponse;
import org.billy.backend.service.TripService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/trips")
@RestController
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;
    @GetMapping
    public ResponseEntity<?>getAllTrips(){
        List<TripResponse> tripResponseList = tripService.findAll();
        return new ResponseEntity<>(tripResponseList, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getTripById(@PathVariable Long id){
        TripResponse tripResponse = tripService.findById(id);
        return new ResponseEntity<>(tripResponse, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createTrips(@RequestBody CreateTripRequest tripRequest){
        TripResponse tripResponse = tripService.createTrip(tripRequest);
        return new ResponseEntity<>(tripResponse, HttpStatus.CREATED);
    }


}
