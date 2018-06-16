#!/usr/bin/python3
import os
import sys
import subprocess

if os.system('docker-compose build') == 1:
	sys.exit(1)

up_proc = subprocess.Popen(['docker-compose', 'run', 'interfaceserver'], stdout=subprocess.PIPE)

while True:
	up_proc.poll()
	if up_proc.returncode == 1:
		break
	line = up_proc.stdout.readline()
	if str(line, 'utf-8').startswith("Quit the server with CONTROL-C."):
		os.system('docker-compose down')
		sys.exit(0)

os.system('docker-compose down')
sys.exit(1)
