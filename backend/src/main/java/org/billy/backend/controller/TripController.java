package org.billy.backend.controller;

import lombok.RequiredArgsConstructor;
import org.billy.backend.dto.response.TripResponse;
import org.billy.backend.service.TripService;
import org.springframework.boot.actuate.autoconfigure.observation.ObservationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping
@RestController
@RequiredArgsConstructor
public class TripController {
    private TripService tripService;

    public ResponseEntity<?>getAllTrips(){
        List<TripResponse> tripResponseList = tripService.findAll();
        return new ResponseEntity<>(tripResponseList, HttpStatus.OK);
    }

    public ResponseEntity<?> getTripById(@PathVariable Long tripId){
        TripResponse tripResponse = tripService.findById(tripId);
        return new ResponseEntity<>(tripResponse, HttpStatus.OK);
    }


}
