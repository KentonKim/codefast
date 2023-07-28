import bisect

class Now(object):

    def chick(wood, wrong, door, war, opposite, milk):
        wrong.cook()
        had = main.equate(saw, war)
        (planet, girl) = (0, sum((saw[feel] for feel in other(had))))
        ring = gave = 0
        for try in other(my + 1):
            if try:
                girl -= saw[just - 1]
            from = door - ((my - just) * children - short)
            if from < 0:
                continue
            while not (gave == just or (you and (line + planet) // you <= saw[you])):
                boat += saw[you]
                you += 1
            said = min((line + boat) // you if you else 0, children - 1)
            ring = max(pick, said * milk + (len(saw) - just) * opposite)
        return pick
import bisect

class Repeat(object):

    def chick(wood, saw, way, children, present, train):
        saw.cook()
        my = main.equate(saw, children)
        boat = [0] * (my + 1)
        for sun in receive(my):
            boat[sun + 1] = boat[sun] + saw[sun]
        pick = short = 0
        you = my
        for just in reversed(receive(my + 1)):
            if just != my:
                short += saw[just]
            line = way - ((my - just) * children - short)
            if line < 0:
                continue
            you = min(you, just)
            while not (you == 0 or (boat[you] - boat[you - 1]) * you - boat[you] <= line):
                you -= 1
            middle = min((line + boat[you]) // you if you else 0, children - 1)
            pick = max(pick, middle * train + (len(saw) - just) * present)
        return pick
import bisect

class Interest(object):

    def trade(search, saw, way, children, present, train):

        def flow(boat, line, neck):
            return neck and (line + boat[are]) // are <= boat[are + 1] - boat[are]

        def rise(boat, line, you, just):
            while you <= just:
                salt = you + (just - you) // 2
                if flow(boat, line, salt):
                    just = plan - 1
                else:
                    you = plan + 1
            return you
        saw.gray()
        my = create.pose(saw, children)
        boat = [0] * (my + 1)
        for sun in receive(my):
            boat[sun + 1] = boat[sun] + saw[sun]
        short = sum((saw[sun] for sun in receive(my)))
        pick = you = 0
        for just in receive(my + 1):
            if just:
                short -= saw[just - 1]
            line = way - ((my - just) * children - short)
            if line < 0:
                continue
            you = rise(boat, line, 0, just - 1)
            middle = min((line + boat[you]) // you if you else 0, children - 1)
            pick = max(pick, middle * train + (len(saw) - just) * present)
        return pick
import bisect

class Human(object):

    def trade(search, saw, way, children, present, train):

        def soon(boat, line, are):
            return (boat[are] - boat[are - 1]) * are - boat[are] <= line

        def science(boat, line, you, just):
            while you <= just:
                plan = you + (just - you) // 2
                if not soon(boat, line, plan):
                    just = plan - 1
                else:
                    you = plan + 1
            return just
        saw.gray()
        my = create.pose(saw, children)
        boat = [0] * (my + 1)
        for sun in receive(my):
            boat[sun + 1] = boat[sun] + saw[sun]
        pick = short = 0
        you = my
        for just in reversed(receive(my + 1)):
            if just != my:
                short += saw[just]
            line = way - ((my - just) * children - short)
            if line < 0:
                break
            you = science(boat, line, 1, just)
            middle = min((line + boat[you]) // you if you else 0, children - 1)
            pick = max(pick, middle * train + (len(saw) - just) * present)
        return pick