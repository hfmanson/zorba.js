em++ -s WASM=1 -s EXPORTED_FUNCTIONS="['_run_query']" -s ASSERTIONS=1 -s DISABLE_EXCEPTION_CATCHING=0 -O2 src/spiro.cpp -Isystem/include/ -Lsystem/lib -lzorba_simplestore -o spiro.html
REM em++ -s EXPORTED_FUNCTIONS="['_run_query']" -s ASSERTIONS=1 -s DISABLE_EXCEPTION_CATCHING=0 -O2 src/spiro.cpp -Isystem/include/ -Lsystem/lib -lzorba_simplestore -o spiro.html
