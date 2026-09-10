@echo off
title Luna & Latte Full-Stack Launcher
echo ===================================================
echo  Starting Luna & Latte Full-Stack Services...
echo ===================================================
echo [1/2] Launching Backend API window...
start "" "%~dp0start-backend.bat"
timeout /t 5 /nobreak >nul
echo [2/2] Launching Frontend UI window...
start "" "%~dp0start-frontend.bat"
echo.
echo Both servers are launching in their own terminal windows!
echo Backend:  http://localhost:8080/api
echo Frontend: http://localhost:5173
echo.
timeout /t 3 /nobreak >nul
