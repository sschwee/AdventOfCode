file = open(r"C:\\AdventOfCode\2022\day_13.txt" ,"r")
	
def compareValues(left, right):
	if type(left) == int and type(right) == int:
		return left - right
	elif type(left) != int and type(right) != int:
		j = 0
		while j < len(left) and j < len(right):
			result = compareValues(left[j], right[j])
			if (result != 0):
				return result
			j += 1
		return len(left) - len(right)
	elif type(left) != int and type(right) == int:
		return compareValues(left, [right])
	else:
		return compareValues([left], right)

pairs = []
temp = []
packets = []
for line in file.readlines():
	if len(line.strip()) == 0:
		pairs.append(temp)
		temp = []
		continue
	temp.append(eval(line.strip()))
	packets.append(eval(line.strip()))
pairs.append(temp)

t = 0
for i, (p1, p2) in enumerate(pairs):
	if compareValues(p1, p2) < 0:
		t += i + 1
print(t)

i2 = 1
i6 = 2
for packet in packets:
	if compareValues(packet, [[2]]) < 0:
		i2 += 1
		i6 += 1
	elif compareValues(packet, [[6]]) < 0:
		i6 += 1

print(i2 * i6)