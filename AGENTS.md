# AGENTS.md - SpringBootCrud Development Guide

## Project Overview
**SpringBootCrud** is a full-stack Spring Boot 3 + React application with Java 17 backend and modern frontend tooling. The project combines a REST API backend with a React frontend built with Vite and TypeScript.

### Tech Stack:
- **Backend**: Spring Boot 3, Java 17, Spring Data JPA, H2 Database
- **Frontend**: React, Vite, TypeScript
- **API Communication**: Axios
- **Build Tool**: Maven 4.0.0 (backend), npm/yarn (frontend)
- **Package Structure**: `com.examplecode`
- **Main Backend Directory**: `src/main/java/com/examplecode/`

---

## Architecture & Component Patterns

### Expected CRUD Structure
This project follows standard Spring Boot layered architecture:
- **Controllers** (`MainController.java` or similar): HTTP endpoints for CRUD operations
- **Services** (`MainService.java`): Business logic and data orchestration
- **Repositories**: Data access layer (typically using Spring Data JPA)
- **Entities/Models**: Domain objects matching database schema

### Data Flow Pattern
Request → Controller → Service → Repository → Database

### File Naming Conventions
- Controllers: `*Controller.java`
- Services: `*Service.java`
- Entities: Plain class names (e.g., `User.java`, `Product.java`)
- Test files: Mirror source structure in `src/test/java/`

### Backend Folder Structure
```
src/main/java/com/examplecode/
├── Main.java                          # Spring Boot application entry point
├── controller/
│   ├── UserController.java
│   ├── ProductController.java
│   └── [Resource]Controller.java      # One controller per entity
├── service/
│   ├── UserService.java
│   ├── ProductService.java
│   └── [Resource]Service.java         # Business logic layer
├── repository/
│   ├── UserRepository.java
│   ├── ProductRepository.java
│   └── [Resource]Repository.java      # JPA Repository interfaces
├── entity/
│   ├── User.java
│   ├── Product.java
│   └── [Resource].java                # JPA Entity classes
├── exception/
│   ├── ResourceNotFoundException.java
│   └── [Custom]Exception.java         # Custom exceptions
└── dto/
    ├── UserDTO.java
    └── [Resource]DTO.java             # Data transfer objects (optional)

src/main/resources/
├── application.properties              # Spring Boot configuration
├── schema.sql                          # Database schema initialization
└── data.sql                            # Sample data initialization

src/test/java/com/examplecode/
├── controller/
│   └── [Resource]ControllerTest.java
├── service/
│   └── [Resource]ServiceTest.java
└── repository/
    └── [Resource]RepositoryTest.java
```

---

## Dependencies & Configuration

### Backend Dependencies (pom.xml)
This project uses Spring Boot 3 with:
- Spring Boot Web Starter (`spring-boot-starter-web`)
- Spring Data JPA (`spring-boot-starter-data-jpa`)
- H2 Database (`com.h2database:h2`)
- Spring Boot DevTools (optional, for development)
- Testing: JUnit 5, Mockito (via Spring Boot Test Starter)

**Note**: pom.xml compiler source/target should be set to Java 17 (`<maven.compiler.source>17</maven.compiler.source>`)

### Backend Configuration
- Configuration files go in `src/main/resources/`
- Create `application.properties` with:
  ```properties
  spring.datasource.url=jdbc:h2:mem:testdb
  spring.datasource.driverClassName=org.h2.Driver
  spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
  spring.jpa.hibernate.ddl-auto=create-drop
  spring.h2.console.enabled=true
  server.port=8080
  ```
- Database initialization: `schema.sql`, `data.sql` in `src/main/resources/`
- H2 console accessible at `http://localhost:8080/h2-console` (development only)

### Frontend Dependencies (React + Vite)
- React framework with TypeScript
- Vite build tool (fast HMR development)
- Axios for HTTP requests to backend API
- Frontend project typically at `/frontend` or `/client`
- Package manager: npm or yarn

---

