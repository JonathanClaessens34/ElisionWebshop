package be.elision.geektech.domain.response;

import be.elision.geektech.domain.Order;
import be.elision.geektech.domain.OrderAddress;
import be.elision.geektech.domain.OrderItem;
import be.elision.geektech.domain.Status;
import lombok.Data;

import java.util.List;
@Data
public class OrderDTO {
    private List<OrderItem> orderItems;
    private OrderAddress address;
    private Status status;

    public OrderDTO(Order order) {
        this.address = order.getAddress();
        this.orderItems = order.getOrderItems();
        this.status = order.getStatus();
    }
}