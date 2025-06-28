@echo off
echo 🚀 Starting local server for AI Chatbot...
echo.
echo Choose your preferred method:
echo 1. Python (if installed)
echo 2. Node.js (if installed)
echo 3. PHP (if installed)
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo Starting Python server on port 8000...
    echo Open your browser and go to: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
) else if "%choice%"=="2" (
    echo Starting Node.js server...
    echo If this fails, install serve first: npm install -g serve
    echo Open your browser and go to the URL shown below
    echo.
    npx serve .
) else if "%choice%"=="3" (
    echo Starting PHP server on port 8000...
    echo Open your browser and go to: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    php -S localhost:8000
) else (
    echo Invalid choice. Please run the script again.
    pause
)

pause 