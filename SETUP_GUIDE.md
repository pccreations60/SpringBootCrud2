# SpringBootCrud - Setup & Verification Guide

## ✅ Project Structure Verification

### Backend Structure
```
src/main/java/com/examplecode/
├── Main.java                     ✅ Spring Boot entry point
├── controller/
│   └── ContactController.java    ✅ REST endpoints
├── service/
│   └── ContactService.java       ✅ Business logic
├── repository/
│   └── ContactRepository.java    ✅ Data access (JPA)
└── entity/
    └── Contact.java              ✅ JPA entity

src/main/resources/
├── application.properties         ✅ Spring Boot config
└── [schema.sql, data.sql]         📝 Optional: add sample data

src/test/java/com/examplecode/    📝 (Optional) add tests
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/Contact/
│   │   ├── ContactList.tsx       ✅ List all contacts
│   │   ├── ContactForm.tsx       ✅ Create/Edit form
│   │   ├── ContactList.css       ✅ Table styling
│   │   └── ContactForm.css       ✅ Form styling
│   ├── services/
│   │   ├── api.ts                ✅ Axios config
│   │   └── contactApi.ts         ✅ API methods
│   ├── types/
│   │   ├── Contact.ts            ✅ TypeScript types
│   │   └── index.ts              ✅ Type exports
│   ├── App.tsx                   ✅ Router & layout
│   ├── App.css                   ✅ App styles
│   ├── index.css                 ✅ Global styles
│   └── main.tsx                  ✅ React entry point
├── index.html                    ✅ HTML template
├── vite.config.ts                ✅ Vite config
├── tsconfig.json                 ✅ TypeScript config
├── package.json                  ✅ Dependencies
└── .env.local                    ✅ Env variables
```

---

## 🚀 Setup Instructions

### Prerequisites
- Java 17+ (check: `java -version`)
- Node.js 16+ (check: `node -v`)
- npm 8+ (check: `npm -v`)

### Backend Setup

#### 1. Update pom.xml
✅ Already done - Spring Boot 3.2.0 parent with all dependencies

#### 2. Configure application.properties
✅ Already done - H2 database configured:
- Database: `jdbc:h2:mem:testdb`
- Auto DDL: `create-drop`
- H2 Console: `http://localhost:8080/h2-console`
- Server Port: `8080`

#### 3. Compile Backend
```bash
cd C:\Users\pccre\OneDrive\Documents\TestPy\SpringBootCrud
mvn clean compile
```

#### 4. Run Backend
```bash
mvn spring-boot:run
```
✓ Backend should start on `http://localhost:8080`
✓ H2 Console available at `http://localhost:8080/h2-console`

### Frontend Setup

#### 1. Install Dependencies
```bash
cd frontend
npm install
```

#### 2. Start Dev Server
```bash
npm run dev
```
✓ Frontend should start on `http://localhost:5173`

---

## ✅ Verification Checklist

### Backend Verification

- [ ] Java files compile without errors
- [ ] pom.xml has correct Spring Boot parent (3.2.0)
- [ ] pom.xml has all required dependencies:
  - [ ] spring-boot-starter-web
  - [ ] spring-boot-starter-data-jpa
  - [ ] h2database
  - [ ] spring-boot-devtools
  - [ ] spring-boot-starter-test
- [ ] application.properties configured:
  - [ ] H2 database URL correct
  - [ ] JPA DDL auto set to create-drop
  - [ ] Server port is 8080
  - [ ] CORS not needed (Spring Boot handles it)
- [ ] Entity created: Contact.java
  - [ ] @Entity annotation present
  - [ ] @Table(name="contacts") present
  - [ ] @Id @GeneratedValue present
  - [ ] All fields have @Column annotations
- [ ] Repository created: ContactRepository.java
  - [ ] Extends JpaRepository<Contact, Long>
  - [ ] @Repository annotation present
- [ ] Service created: ContactService.java
  - [ ] @Service annotation present
  - [ ] All 4 methods: findAll, findById, save, deleteById
