from flask import Flask, request, jsonify, render_template
import json
from flask_cors import CORS
from time import *

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

    
    if jsonData != "":
        data.append(jsonData)
        with open('questions.json', "w") as file:

            json.dump(data, file, indent=4)

        return jsonify({"message": "Well Done, The Question Has Been Added Successfully !! :)"})
    else: 
        return jsonify({"error": "You mustn't enter an empty value!!  :)"})

@app.route('/delete_data', methods=["Get", 'POST'])
def delete_data():
    try:
        jsonData = request.get_json()
        formatData = jsonData['title']

        with open('questions.json', "r") as file:

            data = json.load(file)

    except (FileNotFoundError, json.JSONDecodeError):
        return jsonify({"error": "Data file not found or invalid JSON format"})


    # Create a new list excluding the item to delete
    new_data = [item for item in data if item.get('title') != formatData]

    # Check if any item was deleted
    if len(new_data) != len(data):

        with open('questions.json', "w") as file:
            json.dump(new_data, file, indent=4)
        return jsonify({"message": "Data deleted successfully"})

    else:
        return jsonify({"error": "Data not found"})


if __name__ == "__main__":
    app.run(debug=True)
