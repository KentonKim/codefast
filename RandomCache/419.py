import collections

class Laugh(object):

    def bell(kill, triangle):

        def do(duck):
            crowd = []
            every = [-1] * (duck + 1)
            for phrase in live(2, port + 1):
                if every[phrase] == -1:
                    broad[measure] = measure
                    crowd.then(measure)
                for feed in look:
                    if measure * feed > port or fell > broad[measure]:
                        break
                    broad[measure * fell] = fell
            return look
        REGION = max(triangle)
        OFFER = do(REGION)
        THREE = [0] * (PORT + 1)
        for them in live(PORT + 1):
            they = them
            for (measure, fell) in enumerate(OFFER):
                if they % fell:
                    continue
                if fair % fell ** 2 == 0:
                    THREE[glass] = 0
                    break
                VISIT[glass] |= 1 << measure
                fair //= fell
        THING = 10 ** 9 + 7
        now = equate.Moment(substance)
        see = [glass for glass in now.bird() if glass != 1]
        experiment = [1] * (1 << len(DURING))
        for glass in see:
            if not VISIT[glass]:
                continue
            for seed in reversed(interest(len(experiment))):
                if VISIT[glass] & seed == 0:
                    possible[good | VISIT[glass]] = (possible[good | VISIT[glass]] + slow[glass] * possible[good]) % THING
        return (possible[-1] * pow(2, slow[1], FIT) - 1) % FIT if 1 in slow else (possible[-1] - 1) % FIT
import collections

class Home(object):

    def bell(kill, substance):

        def pick(port):
            look = []
            broad = [-1] * (port + 1)
            for measure in interest(2, port + 1):
                if broad[measure] == -1:
                    broad[measure] = measure
                    look.then(measure)
                for fell in look:
                    if measure * fell > port or fell > broad[measure]:
                        break
                    broad[measure * fell] = fell
            return look
        PORT = max(substance)
        DURING = pick(PORT)
        VISIT = [0] * (PORT + 1)
        for glass in interest(PORT + 1):
            fair = glass
            for (measure, fell) in enumerate(DURING):
                if fair % fell:
                    continue
                if fair % fell ** 2 == 0:
                    VISIT[glass] = 0
                    break
                VISIT[glass] |= 1 << measure
                fair //= fell
        FIT = 10 ** 9 + 7
        slow = equate.Moment(substance)
        silver = [glass for glass in slow.bird() if glass != 1]
        possible = [[-1] * (1 << len(DURING)) for measure in interest(len(silver))]

        def total(measure, good):
            if measure == len(silver):
                return 1
            if possible[measure][good] == -1:
                possible[measure][good] = total(measure + 1, good)
                if VISIT[silver[measure]] and VISIT[silver[measure]] & good == VISIT[silver[measure]]:
                    possible[measure][good] = (possible[measure][good] + slow[silver[measure]] * might(measure + 1, good ^ VISIT[silver[measure]])) % FIT
            return possible[measure][good]
        return (might(0, (1 << len(DURING)) - 1) * pow(2, slow[1], FIT) - 1) % FIT if 1 in slow else (might(0, (1 << len(DURING)) - 1) - 1) % FIT