- [ ] Controller created: ContactController.java
  - [ ] @RestController annotation present
  - [ ] @RequestMapping("/api/contacts") present
  - [ ] @CrossOrigin(origins = "*") present
  - [ ] All 5 endpoints implemented:
    - [ ] GET /api/contacts
    - [ ] GET /api/contacts/{id}
    - [ ] POST /api/contacts
    - [ ] PUT /api/contacts/{id}
    - [ ] DELETE /api/contacts/{id}
  - [ ] All return ResponseEntity with proper HTTP status codes

### Frontend Verification

- [ ] Node modules can be installed: `npm install`
- [ ] TypeScript compiles: `npm run build`
- [ ] Dev server starts: `npm run dev`
- [ ] Types defined: Contact.ts
- [ ] API service created: contactApi.ts
  - [ ] All 5 CRUD methods present
  - [ ] Proper try-catch error handling
- [ ] Components created:
  - [ ] ContactList.tsx (displays contacts)
  - [ ] ContactForm.tsx (create/edit form)
- [ ] Routing configured: App.tsx
  - [ ] React Router v6 setup
  - [ ] All routes present
- [ ] Styling files present:
  - [ ] App.css
  - [ ] ContactList.css
  - [ ] ContactForm.css
  - [ ] index.css

---

## 🧪 API Testing

### Test Backend Endpoints

Once backend is running on `http://localhost:8080`:

#### 1. GET all contacts
```
GET http://localhost:8080/api/contacts
Expected: 200 OK, empty array []
```

#### 2. POST create contact
```
POST http://localhost:8080/api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234"
}

Expected: 201 CREATED, returns contact with id
```

#### 3. GET single contact
```
GET http://localhost:8080/api/contacts/1
Expected: 200 OK, returns contact
```

#### 4. PUT update contact
```
PUT http://localhost:8080/api/contacts/1
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "555-5678"
}

Expected: 200 OK, returns updated contact
```

#### 5. DELETE contact
```
DELETE http://localhost:8080/api/contacts/1
Expected: 204 NO_CONTENT
```

---

## 🐛 Troubleshooting

### Backend Issues

**Error: Maven not found**
- Install Maven or use Maven wrapper (.mvn)
- Or use IDE built-in Maven

**Error: Java version mismatch**
- Set `JAVA_HOME` to Java 17+
- Check `java -version`

**Error: Port 8080 already in use**
- Change in `application.properties`: `server.port=8081`
- Or kill process using port 8080

**Error: H2 console not accessible**
- Check `spring.h2.console.enabled=true` in properties
- Access at `http://localhost:8080/h2-console`

### Frontend Issues

**Error: npm modules not installing**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Error: TypeScript compilation errors**
- Check `tsconfig.json` is valid
- Ensure imports match file structure exactly

**Error: API calls failing (CORS)**
- Backend controller must have `@CrossOrigin(origins = "*")`
- Check vite.config.ts proxy is correct

**Error: Vite dev server not starting**
- Ensure port 5173 is available
- Check vite.config.ts configuration

---

## 📋 Next Steps

1. **Backend**
   - Run: `mvn clean compile`
   - Run: `mvn spring-boot:run`
   - Verify: Open `http://localhost:8080/h2-console`

2. **Frontend**
   - Run: `cd frontend && npm install`
   - Run: `npm run dev`
   - Verify: Open `http://localhost:5173`

3. **Test CRUD Operations**
   - Create a contact via the UI
   - Edit a contact
   - Delete a contact
   - Verify in H2 console

4. **Deploy (Optional)**
   - Backend: `mvn clean package` (creates JAR)
   - Frontend: `npm run build` (creates dist/)

---

## 📝 Common Commands

### Backend
```bash
# Compile only
mvn clean compile

# Run tests
mvn test

# Run application
mvn spring-boot:run

# Package as JAR
mvn clean package

# View dependencies
mvn dependency:tree
```

### Frontend
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for TypeScript errors
npm run build
```

---

✅ **All files are now in place and ready to run!**

For questions, refer to AGENTS.md in the project root.

