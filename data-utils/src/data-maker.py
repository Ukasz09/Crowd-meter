import requests
import json
import random
import humanized_opening_hours as hoh
import datetime
from typing import Any, List, Dict

API_URL = "http://overpass-api.de/api/interpreter"
QUERY_TIMEOUT = 900

WROCLAW_OSM_ID = 2805690
AREA_OSM_ID = 3600000000 + WROCLAW_OSM_ID

CITY_AREA = "area(" + str(AREA_OSM_ID) + ")" + "[admin_level=8];"
COUNTRY_AREA = 'area["ISO3166-1"="PL"]' + '[admin_level=2];'

amenities = {
    'food': ['bar', 'biergarten', 'fast_food', 'cafe', 'food_court', 'ice_cream', 'pub', 'restaurant'],
    'education': ['college', 'kindergarten', 'library', 'school', 'university'],
    'healthcare': ['dentist', 'hospital', 'pharmacy', 'veterinary'],
    'entertainment': ['casino', 'cinema', 'nightclub', 'theatre']
}

# normal
id = "id"
latitude = "lat"
longitude = "lon"

# tags
name = "name"
city = "addr:city"
houseNumber = "addr:housenumber"
street = "addr:street"
website = "website"
numberOfFreeSpace = "spaces"
openingHours = "opening_hours"

working_days = ["monday", "tuesday", "wednesday", "thursday", "friday"]
weekend_days = ["saturday", "sunday"]

week_days_datetime = {
    "monday": datetime.date(2020, 12, 21),
    "tuesday": datetime.date(2020, 12, 22),
    "wednesday": datetime.date(2020, 12, 23),
    "thursday": datetime.date(2020, 12, 24),
    "friday": datetime.date(2020, 12, 25),
    "saturday": datetime.date(2020, 12, 26),
    "sunday": datetime.date(2020, 12, 27),
}


def get_amenity_query(amenity_type: str, timeout: int = QUERY_TIMEOUT, area: str = CITY_AREA) -> str:
    return '[timeout:{0}][out:json];{1}(node[\"amenity\"=\"{2}\"](area);way[\"amenity\"=\"{2}\"](area);rel[\"amenity\"=\"{2}\"](area););out center;' \
        .format(str(timeout), area, amenity_type)


def request_amenity(amenity_type: str):
    response = requests.get(API_URL, params={'data': get_amenity_query(amenity_type)})
    amenities_lists = response.json()['elements']
    result_list = process_amenity_data('cafe', amenities_lists)
    print(json.dumps(result_list, indent=4, sort_keys=True))


def process_amenity_data(amenity_type: str, amenities_list: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    result_list = []
    for amenity_resp in amenities_list:
        amenity = {}
        tag_data = amenity_resp["tags"]
        if not data_too_much_incomplete(tag_data):
            amenity["id"] = amenity_resp[id]
            amenity["latitude"] = amenity_resp[latitude]
            amenity["longitude"] = amenity_resp[longitude]
            amenity["amenity"] = amenity_type
            amenity["name"] = tag_data.get(name)
            amenity["city"] = tag_data.get(city, "Wrocław")
            amenity["houseNumber"] = tag_data.get(houseNumber, get_mocked_house_number())
            amenity["street"] = tag_data.get(street)
            amenity["website"] = tag_data.get(website, "http://unknown-site.com")
            amenity["numberOfFreeSpace"] = tag_data.get(numberOfFreeSpace, get_mocked_free_spaces())
            open_hours_resp = tag_data.get(openingHours)
            if open_hours_resp is None:
                amenity["openingHours"] = get_mocked_opening_hours()
            else:
                amenity["openingHours"] = parse_opening_hours_resp(open_hours_resp)
            amenity["numberOfPeoples"] = 0
            result_list.append(amenity)
    return result_list


def data_too_much_incomplete(tag_data: Dict[str, Any]) -> bool:
    return tag_data.get(name) is None or tag_data.get(street) is None


def get_mocked_house_number() -> int:
    return random.randint(1, 100)


def get_mocked_free_spaces() -> int:
    return random.randint(5, 30)


def get_mocked_opening_hours() -> Dict[str, str]:
    open_hours_model = {}
    for day in working_days:
        open_hours_model[day] = "8:00-16:00"
    open_hours_model[weekend_days[0]] = "12:00-18:00"
    open_hours_model[weekend_days[1]] = "closed"
    return open_hours_model


def parse_opening_hours_resp(open_hours_text: str) -> Dict[str, str]:
    open_hours_model = {}
    try:
        oh = hoh.OHParser(open_hours_text)
        for day in working_days + weekend_days:
            open_time_for_day = oh.render().periods_of_day(week_days_datetime[day]).description
            open_hours_model[day] = open_time_for_day
        return open_hours_model
    except AttributeError:
        return get_mocked_opening_hours()


if __name__ == "__main__":
    request_amenity('cafe')
