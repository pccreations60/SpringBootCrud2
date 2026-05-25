@echo off
setlocal

set "WRAPPER_DIR=%~dp0.mvn\wrapper"
set "PROPS_FILE=%WRAPPER_DIR%\maven-wrapper.properties"

if not exist "%PROPS_FILE%" (
  echo [ERROR] Missing %PROPS_FILE%
  exit /b 1
)

for /f "usebackq tokens=1,* delims==" %%A in ("%PROPS_FILE%") do (
  if /i "%%A"=="distributionUrl" set "MVN_DIST_URL=%%B"
)

if "%MVN_DIST_URL%"=="" (
  echo [ERROR] distributionUrl not found in maven-wrapper.properties
  exit /b 1
)

set "CACHE_DIR=%USERPROFILE%\.m2\wrapper\dists"
set "MVN_VERSION=apache-maven-3.9.9"
set "MVN_HOME=%CACHE_DIR%\%MVN_VERSION%"
set "ZIP_FILE=%CACHE_DIR%\apache-maven-3.9.9-bin.zip"

if not exist "%MVN_HOME%\bin\mvn.cmd" (
  if not exist "%CACHE_DIR%" mkdir "%CACHE_DIR%"

  if not exist "%ZIP_FILE%" (
    echo Downloading Maven from %MVN_DIST_URL%
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Invoke-WebRequest -Uri '%MVN_DIST_URL%' -OutFile '%ZIP_FILE%'"
    if errorlevel 1 (
      echo [ERROR] Failed to download Maven distribution.
      exit /b 1
    )
  )

  echo Extracting Maven...
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -Path '%ZIP_FILE%' -DestinationPath '%CACHE_DIR%' -Force"
  if errorlevel 1 (
    echo [ERROR] Failed to extract Maven distribution.
    exit /b 1
  )
)

"%MVN_HOME%\bin\mvn.cmd" %*
exit /b %errorlevel%
