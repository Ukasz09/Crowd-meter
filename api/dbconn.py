from pymongo import MongoClient
import configparser
import os

_config = configparser.ConfigParser()
_config.read(os.path.join(os.path.dirname(__file__), 'dbconfig.ini'))

_user_conf = _config['mongoDB']['user']
_password_conf = _config['mongoDB']['pass']
_host_conf = _config['mongoDB']['host']
_db_conf = _config['mongoDB']['db']

_conn = MongoClient(
    "mongodb+srv://" + _user_conf + ":" + _password_conf + "@" + _host_conf + "/" + _db_conf + "?retryWrites=true&w=majority")
db = _conn.ShopsQueueIndicator
categories_collections = {
    'food': db.food,
    'entertainment': db.entertainment,
}
