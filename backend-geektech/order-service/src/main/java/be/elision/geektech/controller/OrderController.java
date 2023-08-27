package be.elision.geektech.controller;

import be.elision.geektech.domain.request.OrderInformationRequest;
import be.elision.geektech.domain.request.OrderRequest;
import be.elision.geektech.domain.response.OrderDTO;
import be.elision.geektech.services.IOrderService;
import com.adyen.model.checkout.CreateCheckoutSessionResponse;
import com.adyen.model.notification.NotificationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("orderApi")
@RequiredArgsConstructor
public class OrderController {
    private final IOrderService orderService;

    @PostMapping("/notification")
    public ResponseEntity<String> notificationWebhook(@RequestBody NotificationRequest notificationRequest) {
        orderService.notificationWebhook(notificationRequest);
        // Notifying the server we're accepting the payload
        return ResponseEntity.ok().body("[accepted]");
    }

    @PostMapping("/sessions")
    public ResponseEntity<CreateCheckoutSessionResponse> createPaymentSession(@RequestBody OrderInformationRequest orderInformationRequest){
        return new ResponseEntity<>(orderService.createPaymentSession(orderInformationRequest), HttpStatus.OK);
    }

    @PostMapping("/addOrder")
    public ResponseEntity<OrderDTO> addOrder(@RequestBody OrderRequest orderRequest){
        return new ResponseEntity<>(orderService.addOrder(orderRequest), HttpStatus.CREATED);
    }
}