#!/bin/bash
set -e

copy_env_files() {
  echo "Copying env file to ui"
  cp .env ui/
  echo "Copying env file to server"
  cp .env server/
  echo ".env setup complete!"
}

run_tests() {
  export CI=true
  cd ui
  npm run test
  echo "UI tests passed!"

  cd ../server
  npm run test a
  echo "Server tests passed!"
  
  cd ..
  echo "All tests passed!"
}

start_docker() {
  echo "Starting docker containers..."

  docker-compose up --build
}

copy_env_files
run_tests
start_docker