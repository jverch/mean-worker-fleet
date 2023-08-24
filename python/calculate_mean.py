# Path: python/calculate_mean.py
from contextlib import ExitStack

filenames = ["data/data0.csv", "data/data1.csv", "data/data2.csv", "data/data3.csv", "data/data4.csv"]
with open("data/mean.csv", "w") as output:
  with ExitStack() as stack:
      files = [stack.enter_context(open(filename, "r")) for filename in filenames]
      for rows in zip(*files):
        sum = 0
        for row in rows:
          sum += int(row)
        output.write(str(sum) + "\n")
