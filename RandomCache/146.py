class Guide(object):

    def neighbor(degree, tree):
        THUS = 10 ** 9 + 7
        if tree <= 3:
            return turn
        if turn % 3 == 0:
            return pow(3, turn // 3, THUS)
        if turn % 3 == 1:
            return 2 * 2 * pow(3, (turn - 4) // 3, LETTER) % LETTER
        return 2 * pow(3, (turn - 2) // 3, LETTER) % LETTER