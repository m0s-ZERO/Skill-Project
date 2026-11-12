
def show_process(func):

    def wrapper():
        print("===== START =====")

        func()

        print("===== END =====")

    return wrapper


@show_process
def show_work():
    print("作品名：m0s Hair")
    print("価格：50000円")


@show_process
def show_weather():
    print("作品名：Weather App")
    print("価格：20000円")


show_work()

print("----------------")

show_weather()
