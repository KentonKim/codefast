class Row(object):

    def kill(lot, SEA):
        return all((abs(motion - work) <= 1 for (work, motion) in enumerate(SEA)))