## Build & Execution Workflow

### Backend Compilation & Testing
```bash
mvn clean compile          # Compile Java code
mvn test                   # Run backend tests
mvn clean package          # Package as JAR
```

### Backend Execution
```bash
mvn spring-boot:run        # Run Spring Boot app (port 8080)
```

### Frontend Compilation & Execution (React + Vite)
```bash
cd frontend                # Navigate to frontend directory
npm install                # Install dependencies
npm run dev                # Start Vite dev server (usually port 5173)
npm run build              # Production build
npm run preview            # Preview production build
```

### Running Full Stack Locally
1. Start backend: `mvn spring-boot:run` (backend on :8080)
2. Start frontend: `cd frontend && npm run dev` (frontend on :5173)
3. React dev server proxies API calls to backend (configure if needed in `vite.config.ts`)

### Packaging
- Backend JAR: `target/SpringBootCrud-1.0-SNAPSHOT.jar`
- Frontend build: `frontend/dist/` directory (static files)

---

## Development Patterns for This Project

### Main Entry Point (Backend)
`src/main/java/com/examplecode/Main.java` should implement Spring Boot 3 pattern:
```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}
```

### CRUD Controller Pattern
```java
@RestController
@RequestMapping("/api/resource")
@CrossOrigin(origins = "*")  // Allow React frontend access
public class ResourceController {
    private final ResourceService resourceService;
    
    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }
    
    @GetMapping
    public List<Resource> getAll() { }
    
    @GetMapping("/{id}")
    public Resource getById(@PathVariable Long id) { }
    
    @PostMapping
    public Resource create(@RequestBody Resource resource) { }
    
    @PutMapping("/{id}")
    public Resource update(@PathVariable Long id, @RequestBody Resource resource) { }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { }
}
```

### Service Layer Pattern
- Use constructor injection (preferred) instead of field injection
- Encapsulate business logic away from controllers
- Throw custom exceptions (extend RuntimeException for unchecked exceptions)
- Services handle H2 transaction management

### Entity/Repository Pattern (Spring Data JPA)
```java
@Entity
@Table(name = "resources")
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // fields...
}

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    // Spring Data JPA provides findAll(), findById(), save(), delete() automatically
    // Add custom query methods as needed
}
```

### Frontend Integration with Axios
React components communicate with backend via Axios:
```typescript
// Example API client
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getResources = async () => {
  return axios.get(`${API_URL}/resources`);
};
```

---

## Spring Boot CRUD Pattern Reference

### Entity Pattern
```java
package com.examplecode.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "contacts")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    
    @Column(name = "phone")
    private String phone;
    
    // Constructors
    public Contact() {}
    
    public Contact(String name, String email, String phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    
    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}
```

### Repository Pattern
```java
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
```

### Service Pattern
```java
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
```

### Controller Pattern
```java
package com.examplecode.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.examplecode.entity.Contact;
import com.examplecode.service.ContactService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "*")
public class ContactController {
    private final ContactService contactService;
    
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }
    
    // GET /api/contacts - Retrieve all contacts
    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {
        List<Contact> contacts = contactService.findAll();
        return ResponseEntity.ok(contacts);
    }
    
    // GET /api/contacts/{id} - Retrieve contact by ID
    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
        Optional<Contact> contact = contactService.findById(id);
        return contact.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // POST /api/contacts - Create new contact
    @PostMapping
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
        Contact savedContact = contactService.save(contact);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedContact);
    }
    
    // PUT /api/contacts/{id} - Update existing contact
    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable Long id, @RequestBody Contact contactDetails) {
        Optional<Contact> existingContact = contactService.findById(id);
        if (existingContact.isPresent()) {
            Contact contact = existingContact.get();
            contact.setName(contactDetails.getName());
            contact.setEmail(contactDetails.getEmail());
            contact.setPhone(contactDetails.getPhone());
            Contact updatedContact = contactService.save(contact);
            return ResponseEntity.ok(updatedContact);
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE /api/contacts/{id} - Delete contact by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        Optional<Contact> contact = contactService.findById(id);
        if (contact.isPresent()) {
            contactService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
```

