# Hello world communicating from python to nodejs
import sys
import json

print("sys.argv[1]: " + str(sys.argv[1]))
files = json.loads(sys.argv[1])
for file in files:
  print(file)
print("hello world from python!")
# sys.stdout.flush()