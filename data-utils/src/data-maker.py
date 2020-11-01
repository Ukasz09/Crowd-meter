import requests
import json

API_URL = "http://overpass-api.de/api/interpreter"
QUERY_TIMEOUT = 900

WROCLAW_OSM_ID = 2805690
AREA_OSM_ID = 3600000000 + WROCLAW_OSM_ID

CITY_AREA = "area(" + str(AREA_OSM_ID) + ")" + "[admin_level=8];"
COUNTRY_AREA = 'area["ISO3166-1"="PL"]' + '[admin_level=2];'

amenities = {
    'food': ['bar', 'biergarten', 'fast_food', 'cafe', '	food_court', 'ice_cream', 'pub', 'restaurant'],
    'education': ['college', 'kindergarten', 'library', 'school', 'university'],
    'healthcare': ['dentist', 'hospital', 'pharmacy', 'veterinary'],
    'entertainment': ['casino', 'cinema', 'nightclub', 'theatre']
}


def get_amenity_query(amenity_type: str, timeout: int = QUERY_TIMEOUT, area: str = CITY_AREA) -> str:
    return '[timeout:{0}][out:json];{1}(node[\"amenity\"=\"{2}\"](area);way[\"amenity\"=\"{2}\"](area);rel[\"amenity\"=\"{2}\"](area););out center;' \
        .format(str(timeout), area, amenity_type)


def request_amenity(amenity_type: str):
    response = requests.get(API_URL, params={'data': get_amenity_query(amenity_type)})
    data = response.json()
    print(json.dumps(data, indent=4, sort_keys=True))


if __name__ == "__main__":
    request_amenity('cafe')
