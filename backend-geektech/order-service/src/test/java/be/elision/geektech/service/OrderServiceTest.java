package be.elision.geektech.service;

import be.elision.geektech.builder.OrderBuilder;
import be.elision.geektech.builder.OrderInformationRequestBuilder;
import be.elision.geektech.domain.Order;
import be.elision.geektech.domain.Status;
import be.elision.geektech.domain.request.OrderInformationRequest;
import be.elision.geektech.domain.request.OrderRequest;
import be.elision.geektech.domain.response.OrderDTO;
import be.elision.geektech.repository.IOrderRepository;
import be.elision.geektech.services.impl.OrderService;
import com.adyen.model.checkout.CreateCheckoutSessionRequest;
import com.adyen.model.checkout.CreateCheckoutSessionResponse;
import com.adyen.model.notification.NotificationRequest;
import com.adyen.model.notification.NotificationRequestItem;
import com.adyen.model.notification.NotificationRequestItemContainer;
import com.adyen.util.HMACValidator;
import org.hibernate.mapping.Map;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.security.SignatureException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static be.elision.geektech.builder.OrderBuilder.*;
import static be.elision.geektech.builder.OrderInformationRequestBuilder.*;
import static org.junit.jupiter.api.Assertions.*;


import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {
    @Mock
    private IOrderRepository orderRepository;

    @Captor
    private ArgumentCaptor<Order> orderCaptor;

    @InjectMocks
    private OrderService orderService;

    @Test
    void createOrderTest() {
        when(orderRepository.save(Mockito.any(Order.class))).thenAnswer(AdditionalAnswers.returnsFirstArg());
        OrderRequest orderRequest = OrderBuilder.anOrder().buildRequest();
        OrderDTO result = orderService.addOrder(orderRequest);
        assertEquals(ORDER_ITEMS, result.getOrderItems());
        assertEquals(STATUS, result.getStatus());
        assertEquals(ADDRESS, result.getAddress());
        Mockito.verify(orderRepository).save(orderCaptor.capture());
        Order savedOrder = orderCaptor.getValue();
        assertEquals(ORDER_ITEMS, savedOrder.getOrderItems());
        assertEquals(STATUS, savedOrder.getStatus());
        assertEquals(ADDRESS, savedOrder.getAddress());
        assertEquals(REFERENCE, savedOrder.getReference());
        assertNull(savedOrder.getId());
    }

    @Test
    void createPaymentSessionTest() {
        OrderInformationRequest orderInformationRequest = OrderInformationRequestBuilder.anInformationRequest().build();
        CreateCheckoutSessionResponse checkoutSessionResponse = orderService.createPaymentSession(orderInformationRequest);
        assertEquals(PRICE, checkoutSessionResponse.getAmount().getValue());
        assertEquals("EUR", checkoutSessionResponse.getAmount().getCurrency());

        assertEquals(CITY, checkoutSessionResponse.getBillingAddress().getCity());
        assertEquals("BE", checkoutSessionResponse.getBillingAddress().getCountry());
        assertEquals(STREET_NAME, checkoutSessionResponse.getBillingAddress().getStreet());
        assertEquals(POSTAL_CODE, checkoutSessionResponse.getBillingAddress().getPostalCode());
        assertEquals(HOUSE_NUMBER, checkoutSessionResponse.getBillingAddress().getHouseNumberOrName());

        assertEquals(CITY, checkoutSessionResponse.getDeliveryAddress().getCity());
        assertEquals("BE", checkoutSessionResponse.getDeliveryAddress().getCountry());
        assertEquals(STREET_NAME, checkoutSessionResponse.getDeliveryAddress().getStreet());
        assertEquals(POSTAL_CODE, checkoutSessionResponse.getDeliveryAddress().getPostalCode());
        assertEquals(HOUSE_NUMBER, checkoutSessionResponse.getDeliveryAddress().getHouseNumberOrName());

        assertEquals(EMAIL, checkoutSessionResponse.getShopperEmail());
        assertEquals("BE", checkoutSessionResponse.getCountryCode());
        assertEquals(CreateCheckoutSessionRequest.ChannelEnum.WEB.getValue(), checkoutSessionResponse.getChannel().getValue());
        assertEquals("Elision_Stage2022_TEST", checkoutSessionResponse.getMerchantAccount());
    }

    @Test
    void notificationWebhookTest() throws SignatureException {
        Order order = OrderBuilder.anOrder().build();
        when(orderRepository.findByReference(order.getReference())).thenReturn(order);

        NotificationRequestItem notificationRequestItem = new NotificationRequestItem();
        notificationRequestItem.setSuccess(true);
        notificationRequestItem.setEventCode("AUTHORISATION");
        notificationRequestItem.setMerchantReference(REFERENCE);
        HashMap<String, String> additionalData = new HashMap<>();
        HMACValidator validator = new HMACValidator();
        String hmac = validator.calculateHMAC(notificationRequestItem, "89CDA54F383ED69F2A47A6F4A543800B2AF8BC56098D1B9966B62E22ED92C8A4");
        additionalData.put("hmacSignature", hmac);
        notificationRequestItem.setAdditionalData(additionalData);


        NotificationRequestItemContainer notificationRequestItemContainer = new NotificationRequestItemContainer();
        notificationRequestItemContainer.setNotificationItem(notificationRequestItem);

        List<NotificationRequestItemContainer> notificationList = new ArrayList<>();
        notificationList.add(notificationRequestItemContainer);

        NotificationRequest notificationRequest = new NotificationRequest();
        notificationRequest.setNotificationItemContainers(notificationList);

        orderService.notificationWebhook(notificationRequest);
        Mockito.verify(orderRepository).save(orderCaptor.capture());
        Order savedOrder = orderCaptor.getValue();
        assertEquals(Status.COMPLETED, savedOrder.getStatus());
    }

    @Test
    void notificationWebhookIsSuccesFalseTest() throws SignatureException {
        Order order = OrderBuilder.anOrder().build();
        when(orderRepository.findByReference(order.getReference())).thenReturn(order);

        NotificationRequestItem notificationRequestItem = new NotificationRequestItem();
        notificationRequestItem.setSuccess(false);
        notificationRequestItem.setEventCode("AUTHORISATION");
        notificationRequestItem.setMerchantReference(REFERENCE);
        HashMap<String, String> additionalData = new HashMap<>();
        HMACValidator validator = new HMACValidator();
        String hmac = validator.calculateHMAC(notificationRequestItem, "89CDA54F383ED69F2A47A6F4A543800B2AF8BC56098D1B9966B62E22ED92C8A4");
        additionalData.put("hmacSignature", hmac);
        notificationRequestItem.setAdditionalData(additionalData);


        NotificationRequestItemContainer notificationRequestItemContainer = new NotificationRequestItemContainer();
        notificationRequestItemContainer.setNotificationItem(notificationRequestItem);

        List<NotificationRequestItemContainer> notificationList = new ArrayList<>();
        notificationList.add(notificationRequestItemContainer);

        NotificationRequest notificationRequest = new NotificationRequest();
        notificationRequest.setNotificationItemContainers(notificationList);

        orderService.notificationWebhook(notificationRequest);
        Mockito.verify(orderRepository).save(orderCaptor.capture());
        Order savedOrder = orderCaptor.getValue();
        assertEquals(Status.CANCELED, savedOrder.getStatus());
    }

    @Test
    void notificationWebhookInvalidHmacTest() {
        NotificationRequestItem notificationRequestItem = new NotificationRequestItem();


        NotificationRequestItemContainer notificationRequestItemContainer = new NotificationRequestItemContainer();
        notificationRequestItemContainer.setNotificationItem(notificationRequestItem);

        List<NotificationRequestItemContainer> notificationList = new ArrayList<>();
        notificationList.add(notificationRequestItemContainer);

        NotificationRequest notificationRequest = new NotificationRequest();
        notificationRequest.setNotificationItemContainers(notificationList);

        assertThrows(IllegalArgumentException.class, () -> orderService.notificationWebhook(notificationRequest));
    }
}
