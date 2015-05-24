#!/bin/bash

NAME="myproject"                              #Name of the application (*)
DJANGODIR=/home/ubuntu/public_html/mockat.com/myproject    # Django project directory (*)
NUM_WORKERS=2                                             # how many worker processes should Gunicorn spawn (*)
DJANGO_SETTINGS_MODULE=myproject.settings             # which settings file should Django use (*)
DJANGO_WSGI_MODULE=myproject.wsgi                     # WSGI module name (*)
LOGFILE=/home/ubuntu/public_html/logs/gunicorn.log
PORT=8000
echo "Starting $NAME as `whoami`"

# Activate the virtual environment
cd $DJANGODIR
source /home/ubuntu/ve/bin/activate
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH


# Start your Django Unicorn
# Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)
exec /home/ubuntu/ve/bin/gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --log-level=debug \
  --bind 127.0.0.1:$PORT \
  --log-file=$LOGFILE 2>>$LOGFILE

