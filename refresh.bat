@echo off
set counter=0
set delay=10
:start
set /a counter+=1
timeout /t %delay% /nobreak > nul
echo refresh #%counter%
echo $null > refresh.temp
goto start