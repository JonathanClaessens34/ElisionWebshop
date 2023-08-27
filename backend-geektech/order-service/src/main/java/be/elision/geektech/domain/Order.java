package be.elision.geektech.domain;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity

@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String reference;
    @OneToOne(cascade = CascadeType.ALL)
    private OrderAddress address;
    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;
    private Status status;
}