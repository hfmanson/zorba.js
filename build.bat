em++ -s WASM=1 -s ASSERTIONS=1 -s DISABLE_EXCEPTION_CATCHING=0 -O2 src/zorba.cpp -Isystem/include/ -Lsystem/lib -lzorba_simplestore -o zorba.html
