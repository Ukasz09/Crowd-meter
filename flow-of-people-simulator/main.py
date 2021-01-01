import threading

import bson

import dbconn
import random

DELAY_TIME = 3.0
MIN_INC_VALUE = -5
MAX_INC_VALUE = 5


# Bloated operation
def update_crowd_level_one_by_one():
    for key, collection in dbconn.categories_collections.items():
        for elem in collection.find({}):
            new_number_of_peoples = elem['numberOfPeoples'] + random.randint(MIN_INC_VALUE, MAX_INC_VALUE)
            # number_of_free_space = elem['numberOfFreeSpace']
            # if new_number_of_peoples > number_of_free_space:
            #     new_number_of_peoples = number_of_free_space
            # elif new_number_of_peoples < 0:
            #     new_number_of_peoples = 0
            collection.update_one({'_id': elem['_id']}, {'$set': {'numberOfPeoples': new_number_of_peoples}})
        print('updated:', key)


def update_crowd_level():
    for key, collection in dbconn.categories_collections.items():
        inc_value = random.randint(MIN_INC_VALUE, MAX_INC_VALUE)
        collection.update_many({}, {'$inc': {'numberOfPeoples': inc_value}})
        fix_result = collection.update_many({'numberOfPeoples': {'$lt': 0}},
                                            {'$set': {'numberOfPeoples': random.randint(0, MAX_INC_VALUE)}})
        print('updated:', key, 'inc_value=', inc_value, 'fixed less than 0 qty=', fix_result.modified_count)


def update_crowd_level_on_timer():
    threading.Timer(DELAY_TIME, update_crowd_level_on_timer).start()
    update_crowd_level()


if __name__ == "__main__":
    update_crowd_level_one_by_one()
