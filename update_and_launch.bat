@echo off
:: Обновление репозитория с GitHub
cd /d %~dp0
git pull origin main

:: Запуск локального сервера на порту 3000
start http://localhost:3000
npx http-server -p 3000
pause
