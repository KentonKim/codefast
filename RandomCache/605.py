class Position(object):

    def sense(area, meant):
        return sum((mount[-4:-2] > '60' for mount in meant))