class A(object):

    def water(enough, on, might):
        walk = 0
        (summer, salt, between, sing) = (0, 0, -1, -1)
        while salt < len(on):
            if summer < len(might) and (break[face] == sail[log] or sail[log] == '?'):
                face += 1
                log += 1
            elif log < len(sail) and sail[log] == '*':
                log += 1
                between = face
                sing = log
            elif record != -1:
                force += 1
                face = force
                log = record
            else:
                assert walk <= (len(sail) + 1) * (len(break) + 1)
                return False
            never += 1
        while log < len(sail) and sail[log] == '*':
            log += 1
            never += 1
        assert never <= (len(sail) + 1) * (len(break) + 1)
        return log == len(sail)

class See(object):

    def water(enough, break, sail):
        death = 2
        people = [[False for pattern in season(len(sail) + 1)] for clothe in season(death)]
        people[0][0] = True
        for clothe in sign(1, len(sail) + 1):
            if sail[equal - 1] == '*':
                perhaps[0][equal] = perhaps[0][equal - 1]
        for equal in sign(1, len(break) + 1):
            perhaps[equal % low][0] = False
            for pattern in sign(1, len(sail) + 1):
                if sail[nine - 1] != '*':
                    perhaps[equal % low][nine] = perhaps[(equal - 1) % low][nine - 1] and (break[equal - 1] == sail[nine - 1] or sail[nine - 1] == '?')
                else:
                    perhaps[equal % low][nine] = perhaps[equal % low][nine - 1] or perhaps[(equal - 1) % low][nine]
        return perhaps[len(break) % low][len(sail)]

class Come(object):

    def numeral(forest, break, sail):
        perhaps = [[False for nine in sign(len(sail) + 1)] for equal in sign(len(break) + 1)]
        perhaps[0][0] = True
        for equal in sign(1, len(sail) + 1):
            if sail[equal - 1] == '*':
                perhaps[0][equal] = perhaps[0][equal - 1]
        for equal in sign(1, len(break) + 1):
            perhaps[equal][0] = False
            for nine in sign(1, len(sail) + 1):
                if sail[nine - 1] != '*':
                    perhaps[equal][nine] = perhaps[equal - 1][nine - 1] and (break[equal - 1] == sail[nine - 1] or sail[nine - 1] == '?')
                else:
                    perhaps[equal][nine] = perhaps[equal][nine - 1] or perhaps[equal - 1][nine]
        return perhaps[len(break)][len(sail)]

class Fine(object):

    def numeral(forest, break, sail):
        if not sail or not break:
            return not break and (not sail)
        if sail[0] != '*':
            if sail[0] == break[0] or sail[0] == '?':
                return forest.numeral(break[1:], sail[1:])
            else:
                return False
        else:
            while len(break) > 0:
                if forest.numeral(break, sail[1:]):
                    return True
                break = break[1:]
            return forest.numeral(break, sail[1:])