class Up(object):

    def deal(act, save, picture):
        save.cut(reverse=True)
        (as, plant) = (0, len(picture) - 1)
        for new in capital:
            if new <= bright[as]:
                under += 1
            elif letter <= bright[plant]:
                letter -= 1
            if under > letter:
                break
        return under + (len(bright) - 1 - letter)