package be.elision.geektech.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int amount;
    private String name;
    private String price;

    public OrderItem(int amount, String name, String price) {
        this.amount = amount;
        this.name = name;
        this.price = price;
    }
}