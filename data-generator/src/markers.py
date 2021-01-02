import requests
from typing import List, Dict
import src.dbconn as dbconn
import src.categories as categories
import src.parser

API_URL = "http://overpass-api.de/api/interpreter"
QUERY_TIMEOUT = 900
WROCLAW_OSM_ID = 2805690
AREA_OSM_ID = 3600000000 + WROCLAW_OSM_ID
CITY_AREA = "area({area})[admin_level=8];".format(area=str(AREA_OSM_ID))
COUNTRY_AREA = 'area["ISO3166-1"="PL"][admin_level=2];'


def _get_amenity_query(amenity_type: str, timeout: int = QUERY_TIMEOUT, area: str = CITY_AREA) -> str:
    not_formatted_query = '[timeout:{0}][out:json];{1}(node[\"amenity\"=\"{2}\"](area);way[\"amenity\"=\"{2}\"](' \
                          'area);rel[\"amenity\"=\"{2}\"](area););out center; '
    return not_formatted_query.format(str(timeout), area, amenity_type)


def _request_amenity(amenity_type: str) -> List[Dict[str, any]]:
    response = requests.get(API_URL, params={'data': _get_amenity_query(amenity_type)})
    amenities_lists = response.json()['elements']
    result_list = src.parser.process_amenity_data(amenities_lists)
    return result_list


def _request_amenities_for_category(amenities: List[str]) -> List[Dict[str, any]]:
    result_list = []
    for a in amenities:
        result_list += _request_amenity(a)
    return result_list


def _save_amenities_into_database(category: str, amenities_list: List[Dict[str, any]]) -> None:
    dbconn.categories_collections[category].insert_many(amenities_list)


def save_markers_into_db():
    for category_dict in categories.categories:
        category = category_dict['_id']
        amenities = list(map(lambda amenity: amenity['id'], category_dict['amenities']))
        result = _request_amenities_for_category(amenities)
        _save_amenities_into_database(category, result)
        print('MARKERS for {cat} - Correct saved into a database'.format(cat=category.upper()))
