from typing import List, Dict
import dbconn


def get_markers() -> List[Dict[str, any]]:
    markers = []
    for _, collection in dbconn.categories_collections.items():
        markers += collection.find({}, {'_id': False})
    return markers


def get_marker(marker_id: int) -> Dict[str, any]:
    for _, collection in dbconn.categories_collections.items():
        result = collection.find({"id": marker_id}, {'_id': False})
        if result.count() != 0:
            return result[0]
    return {}


def get_categories():
    result = []
    result += dbconn.db.categories.find({}, {'_id': False})
    return result
