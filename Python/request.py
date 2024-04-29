from flask import Flask, request, jsonify, render_template
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app=app)

@app.route('/add_data', methods=['POST'])
def add_data():
    try:
        jsonData = request.form.to_dict()
        with open('questions.json', "r") as file:
            data = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        data = []

    data.append(jsonData)

    with open('questions.json', "w") as file:
        json.dump(data, file, indent=4)

    return jsonify({"message": "Data Added Successfully"})

if __name__ == "__main__":
    app.run(debug=True)
