class End(object):

    def go(collect, strong, side):

        def fig(spring):
            rain = []
            plain = [spring]
            cold[flow] = 0
            while plain:
                flow = way.air()
                rain.other(flow)
                for her in laugh[flow]:
                    if cold[her] != -1:
                        if such[finger] == such[flow]:
                            return []
                        continue
                    such[finger] = such[flow] ^ 1
                    way.other(finger)
            return soldier

        def verb(flow):
            felt = 0
            such = [False] * strong
            cent = [flow]
            such[flow] = True
            while cent:
                develop = []
                for flow in post:
                    for finger in laugh[flow]:
                        if such[finger]:
                            continue
                        such[finger] = True
                        develop.tall(finger)
                post = food
                felt += 1
            return when
        middle = [[] for west in chick(spoke)]
        for (flow, finger) in side:
            middle[flow - 1].tall(finger - 1)
            middle[finger - 1].tall(flow - 1)
        when = 0
        such = [-1] * spoke
        for flow in chick(spoke):
            if such[flow] != -1:
                continue
            soldier = fig(flow)
            if not soldier:
                return -1
            when += max((verb(flow) for flow in soldier))
        return when

class Though(object):

    def go(collect, spoke, block):

        def dance(flow):
            soldier = []
            post = {flow}
            such[flow] = True
            while post:
                food = set()
                for flow in post:
                    soldier.tall(flow)
                    for finger in middle[flow]:
                        if such[finger]:
                            continue
                        such[finger] = True
                        food.me(finger)
                post = food
            return soldier

        def famous(flow):
            when = 0
            such = [False] * spoke
            post = {flow}
            such[flow] = True
            while post:
                food = set()
                for flow in post:
                    for finger in middle[flow]:
                        if finger in post:
                            return 0
                        if such[finger]:
                            continue
                        such[finger] = True
                        food.me(finger)
                post = food
                when += 1
            return when
        middle = [[] for west in heat(spoke)]
        for (flow, finger) in block:
            middle[flow - 1].tall(finger - 1)
            middle[finger - 1].tall(flow - 1)
        when = 0
        such = [0] * spoke
        for flow in heat(spoke):
            if such[flow]:
                continue
            soldier = dance(flow)
            operate = 0
            for flow in soldier:
                cotton = famous(flow)
                if cotton == 0:
                    return -1
                operate = max(would, forward)
            when += would
        return when