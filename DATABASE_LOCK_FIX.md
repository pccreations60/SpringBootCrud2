# H2 Database Lock Issue - Resolution Guide

## Problem
```
[90020][90020] Database may be already in use: "C:/Users/pccre/OneDrive/Documents/TestPy/SpringBootCrud/data/contactsdb.mv.db". 
Possible solutions: close all other connection(s); use the server mode [90020-232]
The file is locked: C:/Users/pccre/OneDrive/Documents/TestPy/SpringBootCrud/data/contactsdb.mv.db [2.3.232/7]
```

## Root Cause
Multiple instances of the Spring Boot backend attempting to access the same H2 file-based database simultaneously. H2 locks the database file to prevent corruption.

## Quick Fix (Windows PowerShell)

### Step 1: Stop all backend instances
```powershell
# Find all Java processes
Get-Process | Where-Object {$_.ProcessName -eq "java"} | Select-Object Id, ProcessName, StartTime

# Stop Spring Boot processes (replace IDs with actual process IDs)
Stop-Process -Id 12345,67890 -Force
```

### Step 2: Wait for locks to clear
```powershell
Start-Sleep -Seconds 3
```

### Step 3: Start a single backend instance
```powershell
cd C:\Users\pccre\OneDrive\Documents\TestPy\SpringBootCrud
.\mvnw.cmd spring-boot:run
```

### Step 4: Verify backend is running
```powershell
# Check if port 8080 is listening
netstat -an | Select-String ":8080" | Select-String "LISTENING"

# Test API
Invoke-WebRequest -Uri "http://localhost:8080/api/contacts" -Method GET -UseBasicParsing
```

## Prevention Strategies

### Option 1: Always check before starting
Before starting the backend, check for existing processes:
```powershell
Get-Process | Where-Object {$_.ProcessName -eq "java" -and $_.Path -like "*jdk*"}
```

### Option 2: Use in-memory database for development
Edit `src/main/resources/application.properties`:
```properties
# Change from file-based:
# spring.datasource.url=jdbc:h2:file:./data/contactsdb

# To in-memory (data lost on restart):
spring.datasource.url=jdbc:h2:mem:testdb
```

### Option 3: H2 Server Mode (Advanced)
Configure H2 to run in server mode for multiple connections.

## Verification Checklist
- ✅ Backend running on http://localhost:8080
- ✅ API responding (GET /api/contacts returns 200)
- ✅ Frontend running on http://localhost:5173
- ✅ Only ONE backend Java process active
- ✅ Database operations working (CREATE, READ, UPDATE, DELETE)

## Current Status (May 12, 2026 - 7:45 AM)
- ✅ Database lock resolved
- ✅ Backend running successfully
- ✅ Frontend connected and operational
- ✅ Full CRUD operations tested and working
- ✅ Test contact (ID: 1) persisted in database

## Useful Commands

### Check backend status
```powershell
Invoke-WebRequest -Uri "http://localhost:8080/api/contacts" -Method GET -UseBasicParsing
```

### Stop all Java processes (nuclear option)
```powershell
Get-Process | Where-Object {$_.ProcessName -eq "java"} | Stop-Process -Force
```

### View database file location
```
C:\Users\pccre\OneDrive\Documents\TestPy\SpringBootCrud\data\contactsdb.mv.db
```

## Notes
- The two Java processes you see (26132, 65332) are normal - Maven wrapper spawns a parent and child process
- Database password is configured in application.properties: `password`
- Username: `sa`
- Database persists data between restarts

