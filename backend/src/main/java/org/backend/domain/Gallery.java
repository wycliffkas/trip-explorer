package org.backend.domain;

import jakarta.persistence.*;

@Entity
public class Gallery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String place;
    private String url;
    @ManyToOne
    @JoinColumn(name="trip_gallery")
    private Trip trip;
}
