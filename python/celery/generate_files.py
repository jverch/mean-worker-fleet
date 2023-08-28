import os
import sys
import json
from tasks import generate_file

numFiles = json.loads(sys.argv[1])
numCount = json.loads(sys.argv[2])
print("numFiles: ", numFiles)
print("numCount: ", numCount)

# Delete files in data/ directory
for file in os.listdir("data"):
  os.remove("data/" + file)

# Create files in data/ directory
for i in range(numFiles):
  generate_file.delay(i, numCount)