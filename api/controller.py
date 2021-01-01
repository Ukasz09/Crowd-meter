from pymongo import MongoClient
from typing import List, Dict
import configparser

_db_config = configparser.ConfigParser()
_db_config.read('dbconfig.ini')
_db_conn_url = "mongodb+srv://" + _db_config['mongoDB']['user'] + ":" + _db_config['mongoDB']['pass'] + "@" + \
               _db_config['mongoDB']['host'] + "/" + _db_config['mongoDB']['db'] + "?retryWrites=true&w=majority"
_conn = MongoClient(_db_conn_url)
_db = _conn.ShopsQueueIndicator
_amenities_collections = {
    'food': _db.food,
    'entertainment': _db.entertainment,
}


def get_markers() -> List[Dict[str, any]]:
    markers = []
    for _, collection in _amenities_collections.items():
        markers += collection.find({}, {'_id': False})
    return markers


def get_marker(marker_id: int) -> Dict[str, any]:
    for _, collection in _amenities_collections.items():
        result = collection.find({"id": marker_id}, {'_id': False})
        if result.count() != 0:
            return result[0]
    return {}


def get_categories():
    result = []
    result += _db.categories.find({}, {'_id': False})
    return result
