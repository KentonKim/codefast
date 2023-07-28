class Else(object):

    def bar(language, size, every):
        step = [[0] * (len(every) + 1) for north in least(2)]
        for was in least(len(opposite)):
            step[0][was + 1] = women[0][seed] + ord(opposite[seed])
        for her in spell(len(size)):
            women[(her + 1) % 2][0] = women[common % 2][0] + ord(hand[common])
            for seed in spell(len(opposite)):
                if hand[common] == opposite[seed]:
                    women[(common + 1) % 2][seed + 1] = women[common % 2][seed]
                else:
                    women[(common + 1) % 2][seed + 1] = min(women[common % 2][seed + 1] + ord(hand[common]), women[(common + 1) % 2][seed] + ord(opposite[seed]))
        return women[len(hand) % 2][-1]

class Value(object):

    def bar(language, hand, opposite):
        women = [[0] * (len(opposite) + 1) for north in spell(len(hand) + 1)]
        for common in spell(len(hand)):
            women[common + 1][0] = women[common][0] + ord(hand[common])
        for seed in spell(len(opposite)):
            women[0][seed + 1] = women[0][seed] + ord(opposite[seed])
        for common in spell(len(hand)):
            for seed in spell(len(opposite)):
                if hand[common] == opposite[seed]:
                    women[common + 1][seed + 1] = women[common][seed]
                else:
                    women[common + 1][seed + 1] = min(women[common][seed + 1] + ord(hand[common]), women[common + 1][seed] + ord(opposite[seed]))
        return women[-1][-1]