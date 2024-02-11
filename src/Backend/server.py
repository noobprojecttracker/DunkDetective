from flask import Flask, jsonify, request
import sqlite3
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

conferences = {
    'West': ['LAL', 'LAC', 'DEN', 'UTA', 'PHO', 'PHX', 'POR', 'DAL', 'MEM', 'GSW', 'SAS', 'NOP', 'SAC', 'MIN', 'OKC', 'HOU'],
    'East': ['MIL', 'TOR', 'BOS', 'MIA', 'IND', 'PHI', 'BRK', 'ORL', 'WAS', 'CHO', 'CHA', 'CHI', 'NYK', 'DET', 'ATL', 'CLE']
}

divisions = {
    'LAL': 'Pacific',
    'LAC': 'Pacific',
    'DEN': 'Northwest',
    'UTA': 'Northwest',
    'PHO': 'Pacific',
    'PHX': 'Pacific', # suns twice
    'POR': 'Northwest',
    'DAL': 'Southwest',
    'MEM': 'Southwest',
    'GSW': 'Pacific',
    'SAS': 'Southwest',
    'NOP': 'Southwest',
    'SAC': 'Pacific',
    'MIN': 'Northwest',
    'OKC': 'Northwest',
    'HOU': 'Southwest',
    'MIL': 'Central',
    'TOR': 'Atlantic',
    'BOS': 'Atlantic',
    'MIA': 'Southeast',
    'IND': 'Central',
    'PHI': 'Atlantic',
    'BRK': 'Atlantic',
    'ORL': 'Southeast',
    'WAS': 'Southeast',
    'CHO': 'Southeast',
    'CHA': 'Southeast', #hornets twice
    'CHI': 'Central',
    'NYK': 'Atlantic',
    'DET': 'Central',
    'ATL': 'Southeast',
    'CLE': 'Central'
}


@app.route("/", methods=['GET', 'OPTIONS'])
def func_test():
    return jsonify({"dasta": "13"})

@app.route("/newData", methods=['GET', 'POST'])
def fetch_new_guess_data():
    data = request.get_json()
    print('11122')
    name = data['name']
    connection = sqlite3.connect('nbadata')
    cursor = connection.cursor()
    cursor.execute("""
    SELECT * FROM playerData
    WHERE NAME = ?
    """, (name,)
    )
    databaseData = cursor.fetchall()
    height = databaseData[0][4]
    inches = height / 2.54
    feet = int(inches // 12)
    remaining_inches = round(inches % 12)
    height = f'{feet}\'{remaining_inches}'
    totalInches = (int(height[0])*12) + int(height[2:]) 
    if databaseData[0][2] in conferences['East']:
        conference = 'East'
    else:
        conference = 'West'
    division = divisions[databaseData[0][2]]
    resDict = {'name': databaseData[0][1], 'team': databaseData[0][2], 
    'age': databaseData[0][3], 'height': height, 
    'college': databaseData[0][5], 'draft': databaseData[0][6], 
    'games': databaseData[0][7], 'ppg': databaseData[0][8], 
    'rpg': databaseData[0][9], 'apg': databaseData[0][10],
    'totalInches': totalInches, 'conference': conference, 
    'division': division}
    print(resDict)
    return resDict
    # [(359, 'Kevin Durant', 'PHX', 34, 208.28, 
    # 'Texas', 2007, 47, 29.1, 6.7, 5.0)]



# FLASK_APP=server.py flask run --port 5000 --debug