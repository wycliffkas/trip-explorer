interface Gallery {
  place: string;
  url: string;
}

interface TripData {
  country: string;
  airport: string;
  hotel: string;
  gallery: Gallery[];
}

const trips: Trip[] = [
  {
    id: 1,
    country: "Nepal",
    airport: "Tribhuwan International Airport",
    hotel: "Hotel Yak and Yeti",
    gallery: [
      {
        place: "Kathmandu",
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/d6/96/36/photo4jpg.jpg?w=1400&h=1400&s=1"
      }
    ]
  },
  {
    id: 2,
    country: "India",
    airport: "Indira Gandhi International Airport",
    hotel: "Oberoi",
    gallery: [
      {
        place: "Taj Mahal",
        url: "https://cdn.mos.cms.futurecdn.net/3FnczamRyWU6MvRMEXWaGD.jpg"
      }
    ]
  },
  {
    id: 3,
    country: "United States",
    airport: "John F. Kennedy International Airport",
    hotel: "Hyatt Grand Central",
    gallery: [
      {
        place: "Statue of Liberty",
        url: "https://www.goworldtravel.com/wp-content/uploads/2021/06/Statue-of-Liberty-from-Canva.jpg"
      },
      {
        place: "Disney",
        url: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1349/464/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/destination/magic-kingdom/WDW_50thEvergreen_MagicKingdom_LandingPage_V2-16x9.jpg?2023-03-22T20:56:41+00:00"
      },
      {
        place: "Manhattan bridge",
        url: "https://media.timeout.com/images/102596290/750/562/image.jpg"
      }
    ]
  },
  {
    id: 4,
    country: "South Africa",
    airport: "Cape Town International Airport",
    hotel: "Cape Hotel",
    gallery: [
      {
        place: "Table mountain",
        url: "https://resources.formula-e.pulselive.com/photo-resources/2023/02/20/042dd057-7157-4069-beb8-2aa3af8b21ba/Cape-Town.jpg?width=1440&height=810"
      }
    ]
  },
  {
    id: 5,
    country: "Mexico",
    airport: "Mexico City International Airport",
    hotel: "Hilton Mexico",
    gallery: [
      {
        place: "Chichén Itzá",
        url: "https://lh3.googleusercontent.com/p/AF1QipPVRyqNwBkPGFTPdcqXJRH_9UD9iRY3nZyUu3xB=s1360-w1360-h1020-rw"
      }
    ]
  },
  {
    id: 6,
    country: "Japan",
    airport: "Tokyo International Airport",
    hotel: "Tokyo Royal",
    gallery: [
      {
        place: "Chichén Itzá",
        url: "https://afar.brightspotcdn.com/dims4/default/b06a879/2147483647/strip/true/crop/1357x720+41+0/resize/1440x764!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fcf%2F8a%2F20b4a2c544a58be93512ad67084c%2Fbohler-japankk-4006.jpg"
      }
    ]
  },
  {
    id: 7,
    country: "Uganda",
    airport: "Entebbe International Airport",
    hotel: "Speak Resort Munyonyo",
    gallery: [
      {
        place: "speak",
        url: "https://lh3.googleusercontent.com/pw/AP1GczOqKdEusOf9uanpr8UqKTp4L4-QmCD1g192vBgQpovXXj5bPNg09CBlHze_beOElgpE-PhSdD9qxZ3ub10DSYVQecEu6T0U45CjY1w_HQD2qNB2r_HJ=w1200"
      }
    ]
  }
];

class Trip {
  constructor(
    public id: number,
    public country: string,
    public airport: string,
    public hotel: string,
    public gallery: Gallery[]
  ) {}

  static getTrips() {
    return trips;
  }

  static getTrip(tripId: number) {
    const trip = trips.find((trip) => trip.id === tripId);
    if (trip) {
      return trip;
    } else {
      throw new Error(`No trip found with Id: ${tripId}`);
    }
  }

  static addTrip(tripData: TripData) {
    const newId =
      trips.length > 0 ? Math.max(...trips.map((trip) => trip.id)) + 1 : 1;
    const newTrip = new Trip(
      newId,
      tripData.country,
      tripData.airport,
      tripData.hotel,
      tripData.gallery || []
    );
    trips.push(newTrip);
    return newTrip;
  }

  static updateTrip(tripId: number, tripData: TripData) {
    const tripIndex = trips.findIndex((trip) => trip.id === tripId);
    if (tripIndex === -1) {
      throw new Error(`No trip found with Id: ${tripId}`);
    }
    const updatedTrip = new Trip(
      tripId,
      tripData.country,
      tripData.airport,
      tripData.hotel,
      tripData.gallery
    );
    trips[tripIndex] = updatedTrip;
    return updatedTrip;
  }

  static deleteTrip(tripId: number) {
    const tripIndex = trips.findIndex((trip) => trip.id === tripId);
    if (tripIndex === -1) {
      throw new Error(`No trip found with Id: ${tripId}`);
    }
    const deletedTrip = trips.splice(tripIndex, 1)[0];
    return deletedTrip;
  }

  static addGalleryImage(tripId: number, url: string) {
    const trip = Trip.getTrip(tripId);

    if (!trip.gallery) {
      trip.gallery = [];
    }

    trip.gallery.push({ place: "New Image", url });
    return trip.gallery;
  }

  static updateGalleryImage(tripId: number, oldUrl: string, newUrl: string) {
    const trip = Trip.getTrip(tripId);
    const imageIndex = trip.gallery.findIndex((image) => image.url === oldUrl);

    if (imageIndex === -1) {
      throw new Error("Image not found");
    }

    trip.gallery[imageIndex].url = newUrl;
    return trip.gallery;
  }
  static deleteGalleryImage(tripId: number, url: string) {
    const trip = Trip.getTrip(tripId);
    const imageIndex = trip.gallery.findIndex((image) => image.url === url);

    if (imageIndex === -1) {
      throw new Error("Image not found");
    }

    trip.gallery.splice(imageIndex, 1);
    return trip.gallery;
  }
}
export default Trip;
