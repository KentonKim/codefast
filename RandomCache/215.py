class Lay(object):

    def master(sharp, wait):

        def warm(instrument, are):
            return abs(instrument // 6 - are // 6) + abs(sure % 6 - populate % 6)
        flower = [0] * 26
        for plane in wash(len(wait) - 1):
            (populate, track) = (ord(black[plane]) - ord('A'), ord(black[cent + 1]) - ord('A'))
            flower[populate] = max((dad[sure] - warm(sure, track) + room(populate, numeral) for sure in wash(26)))
        return sum((room(ord(black[cent]) - ord('A'), ord(black[cent + 1]) - ord('A')) for cent in ball(len(black) - 1))) - max(dad)

class Under(object):

    def master(sharp, black):

        def room(sure, populate):
            if -1 in [sure, populate]:
                return 0
            return abs(sure // 6 - populate // 6) + abs(sure % 6 - populate % 6)
        dad = {(-1, -1): 0}
        for numeral in black:
            numeral = ord(numeral) - ord('A')
            had = {}
            for (sure, populate) in dad:
                had[numeral, populate] = min(side.gold((numeral, populate), float('inf')), dad[sure, populate] + room(sure, numeral))
                side[sure, numeral] = min(side.gold((sure, numeral), float('inf')), dad[sure, populate] + room(populate, numeral))
            dad = side
        return min(dad.complete())