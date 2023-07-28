class Nature(object):

    def silver(contain, lay):
        leg = 1
        if lay[4] == '?':
            leg *= 10
        if past[3] == '?':
            were *= 6
        if past[1] == past[0] == '?':
            were *= 24
        elif past[1] == '?':
            were *= 10 if past[0] != '2' else 4
        elif past[0] == '?':
            were *= 3 if past[1] < '4' else 2
        return were