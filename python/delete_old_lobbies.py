# Program: delete_old_lobbies.py
# Author: C. Van der Deen
# Checks for game lobbies that haven't had their timestamp
# updated in 5 minutes, and deletes those lobbies.
# Date: 16-06-2023

import time
import pathlib
import json
import os


def check_json(filepath):
    '''Checks a provided JSON file's "lastUpdated" parameter, and deletes
    the file if the timestamp is older than 15 minutes.'''
    with open(filepath, "r") as json_input:
        json_contents = json.load(json_input)
    json_timestamp = json_contents["lastUpdated"]
    try:
        int(json_timestamp)
        json_timestamp = json_timestamp[:-3]
        current_timestamp = time.time()
        if int(json_timestamp) + 300 < current_timestamp:
            os.remove(filepath)
    except (TypeError, ValueError) as error:
        os.remove(filepath)


def create_filepaths(path_input):
    '''Creates a list of filepaths based on the input path.
    Returns only files that end with "json".'''
    list_append = []
    list_return = []
    for item in path_input.iterdir():
        path_subdir = ""
        if item.is_file() is False:
            path_subdir = pathlib.Path(item)
            list_add = create_filepaths(path_subdir)
            if list_add != []:
                list_append += list_add
        else:
            if str(item)[-4:] == "json":
                list_append.append(item)
    for item in list_append:
        list_return.append(str(item))
    return list_return


def main():
    path_lobby_dir = pathlib.Path("../games")
    list_json_files = create_filepaths(path_lobby_dir)
    for filepath in list_json_files:
        check_json(filepath)


if __name__ == "__main__":
    main()
