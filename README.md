# mean-worker-fleet
Uses python workers to calculate an average across many files.


## RabbitMQ - Task Broker
### https://www.rabbitmq.com/
#### Installed locally using Homebrew: https://www.rabbitmq.com/install-homebrew.html
#### To start rabbitmq now and restart at login:
    brew services start rabbitmq
#### Or, if you don't want/need a background service you can just run:
    CONF_ENV_FILE="/usr/local/etc/rabbitmq/rabbitmq-env.conf" /usr/local/opt/rabbitmq/sbin/rabbitmq-server

# Celery https://docs.celeryq.dev/en/stable/
    pip3 install celery
### To start celery:
    cd /python/celery
    celery -A tasks worker --loglevel=INFO
### With one worker running 4 processes:
    cd /python/celery
    celery -A tasks worker --loglevel=INFO --concurrency=4
### Multiple workers:
  #### Set up `celery multi`:
    sudo mkdir -p -m 2755 /var/run/celery
    sudo mkdir -p -m 2755 /var/log/celery
    sudo chown -R $USER: /var/run/celery
    sudo chown -R $USER: /var/log/celery
  #### Use `celery multi` to start 3 workers with 1 process each:
    cd /python/celery
    celery multi start 3 -A tasks --concurrency=1 --hostname=localhost
  #### Stop workers:
    celery multi stop 3 -A tasks
### "Flower" tool for monitoring Celery workers:
    pip3 install flower
    cd /python/celery
    celery -A tasks flower
