# Quick Database Viewer Script
# Usage: .\view-database.ps1

Write-Host "`n╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     SpringBootCrud - Database Viewer                  ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Check if backend is running
try {
    $testConnection = Invoke-WebRequest -Uri "http://localhost:8080/api/contacts" -Method GET -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
    Write-Host "✓ Backend is running on port 8080" -ForegroundColor Green
} catch {
    Write-Host "✗ Backend is not running!" -ForegroundColor Red
    Write-Host "  Start it with: .\mvnw.cmd spring-boot:run`n" -ForegroundColor Yellow
    exit 1
}

# Fetch contacts from database
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/contacts" -Method GET -UseBasicParsing
    $contacts = $response.Content | ConvertFrom-Json

    Write-Host "`n┌─────────────────────────────────────────────────────────┐" -ForegroundColor White
    Write-Host "│  CONTACTS TABLE                                         │" -ForegroundColor White
    Write-Host "├─────────────────────────────────────────────────────────┤" -ForegroundColor White
    Write-Host "│  Total Records: $($contacts.Count)                                        │" -ForegroundColor White
    Write-Host "└─────────────────────────────────────────────────────────┘`n" -ForegroundColor White

    if ($contacts.Count -eq 0) {
        Write-Host "  No contacts found in database." -ForegroundColor Yellow
        Write-Host "  Add contacts via: http://localhost:5173`n" -ForegroundColor Cyan
    } else {
        # Display contacts in a formatted table
        $contacts | Format-Table @{
            Label="ID"; Expression={$_.id}; Width=6; Alignment="Right"
        }, @{
            Label="Name"; Expression={$_.name}; Width=25
        }, @{
            Label="Email"; Expression={$_.email}; Width=30
        }, @{
            Label="Phone"; Expression={$_.phone}; Width=15
        } -AutoSize

        Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
        Write-Host "Quick Actions:" -ForegroundColor Cyan
        Write-Host "  • View in browser:    http://localhost:5173" -ForegroundColor White
        Write-Host "  • H2 Console:         http://localhost:8080/h2-console" -ForegroundColor White
        Write-Host "  • API Endpoint:       http://localhost:8080/api/contacts" -ForegroundColor White
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor DarkGray
    }

    # Show detailed view option
    Write-Host "Options:" -ForegroundColor Yellow
    Write-Host "  [D] Show detailed view" -ForegroundColor Gray
    Write-Host "  [R] Refresh data" -ForegroundColor Gray
    Write-Host "  [Q] Quit" -ForegroundColor Gray
    Write-Host ""

    $choice = Read-Host "Select option"

    if ($choice -eq "D" -or $choice -eq "d") {
        Write-Host "`n┌─────────────────────────────────────────────────────────┐" -ForegroundColor Cyan
        Write-Host "│  DETAILED CONTACT VIEW                                  │" -ForegroundColor Cyan
        Write-Host "└─────────────────────────────────────────────────────────┘`n" -ForegroundColor Cyan

        foreach ($contact in $contacts) {
            Write-Host "Contact #$($contact.id)" -ForegroundColor Yellow
            Write-Host "  Name:  $($contact.name)" -ForegroundColor White
            Write-Host "  Email: $($contact.email)" -ForegroundColor White
            Write-Host "  Phone: $($contact.phone)" -ForegroundColor White
            Write-Host "  ───────────────────────────────────────" -ForegroundColor DarkGray
        }
        Write-Host ""
    } elseif ($choice -eq "R" -or $choice -eq "r") {
        Write-Host "`nRefreshing...`n" -ForegroundColor Yellow
        & $MyInvocation.MyCommand.Path
    }

} catch {
    Write-Host "✗ Error fetching contacts: $_" -ForegroundColor Red
    Write-Host "  Check if backend is running properly.`n" -ForegroundColor Yellow
}

