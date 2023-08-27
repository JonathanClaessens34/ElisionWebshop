package be.elision.geektech.builder;

import be.elision.geektech.domain.OrderAddress;
import be.elision.geektech.domain.request.OrderInformationRequest;

public class OrderInformationRequestBuilder {
    public static final Long PRICE = 15L;
    public static final String CITY = "Tessenderlo";
    public static final String STREET_NAME = "adresStraat";
    public static final String HOUSE_NUMBER = "4";
    public static final String POSTAL_CODE = "3980";
    public static final String COUNTRY = "belgium";
    public static final String EMAIL = "jan@hotmail.com";

    private Long price = PRICE;
    private String streetName = STREET_NAME;
    private String houseNumber = HOUSE_NUMBER;
    private String postalCode = POSTAL_CODE;
    private String city = CITY;
    private String country = COUNTRY;
    private String email = EMAIL;

    public OrderInformationRequestBuilder() {}

    public static OrderInformationRequestBuilder anInformationRequest() {
        return new OrderInformationRequestBuilder();
    }

    public OrderInformationRequestBuilder withCity(String city) {
        this.city = city;
        return this;
    }

    public OrderInformationRequestBuilder withPrice(Long price) {
        this.price = price;
        return this;
    }
    public OrderInformationRequestBuilder withStreetName(String streetName) {
        this.streetName = streetName;
        return this;
    }
    public OrderInformationRequestBuilder withHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
        return this;
    }
    public OrderInformationRequestBuilder withPostalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }
    public OrderInformationRequestBuilder withCountry(String country) {
        this.country = country;
        return this;
    }
    public OrderInformationRequestBuilder withEmail(String email) {
        this.email = email;
        return this;
    }

    public OrderInformationRequest build() {
        return new OrderInformationRequest(price, streetName, houseNumber, postalCode, city, country, email);
    }
}
