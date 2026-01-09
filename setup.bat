@echo off
echo ====================================
echo To-Do App Setup Script
echo ====================================
echo.

echo Step 1: Installing root dependencies...
call npm install
if errorlevel 1 (
    echo Error installing root dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo Error installing backend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo Step 3: Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo Step 4: Creating backend/uploads directory...
if not exist "backend\uploads" mkdir backend\uploads

echo.
echo Step 5: Setting up environment file...
if not exist "backend\.env" (
    copy backend\env.example backend\.env
    echo.
    echo IMPORTANT: Please edit backend\.env and add your MongoDB connection string!
    echo.
) else (
    echo backend\.env already exists, skipping...
)

echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo Next steps:
echo 1. Edit backend\.env and add your MONGODB_URI
echo 2. Run: npm run dev
echo.
pause
