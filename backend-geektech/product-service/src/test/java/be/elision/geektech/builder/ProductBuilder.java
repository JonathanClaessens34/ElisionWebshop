package be.elision.geektech.builder;

import be.elision.geektech.domain.Product;
import be.elision.geektech.domain.ProductCategory;
import be.elision.geektech.domain.dto.ProductDTO;

import java.math.BigDecimal;

public final class ProductBuilder {
    public static final Long ID = 1L;
    public static final String NAME = "product";
    public static final BigDecimal PRICE = BigDecimal.valueOf(15);
    public static final String DESCRIPTION = "description";
    public static final String COLOR = "black";
    public static final String BRAND = "apple";
    public static final ProductCategory CATEGORY = ProductCategory.AUDIO;
    public static final boolean SALE = false;
    public static final double SALE_PERCENTAGE = 0.5;

    private Long id = ID;
    private String name = NAME;
    private BigDecimal price = PRICE;
    private String description = DESCRIPTION;
    private String color = COLOR;
    private String brand = BRAND;
    private ProductCategory category = CATEGORY;
    private boolean sale = SALE;
    private double salePercentage = SALE_PERCENTAGE;

    private ProductBuilder() {

    }

    public static ProductBuilder aProduct() {return new ProductBuilder();}

    public ProductBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public ProductBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public ProductBuilder withPrice(BigDecimal price) {
        this.price = price;
        return this;
    }

    public ProductBuilder withDescription(String description) {
        this.description = description;
        return this;
    }

    public ProductBuilder withColor(String color) {
        this.color = color;
        return this;
    }

    public ProductBuilder withBrand(String brand) {
        this.brand = brand;
        return this;
    }

    public ProductBuilder withCategory(ProductCategory category) {
        this.category = category;
        return this;
    }

    public ProductBuilder withSale(boolean sale) {
        this.sale = sale;
        return this;
    }

    public ProductBuilder withSalePercentage(double salePercentage) {
        this.salePercentage = salePercentage;
        return this;
    }

    public Product build() {
        return new Product(id, name, price, description, color, brand, null, category, sale, salePercentage);
    }

    public ProductDTO buildDTO() {
        return new ProductDTO(build());
    }
}
