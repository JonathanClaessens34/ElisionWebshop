package be.elision.geektech.builder;

import be.elision.geektech.domain.OrderAddress;
import be.elision.geektech.domain.OrderItem;

public class AddressBuilder {
    public static final Long ID = 1L;
    public static final String CITY = "Tessenderlo";
    public static final String STREET = "adresStraat";
    public static final String NUMBER = "4";
    public static final String POSTAL_CODE = "3980";

    private Long id = ID;
    private String city = CITY;
    private String street = STREET;
    private String number = NUMBER;
    private String postalCode = POSTAL_CODE;

    public AddressBuilder() {}

    public static AddressBuilder anAddress() {
        return new AddressBuilder();
    }

    public AddressBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public AddressBuilder withCity(String city) {
        this.city = city;
        return this;
    }

    public AddressBuilder withStreet(String street) {
        this.street = street;
        return this;
    }

    public AddressBuilder withNumber(String number) {
        this.number = number;
        return this;
    }

    public AddressBuilder withPostalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public OrderAddress build() {
        return new OrderAddress(city, street, number, postalCode);
    }
}
