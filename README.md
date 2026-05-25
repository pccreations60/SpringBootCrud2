# 🚀 SpringBootCrud - Full-Stack CRUD Application

A complete full-stack Spring Boot 3 + React 18 CRUD application for managing contacts.

## 📋 Project Structure

```
SpringBootCrud/
├── src/
│   ├── main/
│   │   ├── java/com/examplecode/
│   │   │   ├── Main.java                    # Spring Boot entry point
│   │   │   ├── controller/ContactController.java
│   │   │   ├── service/ContactService.java
│   │   │   ├── repository/ContactRepository.java
│   │   │   └── entity/Contact.java
│   │   └── resources/
│   │       └── application.properties       # Spring Boot config
│   └── test/                                # Test directory
├── frontend/                                # React + Vite application
│   ├── src/
│   │   ├── components/Contact/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── pom.xml                                  # Maven configuration
├── AGENTS.md                                # AI development guide
├── SETUP_GUIDE.md                          # Setup & troubleshooting
├── PROJECT_VERIFICATION.md                 # Verification checklist
└── README.md                                # This file
```

---

## 🛠 Tech Stack

### Backend
- **Spring Boot 3.2.0** - Application framework
- **Java 17** - Programming language
- **Spring Data JPA** - ORM framework
- **H2 Database** - In-memory database
- **Maven 4.0.0** - Build tool

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **React Router v6** - Routing
- **Axios** - HTTP client

---

## ✨ Features

### CRUD Operations
- ✅ **Create** - Add new contacts
- ✅ **Read** - View all contacts and individual details
- ✅ **Update** - Edit existing contacts
- ✅ **Delete** - Remove contacts

### User Interface
- ✅ Responsive design
- ✅ Clean, professional styling
- ✅ Loading indicators
- ✅ Error messages
- ✅ Form validation

### Backend API
- ✅ RESTful endpoints
- ✅ Proper HTTP status codes
- ✅ CORS enabled for frontend
- ✅ Data persistence with JPA

---

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 16+ and npm 8+

### 1. Start Backend

```bash
# Navigate to project root
cd C:\Users\pccre\OneDrive\Documents\TestPy\SpringBootCrud

# Compile and run
mvn clean compile
mvn spring-boot:run
```

Backend will start on: `http://localhost:8080`

### 2. Start Frontend

```bash
# Open new terminal in frontend directory
cd frontend

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev
```

Frontend will start on: `http://localhost:5173`

### 3. Access Application

Open your browser to: `http://localhost:5173`

---

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contacts` | Fetch all contacts |
| GET | `/api/contacts/{id}` | Fetch contact by ID |
| POST | `/api/contacts` | Create new contact |
| PUT | `/api/contacts/{id}` | Update contact |
| DELETE | `/api/contacts/{id}` | Delete contact |

### Example Requests

#### Create Contact
```bash
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234"
  }'
```

#### Get All Contacts
```bash
curl http://localhost:8080/api/contacts
```

---

## 🧪 Testing

### Using the UI
1. Navigate to `http://localhost:5173`
2. Click "New Contact" to create
3. Enter contact details
4. Click "Save Contact"
5. View in contacts table
6. Edit or delete as needed

### Using H2 Console
1. Open `http://localhost:8080/h2-console`
2. Login (SA user, no password)
3. Query: `SELECT * FROM CONTACTS;`

### Using curl/Postman
See API Endpoints section above

---

## 📖 Documentation

- **[AGENTS.md](./AGENTS.md)** - Comprehensive development guide for AI agents
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Setup instructions & troubleshooting
- **[PROJECT_VERIFICATION.md](./PROJECT_VERIFICATION.md)** - Project completeness checklist
- **[frontend/README.md](./frontend/README.md)** - Frontend-specific documentation

---

## 📦 Build & Deployment

### Backend

```bash
# Package as JAR
mvn clean package

# Run JAR
java -jar target/SpringBootCrud-1.0-SNAPSHOT.jar
```

### Frontend

```bash
# Build for production
npm run build

# Output: frontend/dist/
```

---

## 🔧 Configuration

### Backend (application.properties)
- **Database**: H2 in-memory (auto-recreated on startup)
- **Port**: 8080
- **DDL**: create-drop (auto-create and drop tables)
- **Console**: http://localhost:8080/h2-console

### Frontend (vite.config.ts)
- **Dev Port**: 5173
- **API Proxy**: `/api` → `http://localhost:8080`
- **Build Tool**: Vite with React plugin

---

## 🐛 Troubleshooting

See **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** for:
- Port conflicts
- Maven/npm issues
- CORS errors
- Database issues
- TypeScript errors

---

## 📝 Architecture

### Data Flow
```
React Component 
  → useEffect/useState 
  → Axios API call 
  → Spring Controller 
  → Service Layer 
  → JPA Repository 
  → H2 Database
```

### Layered Architecture
```
Frontend (React + TypeScript)
    ↓
API Layer (Axios)
    ↓
Backend (Spring Boot 3)
    ↓ Controller
    ↓ Service
    ↓ Repository
    ↓
Database (H2)
```

---

## 📚 Key Files

### Backend
- `Main.java` - Application entry point
- `ContactEntity.java` - JPA entity
- `ContactRepository.java` - Data access
- `ContactService.java` - Business logic
- `ContactController.java` - REST endpoints

### Frontend
- `App.tsx` - Router and layout
- `ContactList.tsx` - Display contacts
- `ContactForm.tsx` - Create/edit form
- `contactApi.ts` - API client
- `Contact.ts` - TypeScript types

---

## ✅ Verification

Run verification checklist to ensure all components are in place:

```bash
# Backend: Verify compilation
mvn clean compile

# Frontend: Verify TypeScript
cd frontend
npm run build
```

See **[PROJECT_VERIFICATION.md](./PROJECT_VERIFICATION.md)** for complete checklist.

---

## 🤖 AI Agent Instructions

See **[AGENTS.md](./AGENTS.md)** for comprehensive instructions on:
- Architecture patterns
- Folder structure
- Development workflows
- CRUD patterns (backend & frontend)
- Common tasks for AI agents

---

## 📄 License

This project is provided as-is for educational purposes.

---

## 🎯 Next Steps

1. ✅ Start backend: `mvn spring-boot:run`
2. ✅ Start frontend: `cd frontend && npm run dev`
3. ✅ Open browser: `http://localhost:5173`
4. ✅ Create your first contact!

---

**Happy coding! 🎉**

For issues or questions, refer to the documentation files or check the source code comments.

