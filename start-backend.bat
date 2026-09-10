@echo off
title Luna & Latte Backend API (Spring Boot :8080)
echo ===================================================
echo  Starting Luna & Latte Backend API (Port 8080)...
echo ===================================================
set "JAVA_HOME=C:\Program Files\Java\jdk-17"
cd /d "%~dp0backend"
"C:\Program Files\Java\jdk-17\bin\java.exe" -jar "target\appname-0.0.1-SNAPSHOT.jar" --spring.profiles.active=dev
pause
