import requests
from pymongo import MongoClient
from typing import List, Dict
import configparser

import src.parser

API_URL = "http://overpass-api.de/api/interpreter"
QUERY_TIMEOUT = 900
WROCLAW_OSM_ID = 2805690
AREA_OSM_ID = 3600000000 + WROCLAW_OSM_ID
CITY_AREA = "area(" + str(AREA_OSM_ID) + ")" + "[admin_level=8];"
COUNTRY_AREA = 'area["ISO3166-1"="PL"]' + '[admin_level=2];'

amenities = {
    'food': [
        'bar', 'biergarten', 'fast_food', 'cafe', 'food_court', 'ice_cream', 'pub', 'restaurant'
    ],
    'entertainment': [
        'casino', 'cinema', 'nightclub', 'theatre'
    ]
}

db_config = configparser.ConfigParser()
db_config.read('dbconfig.ini')
db_conn_url = "mongodb+srv://" + db_config['mongoDB']['user'] + ":" + db_config['mongoDB']['pass'] + "@" + \
              db_config['mongoDB']['host'] + "/" + db_config['mongoDB']['db'] + "?retryWrites=true&w=majority"
conn = MongoClient(db_conn_url)
db = conn.ShopsQueueIndicator
amenities_collections = {
    'food': db.food,
    'entertainment': db.entertainment,
}


def get_amenity_query(amenity_type: str, timeout: int = QUERY_TIMEOUT, area: str = CITY_AREA) -> str:
    not_formatted_query = '[timeout:{0}][out:json];{1}(node[\"amenity\"=\"{2}\"](area);way[\"amenity\"=\"{2}\"](' \
                          'area);rel[\"amenity\"=\"{2}\"](area););out center; '
    return not_formatted_query.format(str(timeout), area, amenity_type)


def request_amenity(amenity_type: str) -> List[Dict[str, any]]:
    response = requests.get(API_URL, params={'data': get_amenity_query(amenity_type)})
    amenities_lists = response.json()['elements']
    result_list = src.parser.process_amenity_data(amenities_lists)
    return result_list


def request_amenities_for_category(category_name: str) -> List[Dict[str, any]]:
    amenities_list = amenities[category_name]
    result_list = []
    for a in amenities_list:
        result_list += request_amenity(a)
    return result_list


def save_amenities_into_database(category: str, amenities_list: List[Dict[str, any]]) -> None:
    amenities_collections[category].insert_many(amenities_list)


if __name__ == "__main__":
    conn.drop_database(db_config['mongoDB']['db'])
    for category in amenities:
        result = request_amenities_for_category(category)
        save_amenities_into_database(category, result)
        print('Correct saved markers data for category: ', category)
