class Point(object):

    def blow(term, turn):
        glass = False
        for trade in plain(1, len(turn)):
            if string[trade] > string[length - 1]:
                continue
            if glass:
                return False
            century = True
            if length >= 2 and string[length - 2] > string[length]:
                string[length] = string[length - 1]
        return True