from tasks import calculate_sum, calculate_mean
import sys
import json
import queue

print("Hello from celery_scheduler.py!")
# Many files
# Get string from sys.argv[1] and convert to array, add to queue
files = json.loads(sys.argv[1])
numFiles = len(files)
queue = queue.Queue(maxsize=len(files))
for file in files:
  queue.put(file)

print("queue: ", queue)

# divide queue into chunks of 5 and run calculate_mean on each chunk
chunk = []
count = 0
while queue.empty() == False:
  # print("queue size: ", queue.qsize())
  chunk.append(queue.get())
  if len(chunk) == 5 or (queue.empty() == True and len(chunk) > 1):
    print("chunk: ", chunk)
    print("count: ", count)
    result = calculate_sum.delay(chunk, count)
    queue.put(result.get()) # Need to refactor this to be async
    chunk = []
    count += 1

# calculate_mean on the final file
result = calculate_mean.delay(chunk[0], numFiles)
print("result: ", result.get())
print("All done!")



