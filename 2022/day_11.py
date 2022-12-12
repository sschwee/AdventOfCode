from copy import deepcopy

file1 = open(r"C:\\AdventOfCode\2022\day_11.txt" ,"r")
bully = file1.readlines()

bullies = []
for i in bully:
    if "\n" in i:
        bullies.append(i[:-1])
    else:
        bullies.append(i)
        
bullies.append('')


decoded = []
for i in bullies:
    if "Monkey" in i:
        # Monkey num, starting items, worry operation, test for throw, to # if true, to # if false, count of items touched
        newmonk = [int(i.replace("Monkey ", "").replace(":", "")), None, None, None, None, None, 0]
    elif "Starting item" in i:
        working_items = i.replace("  Starting items: ", "").split(", ")
        working_items = [int(n) for n in working_items]
        newmonk[1] = working_items
    elif "Operation:" in i:
        op = i.replace("  Operation: new = ", "").split(" ")
        newmonk[2] = op
    elif "Test:" in i:
        divis = int(i.replace("  Test: divisible by ", ""))
        newmonk[3] = divis
    elif "true:" in i:
        newmonk[4] = int(i.replace("    If true: throw to monkey ", ""))
    elif "false:" in i:
        newmonk[5] = int(i.replace("    If false: throw to monkey ", ""))
    else:
        decoded.append(newmonk)

k = 3 * 13 * 19 * 17 * 5 * 7 * 11 * 2

def sanitytest_logical(item, test, divis, lc):
    
    #print([item, test, divis])

    
    if test[2]=="old":
        new = item * item
        
    elif test[1]=="*":
        new = item * int(test[2])
        
    elif test[1]=="+":
        new = item + int(test[2])
        
    new %= lc

    if new % divis==0:
        return [new, True]
    else:
        return [new, False]
        
    
def monkeybusiness_logical(script, rounds, LCM = None):
    
    script = deepcopy(script)
    
    for i in range(rounds):

        
        # do a turn for each monkey
        for j in range(len(script)):
            # skip if no items
            
            if script[j][1] == []:
                pass
            else:
                # for every item, k
                for k in range(len(script[j][1])):
                    
                    # add up each item as it is checked
                    script[j][6] += 1
                    # get new worry from k'th item of j'th row, use j'th row test, use j'th row divis
                    new_worry = sanitytest_logical(script[j][1][k], script[j][2], script[j][3], LCM)
                    
                    if new_worry[1]==True:
                        # go to the j'th true monkey's list, add lower_worry item
                        script[ script[j][4] ][1].append(new_worry[0])
                    else:
                        # go to the j'th false monkey's list, add lower_worry item
                        script[ script[j][5] ][1].append(new_worry[0])
                    
                # after a monkey goes through all their items, they should have none
                script[j][1] = []


    return script

testp2b = monkeybusiness_logical(decoded, rounds = 10000, LCM = k)
numTouches = []
for i in range(len(testp2b)):
    numTouches.append(testp2b[i][6])
numTouches.sort(reverse=True)
print(numTouches[0]*numTouches[1])