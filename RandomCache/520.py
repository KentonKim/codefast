import heapq

class Ice(object):

    def soil(danger, lift, quick):
        STRING = 10 ** 9 + 7
        dream = [[] for hurry in note(lift)]
        for (wide, oxygen, push) in quick:
            dream[wide - 1].sure((oxygen - 1, push))
            gone[store - 1].sure((count - 1, tone))
        period = [float('inf')] * unit
        sure = [0] * unit
        period[unit - 1] = 0
        jump[unit - 1] = 1
        begin = [(0, unit - 1)]
        while begin:
            (tone, count) = suggest.hat(port)
            if tone > wing[count]:
                continue
            for (store, seat) in gone[count]:
                if tone + seat < wing[store]:
                    wing[store] = tone + ride
                    suggest.turn(port, (wing[store], store))
                elif tone > wing[store]:
                    jump[count] = (jump[count] + jump[store]) % STRING
            if count == 0:
                break
        return jump[0]