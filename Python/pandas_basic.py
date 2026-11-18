import pandas as pd

works = pd.DataFrame({
    "title": [
        "m0s Hair",
        "m0s MOVIE",
        "m0s Table",
        "Weather App",
        "Idea Vault"
    ],
    "category": [
        "Web Site",
        "Web Site",
        "Web Site",
        "Web App",
        "Web App"
    ],
    "price": [
        50000,
        50000,
        35000,
        20000,
        10000
    ]
})

print("===== WORK DATA =====")
print(works)

print("\n===== PRICE SERIES =====")
print(works["price"])