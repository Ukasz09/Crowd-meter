from typing import List, Dict
import dbconn


def get_markers() -> List[Dict[str, any]]:
    markers = []
    for _, collection in dbconn.categories_collections.items():
        markers += collection.find({})
    return markers


def get_marker(marker_id: int) -> Dict[str, any]:
    for _, collection in dbconn.categories_collections.items():
        result = collection.find({"_id": marker_id})
        if result.count() != 0:
            marker = result[0]
            return marker
    return {}


def get_categories():
    result = []
    result += dbconn.db.categories.find({})
    return result
