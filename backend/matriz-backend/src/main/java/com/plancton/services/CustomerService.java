package com.plancton.services;

import com.plancton.models.Customer;
import com.plancton.models.Rubro;
import com.plancton.repositories.CustomerRepository;
import com.plancton.repositories.NormativaRepository;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CustomerService {
    CustomerRepository customerRepo;
    @Autowired
    NormativaRepository normativaRepo;
    @Autowired
    public CustomerService(CustomerRepository customerRepo){
        this.customerRepo=customerRepo;
    }

    public Customer registerCustomer(Customer object) {
        try{
            return customerRepo.save(object);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
    public void deleteById(Integer id){
        customerRepo.deleteById(id);
    }


    public Customer getById(Integer id){
        Customer customer = customerRepo.getById(id);



        return customer;
    }
    public List<Customer> getAll(){
        return  customerRepo.findAll();
    }

    public Optional<Customer> updateCustomer(Customer newCustomer, Integer id){
        return customerRepo.findById(id)
                .map(customer -> {
                    customer.setCompany(newCustomer.getCompany());
                    customer.setEnabled(newCustomer.isEnabled());

                    customer.getUsers().clear();
                    customer.getUsers().addAll(newCustomer.getUsers());

                    customer.getPlant().clear();
                    customer.getPlant().addAll(newCustomer.getPlant());



                    customer.getRequirements().clear();
                    customer.getRequirements().addAll(newCustomer.getRequirements());

                    customer.getNormativasList().clear();
                    customer.getNormativasList().addAll(newCustomer.getNormativasList());


                    customer.getRubroList().clear();
                    customer.getRubroList().addAll(newCustomer.getRubroList());

                    return customerRepo.save(customer);
                });
    }

    public Optional<Customer> updateCustomer(Integer id,String norma){

        return customerRepo.findById(id)
                .map(customer -> {

                    customer.getNormativasList().add(normativaRepo.findByNorma(norma));

                    return customerRepo.save(customer);
                });
    }

    public List<Customer> getCustomersByRubros(Set<Rubro> rubros) {
        List<Customer> clientesConRubro = new ArrayList<>();

        for (Rubro rubro : rubros) {
            List<Customer> clientesPorRubro = customerRepo.getByRubro(rubro);
            clientesConRubro.addAll(clientesPorRubro);
        }

        return clientesConRubro;
    }

    public List<Customer> getByRubro(Rubro rubro){
        return customerRepo.getByRubro(rubro);
    }
}
