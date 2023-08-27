package be.elision.geektech.rest;

import be.elision.geektech.builder.ProductBuilder;
import be.elision.geektech.controller.ProductController;
import be.elision.geektech.domain.ProductCategory;
import be.elision.geektech.domain.dto.ProductDTO;
import be.elision.geektech.services.IProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static be.elision.geektech.builder.ProductBuilder.*;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ProductController.class)
class ProductControllerTest {
    @MockBean
    private IProductService productService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getAllProductsTest() throws Exception {
        ProductDTO productDTO1 = ProductBuilder.aProduct().buildDTO();
        ProductDTO productDTO2 = ProductBuilder.aProduct().withBrand("samsung").withCategory(ProductCategory.TELEVISION).buildDTO();
        List<ProductDTO> products = new ArrayList<>();
        products.add(productDTO1);
        products.add(productDTO2);
        when(productService.getAllProducts()).thenReturn(products);
        mockMvc.perform(MockMvcRequestBuilders
                .get("/productApi/getAllProducts")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(products.size())));
    }

    @Test
    void findProductByIdReturnsProductCorrectlyTest() throws Exception {
        ProductDTO productDTO = ProductBuilder.aProduct().buildDTO();
        when(productService.getProduct(ID))
                .thenReturn(productDTO);
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/productApi/{id}", ID)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(ID))
                .andExpect(jsonPath("$.name").value(NAME))
                .andExpect(jsonPath("$.description").value(DESCRIPTION))
                .andExpect(jsonPath("$.color").value(COLOR))
                .andExpect(jsonPath("$.brand").value(BRAND))
                .andExpect(jsonPath("$.category").value(CATEGORY.name()))
                .andExpect(jsonPath("$.sale").value(SALE))
                .andExpect(jsonPath("$.salePercentage").value(SALE_PERCENTAGE));

    }

    @Test
    void getLastEightProductsTest() throws Exception {
        List<ProductDTO> products = makeProductDTOList(8);
        when(productService.getLastEightProducts()).thenReturn(products);
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/productApi/getLastEightProducts")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(products.size())));
    }

    public List<ProductDTO> makeProductDTOList(int countOfProducts) {
        List<ProductDTO> products = new ArrayList<>();
        for (int i = 1; i <= countOfProducts; i++) {

            products.add(ProductBuilder.aProduct().buildDTO());
        }
        return products;
    }
}
