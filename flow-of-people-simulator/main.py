import threading
import dbconn
import random

DELAY_TIME_SEC = 2.0
MIN_INC_VALUE = -2
MAX_INC_VALUE = 2


# Bloated operation
def update_crowd_level_one_by_one():
    for key, collection in dbconn.categories_collections.items():
        for elem in collection.find({}):
            new_number_of_peoples = elem['numberOfPeoples'] + random.randint(MIN_INC_VALUE, MAX_INC_VALUE)
            number_of_free_space = elem['numberOfFreeSpace']
            if new_number_of_peoples > number_of_free_space or new_number_of_peoples < 0:
                new_number_of_peoples = random.randint(0, number_of_free_space)
            collection.update_one({'_id': elem['_id']}, {'$set': {'numberOfPeoples': new_number_of_peoples}})
    print('updated')


# def update_crowd_level():
#     for key, collection in dbconn.categories_collections.items():
#         inc_value = random.randint(MIN_INC_VALUE, MAX_INC_VALUE)
#         collection.update_many({}, {'$inc': {'numberOfPeoples': inc_value}})
#         fix_result = collection.update_many({'numberOfPeoples': {'$lt': 0}},
#                                             {'$set': {'numberOfPeoples': random.randint(0, MAX_INC_VALUE)}})
#         print('updated:', key.upper(), ', inc value:', inc_value, ', fixed (< zero):',
#               fix_result.modified_count)


def update_crowd_level_on_timer():
    threading.Timer(DELAY_TIME_SEC, update_crowd_level_on_timer).start()
    update_crowd_level_one_by_one()


if __name__ == "__main__":
    update_crowd_level_on_timer()
