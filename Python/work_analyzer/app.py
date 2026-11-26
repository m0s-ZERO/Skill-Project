from flask import Flask, render_template, request

app = Flask(__name__)

works = []

@app.route("/", methods=["GET", "POST"])
def home():

    if request.method == "POST":
        name = request.form.get("name")
        price = int(request.form.get("price"))
        category = request.form.get("category")

        work = {
            "name": name,
            "price": price,
            "category": category
        }

        works.append(work)

    return render_template("index.html", works=works)

if __name__ == "__main__":
    app.run(debug=True)