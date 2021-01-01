import random
import humanized_opening_hours as hoh
import datetime
from typing import Any, List, Dict

# model_field = response_field
id = "id"
latitude = "lat"
longitude = "lon"
name = "name"
amenity_resp_name = "amenity"
city = "addr:city"
houseNumber = "addr:housenumber"
street = "addr:street"
website = "website"
numberOfFreeSpace = "spaces"
openingHours = "opening_hours"

working_days = ["monday", "tuesday", "wednesday", "thursday", "friday"]
weekend_days = ["saturday", "sunday"]

# Because hoh's periods_of_day method require datetime.date as parameter
week_days_datetime = {
    working_days[0]: datetime.date(2020, 12, 21),
    working_days[1]: datetime.date(2020, 12, 22),
    working_days[2]: datetime.date(2020, 12, 23),
    working_days[3]: datetime.date(2020, 12, 24),
    working_days[4]: datetime.date(2020, 12, 25),
    weekend_days[0]: datetime.date(2020, 12, 26),
    weekend_days[1]: datetime.date(2020, 12, 27),
}

default_city = "Wrocław"
default_website = "http://unknown-site.com"


def process_amenity_data(amenities_list: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    result_list = []
    for amenity_resp in amenities_list:
        if not __data_too_much_incomplete(amenity_resp):
            amenity = __parse_amenity_data(amenity_resp)
            result_list.append(amenity)
    return result_list


def __parse_amenity_data(amenity_resp: Dict[str, Any]) -> Dict[str, Any]:
    amenity = {}
    tag_data = amenity_resp["tags"]
    amenity["id"] = amenity_resp[id]
    amenity["latitude"] = amenity_resp[latitude]
    amenity["longitude"] = amenity_resp[longitude]
    amenity["amenity"] = tag_data[amenity_resp_name]
    amenity["name"] = tag_data.get(name)
    amenity["city"] = tag_data.get(city, default_city)
    amenity["houseNumber"] = tag_data.get(houseNumber, __get_mocked_house_number())
    amenity["street"] = tag_data.get(street)
    amenity["website"] = tag_data.get(website, default_website)
    amenity["numberOfFreeSpace"] = tag_data.get(numberOfFreeSpace, __get_mocked_free_spaces())
    open_hours_resp = tag_data.get(openingHours)
    if open_hours_resp is None:
        amenity["openingHours"] = __get_mocked_opening_hours()
    else:
        amenity["openingHours"] = __parse_opening_hours_resp(open_hours_resp)
    amenity["numberOfPeoples"] = 0
    return amenity


def __data_too_much_incomplete(amenity_resp: Dict[str, Any]) -> bool:
    tag_data = amenity_resp["tags"]
    return tag_data.get(name) is None or tag_data.get(street) is None


def __get_mocked_house_number() -> int:
    return random.randint(1, 100)


def __get_mocked_free_spaces() -> int:
    return random.randint(5, 30)


def __get_mocked_opening_hours() -> Dict[str, str]:
    open_hours_model = {}
    for day in working_days:
        open_hours_model[day] = "8:00-16:00"
    open_hours_model[weekend_days[0]] = "12:00-18:00"
    open_hours_model[weekend_days[1]] = "closed"
    return open_hours_model


def __parse_opening_hours_resp(open_hours_text: str) -> Dict[str, str]:
    open_hours_model = {}
    try:
        oh = hoh.OHParser(open_hours_text)
        for day in working_days + weekend_days:
            open_time_for_day = oh.render().periods_of_day(week_days_datetime[day]).description
            open_hours_model[day] = open_time_for_day
        return open_hours_model
    except AttributeError:
        return __get_mocked_opening_hours()
