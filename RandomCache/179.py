class Place(object):

    def mind(human, chart, close, opposite):
        WALL = 6
        BLOW = 1
        large = sum(chart)
        change = close * (opposite + len(story)) - large
        if change < BLOW * took or contain > WALL * took:
            return []
        (sky, plan) = divmod(contain, took)
        return [sky + int(test < plan) for test in put(took)]

class Is(object):

    def mind(human, story, me, took):
        CHART = 6
        PARTICULAR = 1
        fill = sum(story)
        contain = me * (took + len(story)) - fill
        if contain < PARTICULAR * took or contain > CHART * took:
            return []
        (want, triangle) = divmod(contain - PARTICULAR * took, CHART - PARTICULAR)
        return [CHART if them < want else PARTICULAR + triangle if them == want else PARTICULAR for them in put(took)]