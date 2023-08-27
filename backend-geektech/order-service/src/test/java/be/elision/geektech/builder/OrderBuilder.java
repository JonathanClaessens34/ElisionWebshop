package be.elision.geektech.builder;

import be.elision.geektech.domain.Order;
import be.elision.geektech.domain.OrderAddress;
import be.elision.geektech.domain.OrderItem;
import be.elision.geektech.domain.Status;
import be.elision.geektech.domain.request.OrderRequest;

import java.util.ArrayList;
import java.util.List;

public final class OrderBuilder {
    public static final Long ID = 1L;
    public static final String REFERENCE = "5ca3678c-0b3c-4b97-a274-a5f6ee025494";
    public static final OrderAddress ADDRESS = AddressBuilder.anAddress().build();
    public static final List<OrderItem> ORDER_ITEMS = new ArrayList<>() {{add(OrderItemBuilder.anOrderItem().build());}};
    public static final Status STATUS = Status.AUTHORIZED;

    private Long id = ID;
    private String reference = REFERENCE;
    private OrderAddress address = ADDRESS;
    private List<OrderItem> orderItems = ORDER_ITEMS;
    private Status status = STATUS;

    public OrderBuilder() {}

    public static OrderBuilder anOrder() {
        return new OrderBuilder();
    }
    public OrderBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public OrderBuilder withReference(String reference) {
        this.reference = reference;
        return this;
    }

    public OrderBuilder withAddress(OrderAddress address) {
        this.address = address;
        return this;
    }

    public OrderBuilder withOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
        return this;
    }

    public OrderBuilder withStatus(Status status) {
        this.status = status;
        return this;
    }

    public Order build() {
        return new Order(id, reference, address, orderItems, status);
    }

    public OrderRequest buildRequest() {
        return new OrderRequest(reference, orderItems, address);
    }
}