### Key Implementation Details
- **Packages**: Follow `com.examplecode.{entity,repository,service,controller}` structure
- **Entity**: Use `@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@Column` annotations
- **Repository**: Extend `JpaRepository<T, Long>` - no implementation needed, Spring Data JPA provides CRUD automatically
- **Service**: Use constructor injection for dependencies, provide business logic methods (findAll, findById, save, deleteById)
- **Controller**: 
  - Use `@RestController` and `@RequestMapping("/api/resource")`
  - Add `@CrossOrigin(origins = "*")` for React frontend access
  - Return `ResponseEntity` with appropriate HTTP status codes (200 OK, 201 CREATED, 204 NO_CONTENT, 404 NOT_FOUND)
  - Each endpoint maps to one HTTP method (GET, POST, PUT, DELETE)

---

## React CRUD Pattern Reference

### Axios API Client Pattern
```typescript
// frontend/src/services/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

### Typed API Service Pattern
```typescript
// frontend/src/services/contactApi.ts
import api from './api';
import { Contact } from '../types';

export const contactApi = {
  // Fetch all contacts
  getAll: async (): Promise<Contact[]> => {
    try {
      const response = await api.get('/contacts');
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  // Fetch contact by ID
  getById: async (id: number): Promise<Contact> => {
    try {
      const response = await api.get(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error);
      throw error;
    }
  },

  // Create new contact
  create: async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
    try {
      const response = await api.post('/contacts', contact);
      return response.data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },

  // Update existing contact
  update: async (id: number, contact: Omit<Contact, 'id'>): Promise<Contact> => {
    try {
      const response = await api.put(`/contacts/${id}`, contact);
      return response.data;
    } catch (error) {
      console.error(`Error updating contact ${id}:`, error);
      throw error;
    }
  },

  // Delete contact
  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/contacts/${id}`);
    } catch (error) {
      console.error(`Error deleting contact ${id}:`, error);
      throw error;
    }
  },
};
```

### TypeScript Type Pattern
```typescript
// frontend/src/types/Contact.ts
export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

// frontend/src/types/index.ts
export * from './Contact';
```

### Contact List Component Pattern
```typescript
// frontend/src/components/Contact/ContactList.tsx
import { useEffect, useState } from 'react';
import { Contact } from '../../types';
import { contactApi } from '../../services/contactApi';
import './ContactList.css';

export const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await contactApi.getAll();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch contacts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure?')) {
      try {
        await contactApi.delete(id);
        setContacts(contacts.filter(c => c.id !== id));
      } catch (err) {
        setError('Failed to delete contact');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="contact-list">
      <h2>Contacts</h2>
      {contacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone || '-'}</td>
                <td>
                  <button onClick={() => window.location.href = `/contacts/edit/${contact.id}`}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(contact.id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
```

### Contact Form Component Pattern
```typescript
// frontend/src/components/Contact/ContactForm.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Contact } from '../../types';
import { contactApi } from '../../services/contactApi';
import './ContactForm.css';

export const ContactForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<Contact, 'id'>>({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadContact();
    }
  }, [id]);

  const loadContact = async () => {
    try {
      setLoading(true);
      const contact = await contactApi.getById(Number(id));
      setFormData({ name: contact.name, email: contact.email, phone: contact.phone || '' });
      setError(null);
    } catch (err) {
      setError('Failed to load contact');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await contactApi.update(Number(id), formData);
        navigate(`/contacts/${id}`);
      } else {
        const newContact = await contactApi.create(formData);
        navigate(`/contacts/${newContact.id}`);
      }
    } catch (err) {
      setError('Failed to save contact');
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) return <div>Loading...</div>;

  return (
    <div className="contact-form">
      <h2>{id ? 'Edit Contact' : 'New Contact'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Contact'}
        </button>
        <button type="button" onClick={() => navigate('/contacts')}>
          Cancel
        </button>
      </form>
    </div>
  );
};
```

### React Router Setup Pattern
```typescript
// frontend/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContactList } from './components/Contact/ContactList';
import { ContactForm } from './components/Contact/ContactForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Contact Manager</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/contacts">Contacts</a>
            <a href="/contacts/new">New Contact</a>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/contacts/new" element={<ContactForm />} />
            <Route path="/contacts/edit/:id" element={<ContactForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
```

### Key Implementation Details
- **API Service**: Centralize all backend calls in typed service files with error handling
- **Components**: Keep UI logic separate from API logic using hooks (useState, useEffect)
- **Types**: Use TypeScript interfaces matching backend DTOs for type safety
- **Forms**: Use React hooks for form state management with onChange handlers
- **Routing**: Use React Router v6 for navigation with dynamic route parameters
- **Error Handling**: Always wrap API calls in try-catch and display user-friendly error messages
- **Loading States**: Show loading indicators during async operations to improve UX

---

## Important Conventions

1. **Backend Encoding**: UTF-8 (specified in pom.xml)
2. **Java Version**: Java 17 (pom.xml compiler source/target)
3. **Backend Package naming**: Reverse domain notation starting with `com.examplecode`
4. **Test organization**: Mirror source structure exactly in `src/test/java/`
5. **IDE**: IntelliJ IDEA (backend), VS Code or WebStorm (frontend) common
6. **Frontend Language**: TypeScript for type safety across React components
7. **CORS**: Controllers use `@CrossOrigin` to allow React frontend requests
8. **Dependency Injection**: Use constructor injection (not field injection with `@Autowired`) - it's testable, immutable, and recommended by Spring
9. **API Ports**: Backend :8080, Frontend (Vite) :5173 during development
10. **Frontend File Naming**: camelCase for files (`userService.ts`, `UserForm.tsx`)
11. **React Component Files**: `.tsx` extension (contains JSX/TSX)
12. **TypeScript Files**: `.ts` extension (services, types, utils)
13. **API Endpoint Naming**: RESTful - lowercase plural resources (`/api/users`, `/api/products`)
14. **Axios Error Handling**: Always use try-catch or .catch() on API calls
15. **Type Safety**: Use strict TypeScript mode - avoid `any` type unless necessary
16. **Environment Variables**: Use `.env.local` for local development, never commit secrets

---

## Full-Stack Architecture

### Data Flow
```
React Component → Axios Request → Spring REST Controller → Service → JPA Repository
→ H2 Database → Repository → Service → Controller Response → React Component
```

### Frontend Folder Structure
```
frontend/                                  # React + Vite application root
├── src/
│   ├── components/
│   │   ├── UserForm.tsx                  # Reusable form components
│   │   ├── ProductList.tsx               # Reusable list/display components
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── Error.tsx                 # Shared UI components
│   │   └── [FeatureName]/               # Feature-specific components
│   │       └── [Component].tsx
│   ├── pages/
│   │   ├── Home.tsx                     # Page components (full pages)
│   │   ├── UserPage.tsx
│   │   ├── ProductPage.tsx
│   │   └── NotFound.tsx                 # 404 page
│   ├── services/
│   │   ├── api.ts                       # Axios base configuration
│   │   ├── userService.ts               # API calls for User entity
│   │   ├── productService.ts            # API calls for Product entity
│   │   └── [resource]Service.ts         # One service per backend entity
│   ├── types/
│   │   ├── User.ts                      # TypeScript interfaces matching backend DTOs
│   │   ├── Product.ts
│   │   └── index.ts                     # Re-export all types
│   ├── utils/
│   │   ├── constants.ts                 # App constants, API URLs
│   │   ├── helpers.ts                   # Utility functions
│   │   └── formatters.ts                # Data formatting utilities
│   ├── hooks/
│   │   ├── useFetch.ts                  # Custom React hooks
│   │   └── useForm.ts                   # Form state management hook
│   ├── App.tsx                          # Main App component with routing
│   ├── App.css                          # Global styles
│   ├── index.css                        # Index styles
│   └── main.tsx                         # Application entry point
├── public/
│   └── favicon.svg                      # Static assets
├── index.html                           # HTML template
├── vite.config.ts                       # Vite build configuration
├── tsconfig.json                        # TypeScript configuration
├── package.json                         # NPM dependencies and scripts
├── package-lock.json                    # Locked dependency versions
└── .env.local (optional)                # Environment variables (API URL, etc)
```

### API Endpoint Patterns
- `GET /api/resources` - Fetch all
- `GET /api/resources/{id}` - Fetch by ID
- `POST /api/resources` - Create new
- `PUT /api/resources/{id}` - Update
- `DELETE /api/resources/{id}` - Delete

### Cross-Origin Considerations
- React frontend (port 5173) communicates with backend (port 8080)
- Use `@CrossOrigin(origins = "*")` or specify allowed origins in controllers
- Alternatively, configure CORS in Spring Boot security config

---

## Common AI Agent Tasks

### Adding New CRUD Entity (Backend)
1. **Create Entity** in `src/main/java/com/examplecode/entity/[Resource].java`
   - Use `@Entity`, `@Table(name="resources")` annotations
   - Include `@Id @GeneratedValue` for primary key
   
2. **Create Repository** in `src/main/java/com/examplecode/repository/[Resource]Repository.java`
   - Extend `JpaRepository<Resource, Long>`
   - Spring Data JPA auto-generates CRUD methods
   
3. **Create Service** in `src/main/java/com/examplecode/service/[Resource]Service.java`
   - Annotate with `@Service`
   - Autowire the repository
   - Implement business logic methods
   
4. **Create Controller** in `src/main/java/com/examplecode/controller/[Resource]Controller.java`
   - Annotate with `@RestController` and `@RequestMapping("/api/resource")`
   - Add `@CrossOrigin(origins = "*")` for React access
   - Implement GET, POST, PUT, DELETE endpoints
   
5. **Update Database Config** in `src/main/resources/application.properties`
   - Ensure `spring.jpa.hibernate.ddl-auto=create-drop` to auto-create tables
   
6. **Optional: Add Exception** in `src/main/java/com/examplecode/exception/[Resource]NotFoundException.java`
   - Extend `RuntimeException`
   - Use in service layer for error handling
   
7. **Optional: Create Tests** in `src/test/java/com/examplecode/`
   - `controller/[Resource]ControllerTest.java` - test endpoints
   - `service/[Resource]ServiceTest.java` - test business logic
   - `repository/[Resource]RepositoryTest.java` - test data access

8. **Add React Component** in frontend to consume the API endpoints

### Adding New React Feature (Frontend)
1. **Create Type** in `frontend/src/types/[Resource].ts`
   - Export TypeScript interface matching backend entity
   - Example: `interface User { id: number; name: string; email: string; }`

2. **Create API Service** in `frontend/src/services/[resource]Service.ts`
   - Use Axios to call backend `/api/[resources]` endpoints
   - Export functions: `getAll()`, `getById()`, `create()`, `update()`, `delete()`
   - Example: `export const getUsers = async () => axios.get('/users');`

3. **Create Components** in `frontend/src/components/[FeatureName]/`
   - `[Resource]List.tsx` - Display all items (GET /api/resources)
   - `[Resource]Form.tsx` - Add/edit form (POST/PUT)
   - `[Resource]Detail.tsx` - Single item view (GET /api/resources/:id)

4. **Create Page** in `frontend/src/pages/[Resource]Page.tsx`
   - Orchestrate components for full page
   - Handle loading/error states
   - Integrate with React Router

5. **Update App.tsx**
   - Add route: `<Route path="./[resource]" element={<[Resource]Page />} />`

6. **Test with Backend**
   - Run `mvn spring-boot:run` (backend on :8080)
   - Run `npm run dev` (frontend on :5173)
   - Check Network tab in DevTools for API calls

### Debugging Full-Stack
- **Backend**: Run with `mvn spring-boot:run`, check logs in console
- **Frontend**: Open Dev Tools (F12), check Network tab for API calls
- **H2 Console**: Access at `http://localhost:8080/h2-console` during dev
- **Common Issues**:
  - CORS errors: Add `@CrossOrigin` to controller or configure Spring CORS
  - Port conflicts: Check if :8080 or :5173 already in use
  - TypeScript errors: Check `tsconfig.json` compatibility

---

## Files to Know

### Backend Structure Overview

#### Backend Source Code (`src/main/java/com/examplecode/`)
- **Main.java**: Application entry point with `@SpringBootApplication` annotation
- **controller/**: REST API endpoints - receives HTTP requests, delegates to services
- **service/**: Business logic layer - orchestrates operations, handles transactions
- **repository/**: Data access layer - JPA interface extending `JpaRepository`
- **entity/**: Domain model classes with `@Entity`, `@Table` annotations
- **exception/**: Custom exception classes for error handling
- **dto/**: Data Transfer Objects (optional) - map entities to API responses

#### Backend Resources (`src/main/resources/`)
- **application.properties**: Spring Boot configuration (database, port, logging)
- **schema.sql**: H2 database table creation scripts (auto-executed on startup)
- **data.sql**: Sample data insertion scripts (auto-executed on startup)

#### Backend Tests (`src/test/java/com/examplecode/`)
- Mirror the source structure exactly
- **controller/**: Controller integration tests using `@WebMvcTest`
- **service/**: Service unit tests using `@Test` with mocks
- **repository/**: Repository tests using `@DataJpaTest`

#### Project Root Files
- **pom.xml**: Maven configuration - dependencies, Java 17 compiler, build plugins
- **.gitignore**: Standard Java/Spring Boot and frontend exclude patterns

### Frontend Structure Overview

#### Frontend Source Code (`frontend/src/`)
- **components/**: Reusable React components split into feature areas
  - **common/**: Shared UI components (Header, Footer, Loading spinners, Error messages)
  - **[FeatureName]/**: Feature-specific components organized by domain
- **pages/**: Full-page components (typically routed with React Router)
- **services/**: Axios API client - CRITICAL for backend communication
  - **api.ts**: Base Axios instance with baseURL `http://localhost:8080/api`
  - **[resource]Service.ts**: One service per backend entity
- **types/**: TypeScript interfaces/types (match backend DTOs for type safety)
  - Common conventions: `User.ts`, `Product.ts`, etc.
  - Export all from `index.ts` for cleaner imports
- **utils/**: Helper functions and constants
  - **constants.ts**: API URLs, app settings
  - **helpers.ts**: Reusable utility functions
  - **formatters.ts**: Data formatting (dates, currency, etc)
- **hooks/**: Custom React hooks for state management and logic reuse
  - `useFetch()`: For data fetching patterns
  - `useForm()`: For form state management
- **App.tsx**: Main component - sets up Router and page layout
- **main.tsx**: Application entry point (ReactDOM.render)

#### Frontend Configuration Files
- **vite.config.ts**: Vite build configuration
  - Configure API proxy if needed: `http://localhost:5173/api → http://localhost:8080/api`
- **tsconfig.json**: TypeScript configuration
  - Ensure strict type checking is enabled for quality
- **package.json**: NPM dependencies and scripts
  - **Scripts**: `npm run dev`, `npm run build`, `npm run preview`
  - **Dependencies**: `react`, `axios`, optional `react-router-dom`
- **.env.local** (optional): Environment variables
  - `VITE_API_URL=http://localhost:8080/api` (for development)
  - Use `import.meta.env.VITE_API_URL` to access in code

#### Frontend Public Assets (`frontend/public/`)
- Static files served as-is by Vite (favicon, images, etc)
- Files here accessible at `/` in app

