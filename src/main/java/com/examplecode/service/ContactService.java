package com.examplecode.service;

import org.springframework.stereotype.Service;
import com.examplecode.entity.Contact;
import com.examplecode.repository.ContactRepository;
import java.util.List;
import java.util.Optional;

@Service
public class ContactService {
    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    // GET all contacts
    public List<Contact> findAll() {
        return contactRepository.findAll();
    }

    // GET contact by ID
    public Optional<Contact> findById(Long id) {
        return contactRepository.findById(id);
    }

    // CREATE or UPDATE contact
    public Contact save(Contact contact) {
        return contactRepository.save(contact);
    }

    // DELETE contact by ID
    public void deleteById(Long id) {
        contactRepository.deleteById(id);
    }
}

