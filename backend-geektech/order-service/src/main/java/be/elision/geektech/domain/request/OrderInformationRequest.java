package be.elision.geektech.domain.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderInformationRequest {
    private Long price;
    private String streetName;
    private String houseNumber;
    private String postalCode;
    private String city;
    private String country;
    private String email;

    public Long getPrice() {
        return price;
    }

    public String getStreetName() {
        return streetName;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public String getCity() {
        return city;
    }

    public String getCountry() {
        return country;
    }

    public String getEmail() {
        return email;
    }
}
