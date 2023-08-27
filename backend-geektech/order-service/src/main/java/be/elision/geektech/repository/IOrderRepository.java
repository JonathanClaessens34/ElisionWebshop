package be.elision.geektech.repository;

import be.elision.geektech.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrderRepository extends JpaRepository<Order, Long> {
    Order findByReference(String reference);
}
