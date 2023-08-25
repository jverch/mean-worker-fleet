# mean-worker-fleet
Uses python workers to calculate an average across many files.


# RabbitMQ - Task Broker
# https://www.rabbitmq.com/
# Installed locally using Homebrew: https://www.rabbitmq.com/install-homebrew.html
To start rabbitmq now and restart at login:
  brew services start rabbitmq
Or, if you don't want/need a background service you can just run:
  CONF_ENV_FILE="/usr/local/etc/rabbitmq/rabbitmq-env.conf" /usr/local/opt/rabbitmq/sbin/rabbitmq-server

# Celery https://docs.celeryq.dev/en/stable/
  `pip3 install celery`
To start celery:
  `cd /python`
  `celery -A proj worker --loglevel=INFO`
With one worker running 4 processes:
  `cd /python`
  `celery -A tasks worker --loglevel=INFO --concurrency=4`
Multiple workers:
  `cd /python`
  `celery -A tasks worker -loglevel=INFO -n worker1@hostname`
  `celery -A tasks worker -loglevel=INFO -n worker2@hostname`
  `celery -A tasks worker -loglevel=INFO -n worker3@hostname`