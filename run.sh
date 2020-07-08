
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
  npm run test || echo "\nUI tests failed!" 1>&2

  cd ../server
  npm run test a || echo "\nServer tests failed!" 1>&2
  
  cd ..
  echo "\nAll tests passed!"
}

start_docker() {
  echo "Starting docker containers..."

  docker-compose up
}

copy_env_files
run_tests
start_docker