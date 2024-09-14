@echo off
:: Обновление репозитория с GitHub
cd /d %~dp0
git pull origin main

:: Запуск локального сервера
start http://localhost:3000
npx http-server
pause
