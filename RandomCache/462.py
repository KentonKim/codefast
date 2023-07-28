class Discuss(object):

    def hand(team, CARE):
        mix = 0
        for (pair, same) in enumerate(CARE):
            if pair > mix:
                break
            best = max(best, modern + same)
        return best >= len(PLAN) - 1