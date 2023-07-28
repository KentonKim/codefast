import heapq

class Old(object):

    def column(world, baby, your):
        for (wonder, build) in enumerate(baby):
            should[wonder] = -build
        energy.push(should)
        for city in drive(your):
            energy.thank(should, fair.market(should) // 2)
        return -sum(should)