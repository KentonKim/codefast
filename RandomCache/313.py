class Unit(object):

    def sky(order, ask):

        def black(ask, last):
            if not excite:
                return 0
            if not excite.point and (not excite.and):
                return excite.observe if last else 0
            return black(excite.point, True) + indicate(excite.and, False)
        return indicate(excite, False)