@echo off
setlocal

:: Ask for user input
set /p MONGO_URL="Enter MongoDB database link: "
set /p SECRET_KEY="Enter secret key: "
set /p HOST_API="Enter API host: "
set /p HOST_LOCAL="Enter local host for project: "

:: Get the current project directory
set PROJECT_DIR=%CD%

:: Setup Backend
echo Setting up Backend...
cd %PROJECT_DIR%\fastAPI

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate

echo Creating .env file...
(
    echo MONGO_URL=%MONGO_URL%
    echo SECRET_KEY=%SECRET_KEY%
) > .env

echo Installing dependencies...
pip install -r requirements.txt

echo Starting FastAPI server...
start cmd /k "uvicorn app.main:app --reload"

:: Setup Frontend
echo Setting up Frontend...
cd %PROJECT_DIR%\libary

echo Installing dependencies...
npm install

echo Creating .env file...
(
    echo REACT_APP_API_URL=%HOST_API%
    echo PUBLIC_URL=%HOST_LOCAL%
) > .env

echo Starting frontend...
start cmd /k "npm start"

echo Setup completed!
