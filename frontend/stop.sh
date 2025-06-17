#!/bin/bash
# kill any running React (CRA or Vite) dev server
printf "Killing any running React dev servers...\n";
for process in vite react-scripts; do
  pkill -f $process
done
