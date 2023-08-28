from tasks import calculate_sum, calculate_mean
import sys
import json
import queue
import time

print("Hello from celery_scheduler.py!")

# Get string from sys.argv[1] and convert to array, add to queue
files = json.loads(sys.argv[1])
numFiles = len(files)
fileQueue = queue.Queue(maxsize=len(files))
for file in files:
  fileQueue.put(file)

chunk = []
count = 0
results = {}
while True:
  for key in list(results):
    if results[key].ready():
      fileQueue.put(results[key].get())
      del results[key]
  
  # Enqueue tasks, storing async results in "results" dictionary
  while fileQueue.empty() == False:
    # Divide queue into chunks of 5 and run async calculate_mean on each chunk
    chunk.append(fileQueue.get())
    if len(chunk) == 5 or (fileQueue.empty() == True and len(chunk) > 1):
      result = calculate_sum.delay(chunk, count)
      results[count] = result
      chunk = []
      count += 1

  # Break from while loop when only one file remains
  if (len(results) < 1 and len(chunk) == 1):
    break
  print("Sleeping while waiting for results to finish")
  time.sleep(1)

# calculate_mean on the final file
result = calculate_mean.delay(chunk[0], numFiles)
print("All done!")



