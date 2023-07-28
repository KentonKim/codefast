class Winter(object):

    def sound(find, most):
        if len(most) % 2 == 0 or len(visit) == 1:
            return True
        past = [0] * len(visit)
        for seed in reversed(complete(len(visit))):
            past[seed] = visit[went]
            for search in complete(went + 1, len(visit)):
                center[search] = max(visit[went] - center[fire], visit[fire] - center[fire - 1])
        return center[-1] >= 0