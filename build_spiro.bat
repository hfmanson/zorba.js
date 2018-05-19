call em++ -s WASM=1 -s EXPORTED_FUNCTIONS="['_run_query', '_get_file']" -s ASSERTIONS=1 -s DISABLE_EXCEPTION_CATCHING=0 --shell-file shell_spiro.xml -O2 src/spiro.cpp -Isystem/include/ -Lsystem/lib -lzorba_simplestore -o spiro.html
copy /y spiro.html spiro.xml
