package com.plancton.controllers;


import ch.qos.logback.core.net.server.Client;
import com.plancton.models.*;
import com.plancton.services.CategoryService;
import com.plancton.services.CustomerService;
import com.plancton.services.NormativaService;
import com.plancton.services.RubroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("http://localhost:3000")
public class NormativaController {

    @Autowired
    private NormativaService service;

    @Autowired
    private CategoryService serviceCategory;

    @Autowired
    private CustomerService serviceCustomer;

    @Autowired
    private RubroService serviceRubro;

    @GetMapping("/normativa")
    public List<Normativa> listNormativas(){


        return service.getAll();

    }

    @GetMapping("/normativa/{id}")
    Normativa getNormativaById(@PathVariable Long id){
        return service.getById(id);
    }

    @PutMapping ("/normativa/{id}")
    Optional<Normativa> updateNormativa(@RequestBody Normativa newNormativa,@PathVariable Long id) {
        return service.updateNormativa(id, newNormativa);
    }

    @DeleteMapping("/normativa/{id}")
    String deleteNormativa(@PathVariable Long id){

        service.deleteById(id);
        return  "User with id "+id+" has been deleted success.";
    }





    @PostMapping("/normativa")
    public Normativa registerNormativa(@RequestBody NormativaRequest normativaRequest){

        String norma=normativaRequest.getNorma();
        String title=normativaRequest.getTitle();
        String authority=normativaRequest.getAuthority();
        String organism=normativaRequest.getOrganism();
        String jurisdiction=normativaRequest.getJurisdiction();
        Boolean current=normativaRequest.isCurrent();






        Normativa newNormativa=new Normativa(norma,title,authority,organism,jurisdiction,current);

        Integer []categoriesIds=normativaRequest.getCategoryIds();
        Set<Category> categories=newNormativa.getCategories();

        for (int id: categoriesIds) {
            // El valor de "numero" será cada elemento del array en cada iteración
            categories.add(serviceCategory.getById(id));
        }


        newNormativa.setCategories(categories);

        Integer []rubroIds=normativaRequest.getRubrosIds();
        Set<Rubro> rubros=newNormativa.getRubroList();

        for (int id: rubroIds) {
            // El valor de "numero" será cada elemento del array en cada iteración
            rubros.add(serviceRubro.getById(id));
        }


        newNormativa.setRubroList(rubros);






        return service.registerNormativa(newNormativa);
    }

    @PostMapping("/asignarNormativaARubros")
    public String asignarNormativaARubros(@RequestBody NormativaRequest normativaRequest) {


        Integer []rubroIds=normativaRequest.getRubrosIds();
        Set<Rubro> rubros=new HashSet<>();

        for (int id: rubroIds) {
            // El valor de "numero" será cada elemento del array en cada iteración
            rubros.add(serviceRubro.getById(id));
        }



        List<Customer> clientesConRubro = serviceCustomer.getCustomersByRubros(rubros);



        for (Customer cliente : clientesConRubro) {

            serviceCustomer.updateCustomer(cliente.getCustomerId(),normativaRequest.getNorma()); // Actualiza el cliente con la nueva asignación
       }




        for (Customer cliente : clientesConRubro) {

            System.out.println("Cliente ID: " + cliente.getCustomerId());
            System.out.println("Nombre de la Compañía: " + cliente.getCompany());
            System.out.println("Rubros:");


            System.out.println();
        }

    return "ok";
    }

    @PostMapping("/normativa/{normativaId}/categorias/{categoriaId}")
    public ResponseEntity<String> agregarCategoriaANormativa(@PathVariable Integer normativaId, @PathVariable Integer categoriaId) {
        try {
            // Obtén la normativa y la categoría por sus IDs
            Normativa normativa = service.getById(2L);
            Category categoria = serviceCategory.getById(2);

            if (normativa == null || categoria == null) {
                // Maneja el caso en el que la normativa o la categoría no existen
                return ResponseEntity.notFound().build();
            }

            // Asocia la categoría a la normativa

            normativa.getCategories().add(categoria);


            service.updateNormativa(2L,normativa);



            return ResponseEntity.ok("Categoría agregada exitosamente a la normativa.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al agregar la categoría a la normativa.");
        }
    }

    @PostMapping("/normativas")
    public Normativa registerNormativas(@RequestBody Normativa normativa){






        return service.registerNormativa(normativa);
    }



}