from celery import Celery
from contextlib import ExitStack

app = Celery('celery',
             broker='pyamqp://guest@localhost//',
             backend='rpc://')
i = app.control.inspect()

@app.task
def calculate_sum(filenames, fileNum):
  # print("filenames: ", filenames)
  # print("active: ", i.active())
  # print("scheduled: ", i.scheduled())
  with open("../../data/sum%s.csv" % fileNum, "w") as output:
    with ExitStack() as stack:
        files = [stack.enter_context(open("../../" + filename, "r")) for filename in filenames]
        for rows in zip(*files):
          sum = 0
          for row in rows:
            sum += int(row)
          output.write(str(sum) + "\n")
  return "data/sum%s.csv" % fileNum

@app.task
def calculate_mean(filename, totalFileNum):
  with open("../../data/mean.csv", "w") as output:
    with open("../../" + filename, "r") as input:
      for row in input:
        output.write(str(int(row) / totalFileNum) + "\n")
  return "data/mean.csv"
