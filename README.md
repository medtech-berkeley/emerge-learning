# mtab-stanford-project
Main repository for Emerge, an online platform for emergency medicine education.

# Building and Deploying
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


Note for Windows:
If you followed the section above for building on Windows and you cannot connect to the development server, but it seems to be running properly, you are probably running Docker Toolbox and you need to forward the 80 port from the VM to your local computer. This is a decent guide on doing this: https://www.simplified.guide/virtualbox/port-forwarding


This is only necessary for the `up` and `run` commands. If you already have a container running (through `up -d` for example) you can use the following command to enter it:
```
./compose exec [SERVICE_NAME] [COMMAND]
```

For all of the following commands, the server must be up and running using the above instructions.s

### Executing commands inside of the containers
For example to enter the interface (Django) server with a command prompt
```
./compose exec interfaceserver sh
```

### To run a Django "manage.py" command
Or to run a manage.py command:
```
./compose exec interfaceserver ./manage.py [MANAGE.PY COMMAND]
```

### To install a new npm package
Or to run a manage.py command:
```
./compose exec reactserver npm install [PACKAGE] --save
```
After running this, you can commit the new package.json and package-lock.json files.
