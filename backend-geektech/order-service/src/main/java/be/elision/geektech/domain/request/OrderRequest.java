package be.elision.geektech.domain.request;

import be.elision.geektech.domain.OrderAddress;
import be.elision.geektech.domain.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private String reference;
    private List<OrderItem> orderItems;
    private OrderAddress address;
}