package be.elision.geektech.services.impl;

import be.elision.geektech.domain.dto.ProductDTO;
import be.elision.geektech.repository.IProductRepository;
import be.elision.geektech.services.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {
    private final IProductRepository productRepository;

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(ProductDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> getLastEightProducts() {
        if (productRepository.findAll().size() >= 8) {
            return productRepository.findAll().subList(productRepository.findAll().size() - 8, productRepository.findAll().size())
                    .stream().map(ProductDTO::new).collect(Collectors.toList());
        }
        return getAllProducts();
    }

    @Override
    public ProductDTO getProduct(Long id) {
        return productRepository.findById(id).map(ProductDTO::new)
                .orElseThrow(() -> new RuntimeException(String.format("Product with id [%d] has not been found.", id)));
    }
}
