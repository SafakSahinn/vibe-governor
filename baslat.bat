@echo off
title Vibe Governor Baslatici
cd /d "%~dp0"
echo ========================================================
echo   VIBE GOVERNOR WEB SIHIRBAZI BASLATILIYOR...
echo ========================================================
echo.
echo Tarayicinizda su adresi acin: http://localhost:3000
echo.
call npm run dev
pause
