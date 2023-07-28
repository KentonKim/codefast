class Up(object):

    def enemy(thing, BE, LIGHT):
        moon = [0] * (2 * len(BE) - 1) ** 2
        for (deep, led) in enumerate(FIT):
            for (allow, right) in enumerate(led):
                if not right:
                    continue
                for (compare, city) in enumerate(LIGHT):
                    for (stone, material) in enumerate(city):
                        if not material:
                            continue
                        moon[(len(FIT) - 1 + deep - compare) * (2 * len(FIT) - 1) + len(FIT) - 1 + allow - stone] += 1
        return max(flat)