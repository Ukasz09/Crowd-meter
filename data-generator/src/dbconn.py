from pymongo import MongoClient
import configparser
import os

_conn_str = "mongodb+srv://{user}:{password}@{host}/{db}?retryWrites=true&w=majority"
config = configparser.ConfigParser()
config.read(os.path.join(os.path.dirname(__file__), '../../dbconfig.ini'))
conn = MongoClient(_conn_str.format(user=config['mongoDB']['user'], password=config['mongoDB']['pass'],
                                    host=config['mongoDB']['host'], db=config['mongoDB']['db']))
db = conn.ShopsQueueIndicator
categories_collections = {
    'food': db.food,
    'entertainment': db.entertainment,
}
