Write-Host "`n========================================================" -ForegroundColor DarkYellow
Write-Host "       Luna & Latte Database Entries Viewer" -ForegroundColor DarkYellow
Write-Host "========================================================" -ForegroundColor DarkYellow

$base = "http://localhost:8080/api"

# 1. Categories
Write-Host "`n--- TABLE: CATEGORIES ---" -ForegroundColor Cyan
try {
    $cats = (Invoke-RestMethod -Uri "$base/categories" -Method Get -TimeoutSec 5).data
    $cats | Select-Object id, name, displayName, icon, displayOrder | Format-Table -AutoSize
} catch { Write-Host "Could not fetch categories: $_" -ForegroundColor Red }

# 2. Menu Items
Write-Host "`n--- TABLE: MENU_ITEMS ---" -ForegroundColor Cyan
try {
    $items = (Invoke-RestMethod -Uri "$base/menu" -Method Get -TimeoutSec 5).data
    $items | Select-Object id, name, categoryName, price, isVeg, isEggless, rating, ratingCount | Format-Table -AutoSize
} catch { Write-Host "Could not fetch menu items: $_" -ForegroundColor Red }

# 3. Stores
Write-Host "`n--- TABLE: STORE_LOCATIONS ---" -ForegroundColor Cyan
try {
    $stores = (Invoke-RestMethod -Uri "$base/stores" -Method Get -TimeoutSec 5).data
    $stores | Select-Object id, name, neighborhood, city, phone, openingHours | Format-Table -AutoSize
} catch { Write-Host "Could not fetch stores: $_" -ForegroundColor Red }

# 4. Offers
Write-Host "`n--- TABLE: OFFERS ---" -ForegroundColor Cyan
try {
    $offers = (Invoke-RestMethod -Uri "$base/offers" -Method Get -TimeoutSec 5).data
    $offers | Select-Object id, promoCode, title, discountPercentage, discountAmount, minOrderAmount, tierRequired | Format-Table -AutoSize
} catch { Write-Host "Could not fetch offers: $_" -ForegroundColor Red }

# 5. Blogs
Write-Host "`n--- TABLE: BLOG_POSTS (Nocturne Chronicles) ---" -ForegroundColor Cyan
try {
    $blogs = (Invoke-RestMethod -Uri "$base/blogs" -Method Get -TimeoutSec 5).data
    $blogs | Select-Object id, title, author, category, readTimeMinutes, publishedDate | Format-Table -AutoSize
} catch { Write-Host "Could not fetch blogs: $_" -ForegroundColor Red }

# 6. Seed Users
Write-Host "`n--- TABLE: USERS ---" -ForegroundColor Cyan
Write-Host "  * Maya Lin (maya@nocturne.studio) | Tier: CRESCENT_PATRON | Points: 420 | Role: ROLE_USER" -ForegroundColor Gray
Write-Host "  * Head Roaster (admin@lunaandlatte.com) | Tier: NOCTURNE_ROYAL | Points: 9999 | Roles: ROLE_USER, ROLE_ADMIN" -ForegroundColor Gray

Write-Host "`n========================================================" -ForegroundColor DarkYellow
Write-Host " Tip: Open http://localhost:8080/h2-console for the visual SQL UI!" -ForegroundColor DarkYellow
Write-Host " (JDBC URL: jdbc:h2:mem:luna_latte_db | User: sa | Password: [empty])" -ForegroundColor DarkYellow
Write-Host "========================================================`n" -ForegroundColor DarkYellow