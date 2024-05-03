from flask import Flask, request, jsonify, render_template
import json
from flask_cors import CORS
from time import *

app = Flask(__name__)
CORS(app=app)

@app.route('/add_data', methods=['POST'])
def add_data():

    """
    Handles incoming POST requests to add data to the 'questions.json' file.
    - Parses the JSON data from the request form.
    - Appends the data to the existing list or initializes a new list if the file is empty.
    - Writes the updated data back to the file.
    Returns a success message or an error message if the input is empty.
    """

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
    """
    Handles both GET and POST requests to delete data from the 'questions.json' file.
    - Retrieves the JSON data from the request.
    - Attempts to find and remove an item matching the 'title' specified in the JSON data.
    - Updates the file if the item is found and deleted.
    Returns a success message if the data is deleted, or an error message if the data is not found or if there are issues with the file.
    """

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
    """
    This block serves as the entry point for the Flask application.
    When the script is run directly (not imported), the following happens:
    - The 'app.run()' method starts the local development server.
    - Setting 'debug=True' enables the debugger and reloader for easier debugging during development.
    """
    app.run(debug=True)
