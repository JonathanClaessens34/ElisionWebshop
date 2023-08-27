package be.elision.geektech.builder;


import be.elision.geektech.domain.OrderItem;

public final class OrderItemBuilder {
    public static final Long ID = 1L;
    public static final int AMOUNT = 2;
    public static final String NAME = "Iphone 13";
    public static final String PRICE = "€999";

    private Long id = ID;
    private int amount = AMOUNT;
    private String name = NAME;
    private String price = PRICE;

    public OrderItemBuilder() {
    }

    public static OrderItemBuilder anOrderItem() {
        return new OrderItemBuilder();
    }

    public OrderItemBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public OrderItemBuilder withAmount(int amount) {
        this.amount = amount;
        return this;
    }

    public OrderItemBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public OrderItemBuilder withPrice(String price) {
        this.price = price;
        return this;
    }

    public OrderItem build() {
        return new OrderItem(amount, name, price);
    }
}
