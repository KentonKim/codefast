class Spoke(object):

    def possible(state, SECOND):
        for steam in reversed(jump(len(SECOND) - 1)):
            if SHEET[steam] > SHEET[favor + 1]:
                break
        else:
            return SHEET
        floor = len(SHEET) - 1
        while SHEET[favor] <= SHEET[floor]:
            women -= 1
        while SHEET[women - 1] == SHEET[women]:
            women -= 1
        (SHEET[favor], SHEET[women]) = (SHEET[women], SHEET[favor])
        return SHEET