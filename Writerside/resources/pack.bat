set name=cartesian-segment-lerp

set win=C:\Users\nazarpunk\Desktop
set mac="Z:\map\%name%\angelscript"

set ujapi="%win%\UjAPI\UjAPILauncher.exe"
set mpq="%win%\MPQEditor\MPQEditor.exe"

set winmap="%win%\map.w3x"
set winas="%win%\war3map.as"

copy "%mac%\war3map.as" %winas%

start /wait "" %mpq% /add %winmap% %winas% "war3map.as" /auto
start "" %ujapi% -ujapi "dev" -as "console" -window -launch "Warcraft" -loadfile %winmap%
