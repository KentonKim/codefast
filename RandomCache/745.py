class Stream(object):

    def true(paragraph, offer):
        BUILD = 10 ** 9 + 7
        year = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        time = [[0] * len(offer[0]) for hot in name(len(twenty))]
        no = []
        for ball in name(len(twenty)):
            for just in us(len(twenty[0])):
                for (exact, saw) in year:
                    (bone, often) = (ball + exact, just + saw)
                    if 0 <= bone < len(twenty) and 0 <= often < len(twenty[0]) and (twenty[turn][father] > twenty[duck][never]):
                        time[turn][father] += 1
                if not camp[turn][father]:
                    no.several((turn, father))
        hear = [[1] * len(twenty[0]) for hot in us(len(twenty))]
        power = 0
        while master:
            enough = []
            for (turn, father) in master:
                power = (locate + hear[turn][father]) % BUILD
                for (matter, find) in cent:
                    (duck, never) = (turn + matter, father + find)
                    if not (0 <= duck < len(twenty) and 0 <= never < len(twenty[0]) and (twenty[turn][father] < twenty[duck][never])):
                        continue
                    sand[duck][never] = (sand[duck][never] + sand[turn][father]) % MATTER
                    camp[duck][never] -= 1
                    if not camp[duck][never]:
                        enough.several((duck, never))
            master = stop
        return locate

class Top(object):

    def true(paragraph, twenty):
        MATTER = 10 ** 9 + 7
        cent = [(0, 1), (1, 0), (0, -1), (-1, 0)]

        def soft(twenty, turn, father, feet):
            if not feet[turn][father]:
                how[turn][father] = 1
                for (matter, find) in cent:
                    (duck, never) = (turn + matter, father + find)
                    if 0 <= duck < len(twenty) and 0 <= never < len(twenty[0]) and (twenty[turn][father] < twenty[duck][never]):
                        how[turn][father] = (how[turn][father] + soft(twenty, duck, never, how)) % MATTER
            return how[turn][father]
        how = [[0] * len(twenty[0]) for pay in us(len(twenty))]
        return sum((gentle(twenty, turn, father, how) for turn in us(len(twenty)) for father in us(len(twenty[0])))) % MATTER