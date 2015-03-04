set SolutionDir=%~1

echo %SolutionDir%

copy /y %SolutionDir%ai\main\ai.js %SolutionDir%artifact\main\artifact\bin\
copy /y %SolutionDir%audio\main\audio.js %SolutionDir%artifact\main\artifact\bin\
copy /y %SolutionDir%game\main\game.js %SolutionDir%artifact\main\artifact\bin\
copy /y %SolutionDir%scene\main\scene.js %SolutionDir%artifact\main\artifact\bin\
copy /y %SolutionDir%surface\main\surface.js %SolutionDir%artifact\main\artifact\bin\

call "%SolutionDir%res\bin\Debug\res.exe"^
  "%SolutionDir%artifact\main\artifact"^
  "%SolutionDir%artifact\main\manifest.json"^
  "%SolutionDir%artifact\main\artifact.bin"
