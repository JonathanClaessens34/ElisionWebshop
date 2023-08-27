package be.elision.geektech.rest;

import be.elision.geektech.builder.OrderBuilder;
import be.elision.geektech.builder.OrderInformationRequestBuilder;
import be.elision.geektech.controller.OrderController;
import be.elision.geektech.domain.request.OrderInformationRequest;
import be.elision.geektech.domain.request.OrderRequest;
import be.elision.geektech.services.IOrderService;
import com.adyen.model.checkout.CreateCheckoutSessionResponse;
import com.adyen.model.notification.NotificationRequest;
import com.adyen.model.notification.NotificationRequestItem;
import com.adyen.model.notification.NotificationRequestItemContainer;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import java.util.ArrayList;
import java.util.List;

import static be.elision.geektech.builder.OrderBuilder.*;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = OrderController.class)
public class OrderControllerTest {
    @MockBean
    private IOrderService orderService;

    @Autowired
    private MockMvc mockMvc;

    @Captor
    private ArgumentCaptor<OrderRequest> orderRequestCaptor;

    @Captor
    private ArgumentCaptor<OrderInformationRequest> orderInformationRequestCaptor;

    @Test
    void testCreateOrder() throws Exception {
        OrderRequest orderRequest = OrderBuilder.anOrder().buildRequest();
        mockMvc.perform(MockMvcRequestBuilders.post("/orderApi/addOrder")
                        .content(asJsonString(orderRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
        verify(orderService).addOrder(orderRequestCaptor.capture());
        OrderRequest createdOrder = orderRequestCaptor.getValue();
        assertThat(createdOrder.getOrderItems()).isEqualTo(ORDER_ITEMS);
        assertThat(createdOrder.getReference()).isEqualTo(REFERENCE);
        assertThat(createdOrder.getAddress()).isEqualTo(ADDRESS);
    }

    @Test
    void testNotificationWebhook() throws Exception {
        NotificationRequest notificationRequest = new NotificationRequest();
        mockMvc.perform(MockMvcRequestBuilders.post("/orderApi/notification")
                .content(asJsonString(notificationRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("[accepted]"));

    }

    @Test
    void testCreatePaymentSession() throws Exception {
        OrderInformationRequest orderInformationRequest = OrderInformationRequestBuilder.anInformationRequest().build();
        mockMvc.perform(MockMvcRequestBuilders.post("/orderApi/sessions")
                        .content(asJsonString(orderInformationRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
