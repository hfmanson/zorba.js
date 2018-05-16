REM see http://kripken.github.io/emscripten-site/docs/porting/files/packaging_files.html#packaging-using-the-file-packager-tool
python "%EMSCRIPTEN%/tools/file_packager.py" spiro.data --preload data --js-output=load_spiro.js
