package be.elision.geektech.domain.dto;

import be.elision.geektech.domain.Product;
import be.elision.geektech.domain.ProductCategory;
import lombok.Data;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.List;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private String price;
    private String description;
    private String color;
    private String brand;
    private List<String> images;
    private ProductCategory category;
    private boolean sale;
    private double salePercentage;

    public ProductDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        DecimalFormatSymbols mySymbol = new DecimalFormatSymbols();
        mySymbol.setCurrencySymbol(",-");
        String pattern = "€###,###.##-";
        DecimalFormat decimalFormat = new DecimalFormat(pattern, mySymbol);
        try {
            this.price = decimalFormat.format(product.getPrice());
        } catch (IllegalArgumentException e) {
            this.price = "0";
        }
        this.description = product.getDescription();
        this.color = product.getColor();
        this.brand = product.getBrand();
        this.images = product.getImages();
        this.category = product.getCategory();
        this.sale = product.isSale();
        this.salePercentage = product.getSalePercentage();
    }
}
