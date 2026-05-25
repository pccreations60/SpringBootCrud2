# Database Viewing Guide - H2 Database

## Current Database Contents

**Table:** CONTACTS  
**Total Records:** 2

| ID | Name | Email | Phone |
|----|------|-------|-------|
| 1 | Test Contact | test@example.com | 555-1234 |
| 35 | Niggerisha Coon | coon@here.com | 2223335555 |

---

## Method 1: H2 Web Console (RECOMMENDED) 🌐

### Step-by-Step Instructions

1. **Ensure backend is running**
   - Backend must be running on port 8080
   - Check: `http://localhost:8080/api/contacts`

2. **Open H2 Console in browser**
   ```
   http://localhost:8080/h2-console
   ```

3. **Login credentials**
   - **Driver Class:** `org.h2.Driver` (usually pre-filled)
   - **JDBC URL:** `jdbc:h2:file:./data/contactsdb`
   - **User Name:** `sa`
   - **Password:** `password`

4. **Click "Connect" button**

5. **Query the database**
   ```sql
   -- View all contacts
   SELECT * FROM CONTACTS;
   
   -- Count total contacts
   SELECT COUNT(*) FROM CONTACTS;
   
   -- Search by name
   SELECT * FROM CONTACTS WHERE NAME LIKE '%Test%';
   
   -- Order by ID
   SELECT * FROM CONTACTS ORDER BY ID DESC;
   ```

### H2 Console Features
- ✅ Visual table browser
- ✅ SQL query editor with syntax highlighting
- ✅ Export data to CSV
- ✅ View table structure and indexes
- ✅ Execute INSERT, UPDATE, DELETE statements

### Screenshot of Fields to Fill:
```
┌─────────────────────────────────────────┐
│ Saved Settings: [Generic H2 (Embedded)] │
│ Setting Name:   [                     ] │
│                                         │
│ Driver Class:   org.h2.Driver           │
│ JDBC URL:       jdbc:h2:file:./data/   │
│                 contactsdb              │
│ User Name:      sa                      │
│ Password:       ••••••••                │
│                                         │
│           [ Test Connection ]           │
│           [    Connect     ]            │
└─────────────────────────────────────────┘
```

---

## Method 2: REST API Queries 🔌

### Using PowerShell

```powershell
# View all contacts
Invoke-WebRequest -Uri "http://localhost:8080/api/contacts" -Method GET -UseBasicParsing | 
    Select-Object -ExpandProperty Content | ConvertFrom-Json

# View specific contact by ID
Invoke-WebRequest -Uri "http://localhost:8080/api/contacts/1" -Method GET -UseBasicParsing | 
    Select-Object -ExpandProperty Content | ConvertFrom-Json

# Pretty formatted output
$contacts = (Invoke-WebRequest -Uri "http://localhost:8080/api/contacts" -Method GET -UseBasicParsing).Content | ConvertFrom-Json
$contacts | Format-Table -AutoSize
```

### Using Browser
Simply open in your browser:
```
http://localhost:8080/api/contacts
```

### Using cURL (if installed)
```bash
curl http://localhost:8080/api/contacts
```

---

## Method 3: IntelliJ IDEA Database Tool 🔧

### Setup Database Connection in IntelliJ

1. **Open Database Tool Window**
   - View → Tool Windows → Database
   - Or press: `Alt + 1` then select "Database"

2. **Add New Data Source**
   - Click `+` button
   - Select: Data Source → H2

3. **Configure Connection**
   ```
   Name: SpringBootCrud H2
   Host: localhost
   Database: ./data/contactsdb
   User: sa
   Password: password
   URL: jdbc:h2:file:./data/contactsdb
   ```

4. **Test Connection**
   - Click "Test Connection"
   - Should show "Successful"

5. **Browse Tables**
   - Expand: SpringBootCrud H2 → databases → PUBLIC → tables
   - Double-click "CONTACTS" to view data

### IntelliJ Features
- ✅ SQL console with autocomplete
- ✅ Visual data editor
- ✅ ER diagrams
- ✅ Data export/import
- ✅ Compare schemas

---

## Method 4: Frontend Application 💻

The easiest way for non-technical users:

1. **Open React App**
   ```
   http://localhost:5173
   ```

2. **Navigate to Contacts**
   - Click "Contacts" in the navigation
   - All database records displayed in a table

3. **View/Edit/Delete**
   - Click "Edit" to see full contact details
   - Use UI to modify database records

---

## Method 5: Direct File Access 📁

### View Database Files

**Location:**
```
C:\Users\pccre\OneDrive\Documents\TestPy\SpringBootCrud\data\
```

