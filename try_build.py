#!/usr/bin/python3
import os
import sys
import subprocess

if os.system('docker-compose -p %s -f docker-compose.yml build' % os.environ['ID']) == 1:
	sys.exit(1)

up_proc = subprocess.Popen(['docker-compose', '-p', os.environ['ID'], '-f', 'docker-compose.yml', 'run', 'interfaceserver'], stdout=subprocess.PIPE)

while True:
	up_proc.poll()
	if up_proc.returncode == 1:
		break
	line = up_proc.stdout.readline()
	print(line)
	if str(line, 'utf-8').startswith("Quit the server with CONTROL-C."):
		os.system('docker-compose -f docker-compose.yml down')
		sys.exit(0)

os.system('docker-compose -f docker-compose.yml down')
sys.exit(1)
