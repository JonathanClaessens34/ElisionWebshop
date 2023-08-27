package be.elision.geektech.service;

import be.elision.geektech.domain.Product;
import be.elision.geektech.domain.dto.ProductDTO;
import be.elision.geektech.repository.IProductRepository;
import be.elision.geektech.services.impl.ProductService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static be.elision.geektech.builder.ProductBuilder.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
    @Mock
    IProductRepository productRepository;
    @InjectMocks
    ProductService productService;

    @Test
    void getAllProductsTest() {
        List<Product> products = makeProductsList(2);

        when(productRepository.findAll()).thenReturn(products);
        List<ProductDTO> allProducts = productService.getAllProducts();
        assertThat(allProducts.stream().map(ProductDTO::getName).collect(Collectors.toList()))
                .hasSize(2)
                .containsExactly("product1", "product2");
    }

    @Test
    void getLastEightProductsTest() {

        List<Product> products = makeProductsList(9);
        when(productRepository.findAll()).thenReturn(products);
        List<ProductDTO> eightProducts = productService.getLastEightProducts();


        assertEquals("product2", eightProducts.get(0).getName());
    }

    @Test
    void findProductByIdReturnsProductCorrectlyTest() {
        when(productRepository.findById(ID)).thenReturn(Optional.of(aProduct().build()));
        ProductDTO product = productService.getProduct(ID);
        assertEquals(ID, product.getId());
        assertEquals(NAME, product.getName());
        assertEquals(DESCRIPTION, product.getDescription());
        assertEquals(COLOR, product.getColor());
        assertEquals(BRAND, product.getBrand());
        assertEquals(null, product.getImages());
        assertEquals(CATEGORY, product.getCategory());
        assertEquals(SALE, product.isSale());
        assertEquals(SALE_PERCENTAGE, product.getSalePercentage());
    }

    @Test
    void getLastEightProductsWhenThereAreNotEightProductsTest() {
        List<Product> products = makeProductsList(5);
        when(productRepository.findAll()).thenReturn(products);
        List<ProductDTO> eightProducts = productService.getLastEightProducts();

        assertEquals(5, eightProducts.size());
        assertEquals("product1", eightProducts.get(0).getName());
    }

    public List<Product> makeProductsList(int countOfProducts) {
        List<Product> products = new ArrayList<>();
        for (int i = 1; i <= countOfProducts; i++) {
            Product product = Product.builder().id((long) i).name("product" + i).build();

            products.add(product);
        }
        return products;
    }
}
