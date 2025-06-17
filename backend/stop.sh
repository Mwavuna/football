#!/bin/bash
# Stop the backend server
echo "Stopping backend server..."
kill $(lsof -t -i:5000)