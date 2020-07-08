read_var() {
  if [ -z "$1" ]; then
    echo "environment variable name is required"
    return
  fi

  local ENV_FILE='.env'
  if [ ! -z "$2" ]; then
    ENV_FILE="$2"
  fi

  local VAR=$(grep ^$1= "$ENV_FILE" | xargs)
  IFS="=" read -ra VAR <<< "$VAR"
  echo ${VAR[1]}
}

error_on_env_missing() {
  echo "Error - environment variable" $1 "not set in .env file. Please add and re-run install.sh!" 1>&2
  exit 1
}

check_vars_exist() {
  local serverPort=$(read_var API_SERVER_PORT)
  local uiPort=$(read_var PORT)
  local uiServerUrl=$(read_var REACT_APP_API_SERVER_HOST)

  [ -z "$serverPort" ] && error_on_env_missing "API_SERVER_PORT"
  [ -z "$uiPort" ] && error_on_env_missing "PORT"
  [ -z "$uiServerUrl" ] && error_on_env_missing "REACT_APP_API_SERVER_HOST"

  echo "All environment variables correctly set!"
}

copy_env_files() {
  read -p "Copy .env file to server and ui? (y/n)? " answer
  case ${answer:0:1} in
    y|Y )
          echo "Copying env file to ui"
          cp .env ui/
          echo "Copying env file to server"
          cp .env server/
          echo ".env setup complete!"
    ;;
    * )
        echo "Skipping .env setup"
    ;;
  esac
}

install_project_deps() {
  read -p "Install npm dependencies for ui and server (y/n)? " answer
  case ${answer:0:1} in
    y|Y )
          echo "Installing deps for ui..."
          cd ui
          npm install
          echo "Installing deps for server"
          cd ../server
          npm install
          echo "Install dependencies complete!"
          cd ..
          echo "Now you're ready to go. Start each app by running npm start in /ui and in /server"
    ;;
    * )
        echo "Skipping dependencies install"
        echo "Make sure you install deps before trying to start the apps!"
    ;;
  esac
}

check_vars_exist
copy_env_files
install_project_deps
