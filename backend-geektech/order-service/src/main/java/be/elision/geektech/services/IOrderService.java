package be.elision.geektech.services;

import be.elision.geektech.domain.request.OrderInformationRequest;
import be.elision.geektech.domain.request.OrderRequest;
import be.elision.geektech.domain.response.OrderDTO;
import com.adyen.model.checkout.CreateCheckoutSessionResponse;
import com.adyen.model.notification.NotificationRequest;
import org.springframework.web.bind.annotation.RequestBody;

public interface IOrderService {
    CreateCheckoutSessionResponse createPaymentSession(@RequestBody OrderInformationRequest orderInformationRequest);

    void notificationWebhook(NotificationRequest notificationRequest);
    OrderDTO addOrder(OrderRequest orderRequest);
}
