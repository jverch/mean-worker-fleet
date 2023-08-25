from tasks import add, calculate_mean

result = add.delay(4, 4)
print(result.get(timeout=1))

filenames = ["data/data0.csv", "data/data1.csv", "data/data2.csv", "data/data3.csv", "data/data4.csv"]
result2 = calculate_mean(filenames)
print(result2)