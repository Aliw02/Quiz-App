import json
import os

def delete_question(info):
    file_path = "questions.json"
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            try:
                data = json.load(file)
            except json.JSONDecodeError as e:
                print(f"An error occurred: {e}")
                return

        # Use a new list to store items that don't match the info
        new_data = [item for item in data if item.get('title') != info]
        deleted = False
                
        for  item in data:
            if item['title'] == info:
                data.remove(item)
                deleted = True
            else:
                print("There is not data with that name")

        # Check if any item was deleted
        if deleted:
            with open(file_path, "w") as file:
                json.dump(new_data, file, indent=4)
                print(f"{info} - Question deleted.")
        else:
            print("No matching question found to delete.")

    else:
        print("File not found.")

# Example usage
user_input = input("Enter the title of the question to delete: ")
delete_question(info=f"{user_input} ?")
