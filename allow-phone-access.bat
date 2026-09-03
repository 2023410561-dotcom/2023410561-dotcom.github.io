@echo off
chcp 65001 >nul
echo ==========================================
echo   Allow phone to access portfolio site
echo   Port: 4173
echo ==========================================
echo.
netsh advfirewall firewall add rule name="Vite Preview 4173" dir=in action=allow protocol=TCP localport=4173
echo.
if errorlevel 1 (
  echo [FAILED] Please right-click this file and choose "Run as administrator"
) else (
  echo [SUCCESS] Firewall rule added.
  echo Now open this link on your phone:
  echo http://192.168.0.102:4173/
)
echo.
echo Computer LAN IP is 192.168.0.102 - if it changed, run: ipconfig
echo.
pause
