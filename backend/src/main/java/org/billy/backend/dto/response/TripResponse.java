package org.billy.backend.dto.response;

import jakarta.persistence.OneToMany;
import lombok.Data;
import org.billy.backend.domain.Gallery;
import org.billy.backend.domain.Trip;

import java.util.List;

@Data
public class TripResponse {
    private Long id;
    private String country;
    private String airport;
    private String hotel;
    @OneToMany(mappedBy = "gallery")
    private List<Gallery> gallery;

    private static TripResponse from(Trip trip){
        TripResponse tripResponse = new TripResponse();
        tripResponse.id= trip.getId();
        tripResponse.airport=trip.getAirport();
        tripResponse.country= trip.getCountry();
        tripResponse.hotel = trip.getHotel();
        tripResponse.gallery = trip.getGallery();
        return tripResponse;
    }
}
