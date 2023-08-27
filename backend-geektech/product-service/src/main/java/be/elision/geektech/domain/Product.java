package be.elision.geektech.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Table(name = "product")
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private BigDecimal price;
    @Column(length = 65535,columnDefinition="Text")
    private String description;
    private String color;
    private String brand;
    @ElementCollection
    private List<String> images;
    private ProductCategory category;
    private boolean sale;
    private double salePercentage;
}
