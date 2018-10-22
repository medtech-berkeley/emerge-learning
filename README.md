# mtab-stanford-project
Main repository for Emerge, an online platform for emergency medicine education.

# Building and Deploying
The project requires three services to run properly.
1. `nginx` proxy server to route requests and handle SSL certificates on the deployed version
2. `postgres` database server
3. `interfaceserver` Emerge learning django server

All of these services are defined in `docker-compose.yml` and have a variety of configuration options you defined in that file. By default running `docker-compose up` will run the server but will not bind a port so that you can access it from outside the docker container. For that we have two additional configuration files: `production-compose.yml` and `local-compose.yml`.

# Compose helper script
There is a simple helper script provided named `compose`. This should work on Mac and Linux and could potentially work in Windows but this is untested. Alternatively, you can replace everywhere you see `./compose [CMD]` with `docker-compose -f docker-compose.yml -f local-compose.yml [CMD]`.

# Building
To build run:
```
./compose build
```

You can verify that is runs properly by running
```
./compose up
```
And waiting for the Django startup line (`Starting development server at http://0.0.0.0:8000/`). IF there aren't any Python errors in the output then the configuration likely worked.

## Building for Windows
There have been known issues with running this on Windows after cloning from the repo due to the difference in line endings between UNIX-based systems and Windows. To fix you can run the following command: 
```
git config --global core.autocrlf false
```
After running this command, deleting and recloning the repo should fix the issue.
## Local development environment
The local development server should allow you to mount your local directory into the server so you can modify and run code without having to rebuild every time.

To run a command locally you can do the following:
```
./compose [DOCKER_CMD_HERE]
```

To start up the server:
```
./compose up
```
To run it in detached mode, you can append a `-d` to the previous command and Docker will not block your terminal while running.

This is only necessary for the `up` and `run` commands. If you already have a container running (through `up -d` for example) you can use the following command to enter it:
```
./compose exec [SERVICE_NAME] [COMMAND]
```

For example to enter the interface (Django) server with a command prompt
```
./compose exec interfaceserver sh
```

Or to run a manage.py command:
```
./compose exec interfaceserver /stanford/manage.py [MANAGE.PY COMMAND]
```

Note for Windows:
If you followed the section above for building on Windows and you cannot connect to the development server, but it seems to be running properly, you are probably running Docker Toolbox and you need to forward the 80 port from the VM to your local computer. This is a decent guide on doing this: https://www.simplified.guide/virtualbox/port-forwarding
