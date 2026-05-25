package com.examplecode.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.examplecode.entity.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    // Spring Data JPA automatically provides:
    // - findAll()           -> GET all contacts
    // - findById(Long id)   -> GET contact by ID
    // - save(Contact)       -> POST/PUT new or update contact
    // - deleteById(Long id) -> DELETE contact by ID
    // - delete(Contact)     -> DELETE contact
}