**Files:**
- `contactsdb.mv.db` - Main database file (binary format)
- `contactsdb.trace.db` - Trace/log file

⚠️ **Warning:** These are binary files. Don't edit directly! Use H2 Console or API.

---

## Method 6: SQL Logging in Console 📋

Your application is configured to show SQL queries in the console logs.

**Configuration:** (in `application.properties`)
```properties
spring.jpa.show-sql=true
logging.level.com.examplecode=DEBUG
```

**How to see:**
1. Look at the Spring Boot console output
2. Every database operation shows the SQL:
   ```
   Hibernate: select c1_0.id,c1_0.email,c1_0.name,c1_0.phone from contacts c1_0
   ```

---

## Quick Reference Commands

### PowerShell Script - Pretty View
```powershell
# Save this as view-database.ps1
$contacts = (Invoke-WebRequest -Uri "http://localhost:8080/api/contacts" -Method GET -UseBasicParsing).Content | ConvertFrom-Json

Write-Host "`n=== CONTACTS DATABASE ===" -ForegroundColor Cyan
Write-Host "Total Records: $($contacts.Count)`n" -ForegroundColor Yellow

$contacts | Format-Table @{
    Label="ID"; Expression={$_.id}; Width=5
}, @{
    Label="Name"; Expression={$_.name}; Width=25
}, @{
    Label="Email"; Expression={$_.email}; Width=30
}, @{
    Label="Phone"; Expression={$_.phone}; Width=15
}
```

**Run:**
```powershell
.\view-database.ps1
```

---

## Troubleshooting

### H2 Console Won't Load
1. Check backend is running: `netstat -an | Select-String ":8080"`
2. Verify console enabled in `application.properties`
3. Try: `http://localhost:8080/h2-console` (note the hyphen)

### Wrong User/Password Error
- **Correct credentials:**
  - Username: `sa`
  - Password: `password`
- **JDBC URL must match:** `jdbc:h2:file:./data/contactsdb`

### Can't Connect in IntelliJ
1. Ensure no other connections are open (database lock)
2. Use full path: `C:/Users/pccre/OneDrive/Documents/TestPy/SpringBootCrud/data/contactsdb`
3. Stop backend, then connect (H2 file mode allows only one connection)

### Empty Table
- Check you're connected to correct database
- Try API: `http://localhost:8080/api/contacts`
- Verify database file exists in `./data/` directory

---

## Useful SQL Queries

### View Table Structure
```sql
-- Show all columns in CONTACTS table
SHOW COLUMNS FROM CONTACTS;

-- Get table creation DDL
SCRIPT NODATA;
```

### Data Analysis
```sql
-- Count contacts
SELECT COUNT(*) AS total_contacts FROM CONTACTS;

-- Find duplicates by email
SELECT email, COUNT(*) as count 
FROM CONTACTS 
GROUP BY email 
HAVING COUNT(*) > 1;

-- Recent contacts (assuming ID is sequential)
SELECT * FROM CONTACTS ORDER BY ID DESC LIMIT 10;

-- Search contacts
SELECT * FROM CONTACTS 
WHERE NAME LIKE '%John%' OR EMAIL LIKE '%john%';
```

### Data Management
```sql
-- Backup all data (copy to clipboard)
SELECT * FROM CONTACTS;

-- Clear all contacts (be careful!)
DELETE FROM CONTACTS;

-- Reset auto-increment
ALTER TABLE CONTACTS ALTER COLUMN ID RESTART WITH 1;

-- Insert test data
INSERT INTO CONTACTS (NAME, EMAIL, PHONE) 
VALUES ('John Doe', 'john@example.com', '555-0001');
```

---

## Best Practices

1. **Use H2 Console for:** Ad-hoc queries, data inspection, debugging
2. **Use REST API for:** Automated scripts, testing, bulk operations
3. **Use Frontend for:** End-user data entry and viewing
4. **Use IntelliJ Tool for:** Complex queries, schema changes, development

---

## Database Schema

```sql
CREATE TABLE CONTACTS (
    ID BIGINT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL,
    EMAIL VARCHAR(255) NOT NULL,
    PHONE VARCHAR(255)
);
```

**Indexes:**
- Primary Key: ID (auto-increment, starting from 1)

**Constraints:**
- NOT NULL: NAME, EMAIL

---

## Current Session Info

- **Database Location:** `C:\Users\pccre\OneDrive\Documents\TestPy\SpringBootCrud\data\contactsdb.mv.db`
- **H2 Console URL:** http://localhost:8080/h2-console
- **Backend API URL:** http://localhost:8080/api/contacts
- **Frontend URL:** http://localhost:5173
- **Database User:** sa
- **Database Password:** password
- **Current Record Count:** 2

