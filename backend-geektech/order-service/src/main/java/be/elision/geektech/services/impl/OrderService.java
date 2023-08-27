package be.elision.geektech.services.impl;

import be.elision.geektech.domain.Order;
import be.elision.geektech.domain.Status;
import be.elision.geektech.domain.request.OrderInformationRequest;
import be.elision.geektech.domain.request.OrderRequest;
import be.elision.geektech.domain.response.OrderDTO;
import be.elision.geektech.repository.IOrderRepository;
import be.elision.geektech.services.IOrderService;
import com.adyen.Client;
import com.adyen.enums.Environment;
import com.adyen.model.Address;
import com.adyen.model.Amount;
import com.adyen.model.checkout.CreateCheckoutSessionRequest;
import com.adyen.model.checkout.CreateCheckoutSessionResponse;
import com.adyen.model.notification.NotificationRequest;
import com.adyen.service.Checkout;
import com.adyen.service.exception.ApiException;
import com.adyen.util.HMACValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.SignatureException;
import java.util.Objects;
import java.util.UUID;

@Service
public class OrderService implements IOrderService {
    private static final String HMACKEY = "89CDA54F383ED69F2A47A6F4A543800B2AF8BC56098D1B9966B62E22ED92C8A4";
    private static final String APIKEY = "AQEphmfxJo7JbhVCw0m/n3Q5qf3VbYdEHppFVojMAQr4/Kt+uHdW479xbcMQwV1bDb7kfNy1WIxIIkxgBw==-s/xUUaVKmHYwyIMzyDV/3xOy2E901GxYiONIZD+aq3k=-%=?j%5gh{U^qab3h";
    private final Logger log = LoggerFactory.getLogger(OrderService.class);
    private final Checkout checkout;
    private final IOrderRepository orderRepository;

    public OrderService(IOrderRepository orderRepository) {
        this.orderRepository = orderRepository;
        Client client = new Client(APIKEY, Environment.TEST);
        checkout = new Checkout(client);
    }

    @Override
    public CreateCheckoutSessionResponse createPaymentSession(OrderInformationRequest orderInformationRequest) {
        String orderRef = UUID.randomUUID().toString();
        CreateCheckoutSessionRequest checkoutSessionRequest = new CreateCheckoutSessionRequest();
        Amount amount = new Amount();
        amount.setCurrency("EUR");
        amount.setValue(orderInformationRequest.getPrice());

        Address address = new Address();
        address.setCity(orderInformationRequest.getCity());
        address.setCountry("BE");
        address.setStreet(orderInformationRequest.getStreetName());
        address.setPostalCode(orderInformationRequest.getPostalCode());
        address.setHouseNumberOrName(orderInformationRequest.getHouseNumber());
        checkoutSessionRequest.billingAddress(address);
        checkoutSessionRequest.deliveryAddress(address);


        checkoutSessionRequest.setShopperEmail(orderInformationRequest.getEmail());


        checkoutSessionRequest.setCountryCode("BE");
        checkoutSessionRequest.setChannel(CreateCheckoutSessionRequest.ChannelEnum.WEB);
        checkoutSessionRequest.setAmount(amount);
        checkoutSessionRequest.setMerchantAccount("Elision_Stage2022_TEST");
        checkoutSessionRequest.setReturnUrl("http://localhost:3000/cart/completion?orderRef=" + orderRef);
        checkoutSessionRequest.setReference(orderRef);
        try {
            return checkout.sessions(checkoutSessionRequest);
        } catch (ApiException | IOException e) {
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public void notificationWebhook(NotificationRequest notificationRequest) {
        notificationRequest.getNotificationItems().forEach(
                item -> {
                    // We recommend validate HMAC signature in the webhooks for security reasons
                    try {
                        if (new HMACValidator().validateHMAC(item, HMACKEY)) {
                            log.info("\nReceived webhook with event {} : \n" +
                                            "Event Date: {}\n" +
                                            "Merchant Reference : {}\n" +
                                            "PSP reference : {}\n"
                                    , item.getEventCode(), item.getEventDate(), item.getMerchantReference(), item.getPspReference());
                            if (Objects.equals(item.getEventCode(), "AUTHORISATION")) {
                                Order order = orderRepository.findByReference(item.getMerchantReference());
                                if (item.isSuccess()) {
                                    order.setStatus(Status.COMPLETED);
                                }
                                else {
                                    order.setStatus(Status.CANCELED);
                                }
                                orderRepository.save(order);
                            }
                        } else {
                            // invalid HMAC signature: do not send [accepted] response
                            log.warn("Could not validate HMAC signature for incoming webhook message: {}", item);
                            throw new IllegalArgumentException("Invalid HMAC signature");
                        }
                    } catch (SignatureException e) {
                        log.error("Error while validating HMAC Key", e);
                    }
                }
        );
    }

    public OrderDTO addOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setReference(orderRequest.getReference());
        order.setStatus(Status.AUTHORIZED);
        order.setOrderItems(orderRequest.getOrderItems());
        order.setAddress(orderRequest.getAddress());
        orderRepository.save(order);
        return new OrderDTO(order);
    }
}
