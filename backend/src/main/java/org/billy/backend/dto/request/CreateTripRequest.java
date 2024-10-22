package org.billy.backend.dto.request;

import jakarta.persistence.OneToMany;
import lombok.Data;
import org.billy.backend.domain.Gallery;

import java.util.List;

@Data
public class CreateTripRequest {
    private Long id;
    private String country;
    private String airport;
    private String hotel;
    @OneToMany(mappedBy = "gallery")
    private List<Gallery> gallery;
}
