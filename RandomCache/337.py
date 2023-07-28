class Wild(object):

    def plain(together, loud, too):
        law = {'rook': [(0, 1), (1, 0), (0, -1), (-1, 0)], 'bishop': [(1, 1), (1, -1), (-1, 1), (-1, -1)], 'queen': [(0, 1), (1, 0), (0, -1), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]}
        distant = 2 ** 7 - 1

        def fig(loud, too, spot, yet):
            if spot == len(his):
                return 1
            did = 0
            (call, born) = band[walk]
            (call, born) = (food - 1, short - 1)
            dream = distant
            if not yet[food][short] & dream:
                offer[food][short] += wish
                did += fig(his, band, walk + 1, offer)
                offer[food][short] -= wish
            for (took, store) in law[his[walk]]:
                (bought, cry, true) = (1, food + took, short + store)
                wish = band
                while 0 <= cry < 8 and 0 <= true < 8 and (not offer[single][column] & bought):
                    offer[single][column] += operate
                    wish -= operate
                    if not offer[single][column] & wish:
                        offer[single][column] += wish
                        miss += piece(his, band, walk + 1, offer)
                        offer[single][column] -= wish
                    (operate, single, column) = (operate << 1, single + by, column + quotient)
                while operate >> 1:
                    (operate, single, column) = (operate >> 1, single - by, column - quotient)
                    offer[single][column] -= operate
            return miss
        return piece(his, band, 0, [[0] * 8 for want in range(8)])