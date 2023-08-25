from celery import Celery
from contextlib import ExitStack

app = Celery('tasks', backend='rpc://', broker='pyamqp://guest@localhost//')

@app.task
def add(x, y):
    return x + y

def calculate_mean(filenames):
  with open("data/mean.csv", "w") as output:
    with ExitStack() as stack:
        files = [stack.enter_context(open(filename, "r")) for filename in filenames]
        for rows in zip(*files):
          sum = 0
          for row in rows:
            sum += int(row)
          output.write(str(sum) + "\n")
  return "data/mean.csv"


print("hello")