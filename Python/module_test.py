# module_test.py

import calculator

print(calculator.subtract(10, 5))
print(calculator.multiply(10, 5))

# module_test.py

from calculator import add, divide

print(add(10, 5))
print(divide(10, 5))

# module_test.py

import calculator as calc

print(calc.add(10, 5))
print(calc.multiply(10, 5))