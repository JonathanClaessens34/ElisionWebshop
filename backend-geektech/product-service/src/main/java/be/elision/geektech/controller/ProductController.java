package be.elision.geektech.controller;

import be.elision.geektech.domain.dto.ProductDTO;
import be.elision.geektech.services.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("productApi/")
@RequiredArgsConstructor
public class ProductController {
    private final IProductService productService;

    @GetMapping("getAllProducts")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("getLastEightProducts")
    public ResponseEntity<List<ProductDTO>> getLastEightProducts(){
        return new ResponseEntity<>(productService.getLastEightProducts(), HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long productId){
        return new ResponseEntity<>(productService.getProduct(productId), HttpStatus.OK);
    }
}
