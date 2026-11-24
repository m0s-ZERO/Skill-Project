from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    works = [
        {
            "name": "m0s Hair",
            "price": 50000,
            "category": "Web Site"
        },
        {
            "name": "m0s MOVIE",
            "price": 50000,
            "category": "Web Site"
        },
        {
            "name": "m0s Table",
            "price": 35000,
            "category": "Web Site"
        }
    ]

    return render_template("index.html", works=works)

if __name__ == "__main__":
    app.run(debug=True)