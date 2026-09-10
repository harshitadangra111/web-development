Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host "     ☕ Luna & Latte Backend API Test Suite" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$baseUrl = "http://localhost:8080/api"

# 1. Categories
try {
    Write-Host "`n[1/5] Testing GET $baseUrl/categories..." -NoNewline
    $res = Invoke-RestMethod -Uri "$baseUrl/categories" -Method Get -TimeoutSec 5
    if ($res.success) {
        Write-Host " [PASS]" -ForegroundColor Green
        Write-Host "      Found $($res.data.Count) categories:" -ForegroundColor Gray
        foreach ($c in $res.data) {
            Write-Host "      * $($c.displayName) ($($c.name))" -ForegroundColor DarkCyan
        }
    }
} catch {
    Write-Host " [FAIL]" -ForegroundColor Red
    Write-Host "      Error: $($_.Exception.Message)" -ForegroundColor Red
}

# 2. Menu Items
try {
    Write-Host "`n[2/5] Testing GET $baseUrl/menu..." -NoNewline
    $res = Invoke-RestMethod -Uri "$baseUrl/menu" -Method Get -TimeoutSec 5
    if ($res.success) {
        Write-Host " [PASS]" -ForegroundColor Green
        Write-Host "      Found $($res.data.Count) menu items. Top signatures:" -ForegroundColor Gray
        foreach ($item in $res.data | Select-Object -First 3) {
            Write-Host "      * $($item.name) - Rs. $($item.price)" -ForegroundColor DarkCyan
        }
    }
} catch {
    Write-Host " [FAIL]" -ForegroundColor Red
    Write-Host "      Error: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Store Sanctuaries
try {
    Write-Host "`n[3/5] Testing GET $baseUrl/stores..." -NoNewline
    $res = Invoke-RestMethod -Uri "$baseUrl/stores" -Method Get -TimeoutSec 5
    if ($res.success) {
        Write-Host " [PASS]" -ForegroundColor Green
        Write-Host "      Found $($res.data.Count) sanctuaries:" -ForegroundColor Gray
        foreach ($s in $res.data) {
            Write-Host "      * $($s.name) ($($s.neighborhood), $($s.city))" -ForegroundColor DarkCyan
        }
    }
} catch {
    Write-Host " [FAIL]" -ForegroundColor Red
    Write-Host "      Error: $($_.Exception.Message)" -ForegroundColor Red
}

# 4. Active Promo Code Validation
try {
    Write-Host "`n[4/5] Testing GET $baseUrl/offers/validate/NOCTURNE20..." -NoNewline
    $res = Invoke-RestMethod -Uri "$baseUrl/offers/validate/NOCTURNE20" -Method Get -TimeoutSec 5
    if ($res.success) {
        Write-Host " [PASS]" -ForegroundColor Green
        Write-Host "      Promo Code NOCTURNE20 is valid: $($res.data.discountPercentage)% off" -ForegroundColor DarkCyan
    }
} catch {
    Write-Host " [FAIL]" -ForegroundColor Red
    Write-Host "      Error: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. User Authentication (JWT)
try {
    Write-Host "`n[5/5] Testing POST $baseUrl/auth/login (maya@nocturne.studio)..." -NoNewline
    $body = @{ email = "maya@nocturne.studio"; password = "password123" } | ConvertTo-Json
    $res = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -ContentType "application/json" -Body $body -TimeoutSec 5
    if ($res.success) {
        Write-Host " [PASS]" -ForegroundColor Green
        Write-Host "      Logged in as: $($res.data.user.fullName) ($($res.data.user.patronTier))" -ForegroundColor DarkCyan
        Write-Host "      Reward points: $($res.data.user.rewardPoints)" -ForegroundColor DarkCyan
        Write-Host "      JWT Token: $($res.data.token.Substring(0, 30))..." -ForegroundColor DarkCyan
    }
} catch {
    Write-Host " [FAIL]" -ForegroundColor Red
    Write-Host "      Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host "                 Test Suite Complete" -ForegroundColor Cyan
Write-Host "========================================================`n" -ForegroundColor Cyan