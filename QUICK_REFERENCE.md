# ⚡ Quick Reference - SpringBootCrud

## 🚀 Start Application (30 seconds)

### Terminal 1 - Backend
```bash
cd C:\Users\pccre\OneDrive\Documents\TestPy\SpringBootCrud
mvn spring-boot:run
```
✓ Runs on: http://localhost:8080

### Terminal 2 - Frontend
```bash
cd C:\Users\pccre\OneDrive\Documents\TestPy\SpringBootCrud\frontend
npm install  # first time only
npm run dev
```
✓ Runs on: http://localhost:5173

### Terminal 3 - Access App
```
Open browser: http://localhost:5173
```

---

## 📍 Key Files Location

### Backend Java Files
```
src/main/java/com/examplecode/
  ├── Main.java .......................... Spring Boot entry point
  ├── controller/ContactController.java .. REST endpoints
  ├── service/ContactService.java ........ Business logic
  ├── repository/ContactRepository.java .. Data access
  └── entity/Contact.java ............... Database model
```

### Backend Config
```
src/main/resources/
  └── application.properties ............ Spring Boot config (port 8080, H2 DB)
```

### Frontend Files
```
frontend/src/
  ├── App.tsx ........................... Main app + routing
  ├── main.tsx .......................... React entry point
  ├── components/Contact/
  │   ├── ContactList.tsx .............. Display all contacts
  │   └── ContactForm.tsx .............. Create/edit form
  ├── services/
  │   ├── api.ts ....................... Axios config
  │   └── contactApi.ts ................ API methods
  ├── types/Contact.ts ................. TypeScript interface
  └── [styles] ......................... CSS files
```

### Build Configuration
```
pom.xml ........................... Maven backend config
frontend/package.json ............ npm frontend config
frontend/vite.config.ts .......... Vite config
```

---

## 🔗 Important URLs

| URL | Purpose |
|-----|---------|
| http://localhost:8080/api/contacts | Backend API |
| http://localhost:8080/h2-console | Database console |
| http://localhost:5173 | Frontend app |

---

## 📋 REST API Quick Reference

```bash
# GET all contacts
curl http://localhost:8080/api/contacts

# GET single contact
curl http://localhost:8080/api/contacts/1

# CREATE contact
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","phone":"555-1234"}'

# UPDATE contact
curl -X PUT http://localhost:8080/api/contacts/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com","phone":"555-5678"}'

# DELETE contact
curl -X DELETE http://localhost:8080/api/contacts/1
```

---

## ✅ Verification Commands

```bash
# Check Java version (need 17+)
java -version

# Check Node/npm version (need 16+)
node -v
npm -v

# Compile backend
mvn clean compile

# Install frontend deps
cd frontend && npm install

# Build frontend TypeScript
npm run build
```

---

## 🛠 Common Maven Commands

```bash
mvn clean compile          # Compile only
mvn clean package          # Package as JAR
mvn spring-boot:run        # Run application
mvn test                   # Run tests
mvn dependency:tree        # Show dependencies
```

---

## 📦 Common npm Commands

```bash
npm install                # Install dependencies
npm run dev                # Start dev server
npm run build              # Production build
npm run preview            # Preview build
npm start                  # Same as npm run dev
```

---

## 🐛 Emergency Fixes

### Port 8080 already in use
```properties
# Edit: src/main/resources/application.properties
server.port=8081
```

### Port 5173 already in use
```bash
# In frontend
npm run dev -- --port 5174
```

### Clear cache & reinstall
```bash
# Backend
mvn clean

# Frontend
rm -rf node_modules package-lock.json
npm install
```

### Clear database (H2)
- Restart backend (auto-recreates on startup)
- Or delete: C:\Users\pccre\AppData\Local\Temp\testdb.*

---

## 📖 Documentation

| File | Purpose |
|------|---------|
| README.md | Project overview |
| AGENTS.md | AI development guide (detailed) |
| SETUP_GUIDE.md | Setup & troubleshooting |
| PROJECT_VERIFICATION.md | Completeness checklist |
| QUICK_REFERENCE.md | This file |

---

## ✨ Features Implemented

- ✅ Backend: Spring Boot 3 REST API
- ✅ Frontend: React 18 with TypeScript
- ✅ Database: H2 with JPA/Hibernate
- ✅ Routing: React Router v6
- ✅ Styling: Responsive CSS
- ✅ API Client: Axios with typed methods
- ✅ CRUD: All operations working
- ✅ Error Handling: Try-catch throughout
- ✅ Loading States: UI feedback

---

## 🎯 Typical Workflow

1. **Start Backend**
   ```bash
   mvn spring-boot:run
   ```

2. **Start Frontend**
   ```bash
   cd frontend && npm run dev
   ```

3. **Create Contact**
   - Click "New Contact"
   - Fill form
   - Click "Save"

4. **View Contacts**
   - See in table
   - Edit or Delete

5. **Verify Database**
   - Visit http://localhost:8080/h2-console
   - Query: SELECT * FROM CONTACTS;

---

## 💡 Pro Tips

- Keep browser DevTools open (F12) to see API calls
- Check Network tab for API errors
- Use H2 console to debug database
- Check Spring Boot console for errors
- Frontend proxy configured in vite.config.ts

---

## 📞 Support

**Error?** Check SETUP_GUIDE.md troubleshooting section
**Questions?** See AGENTS.md for detailed architecture
**Verification?** Run PROJECT_VERIFICATION.md checklist

---

**Last Updated:** 2024-05-11
**Status:** ✅ Ready to Run

