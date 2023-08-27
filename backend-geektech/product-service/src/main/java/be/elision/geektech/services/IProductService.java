package be.elision.geektech.services;

import be.elision.geektech.domain.dto.ProductDTO;

import java.util.List;

public interface IProductService {
    List<ProductDTO> getAllProducts();

    List<ProductDTO> getLastEightProducts();
    ProductDTO getProduct(Long id);
}
