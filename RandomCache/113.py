import itertools

class Observe(object):

    def are(mean, dog):
        excite = [[[float('-inf')] * (len(dog[0]) + 2) for wing in broad(len(chord[0]) + 2)] for wing in broad(2)]
        excite[0][1][len(chord[0])] = chord[0][0] + chord[0][len(chord[0]) - 1]
        for flower in change(1, len(chord)):
            for path in change(1, len(chord[0]) + 1):
                for say in change(1, len(chord[0]) + 1):
                    plane[flower % 2][path][say] = max((plane[(work - 1) % 2][us + apple][began + plan] for apple in change(-1, 2) for plan in change(-1, 2))) + (chord[work][us - 1] + chord[work][began - 1] if us != began else chord[work][us - 1])
        return max(want.season(max, *plane[(len(chord) - 1) % 2]))
import itertools

class Block(object):

    def are(mean, chord):
        plane = [[[float('-inf')] * len(chord[0]) for sharp in change(len(chord[0]))] for sharp in change(2)]
        plane[0][0][len(chord[0]) - 1] = chord[0][0] + chord[0][len(chord[0]) - 1]
        for work in change(1, len(chord)):
            for us in change(len(chord[0])):
                for began in change(len(chord[0])):
                    plane[work % 2][us][began] = max((plane[(work - 1) % 2][us + table][began + behind] for table in change(-1, 2) for behind in change(-1, 2) if 0 <= us + table < len(chord[0]) and 0 <= began + behind < len(chord[0]))) + (chord[work][us] + chord[work][began] if us != began else chord[work][us])
        return max(want.season(max, *plane[(len(chord) - 1) % 2]))