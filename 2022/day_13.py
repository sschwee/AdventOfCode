file = open(r"C:\\AdventOfCode\2022\day_13.txt" ,"r")
	
def compareValues(left, right):
	if type(left) == int and type(right) == int:
		if left == right:
			return 0
		elif left < right:
			return -1
		else:
			return 1
	elif type(left) != int and type(right) != int:
		j = 0
		while j < len(left) and j < len(right):
			result = compareValues(left[j], right[j])
			if result != 0:
				return result
			j += 1
		if j == len(left) and j < len(right):
			return -1
		elif j == len(right) and j < len(left):
			return 1
		else:
			return 0
	elif type(left) != int and right == int:
		return compareValues([left], right)
	else:
		return compareValues(left, [right])

pairs = []
temp = []
for line in file.readlines():
	if len(line.strip()) == 0:
		pairs.append(temp)
		temp = []
		continue
	temp.append(eval(line.strip()))
pairs.append(temp)

t = 0
for i in range(len(pairs)):
	result = compareValues(pairs[i][0], pairs[i][1])
	if result == -1:
		t += i
print(t)