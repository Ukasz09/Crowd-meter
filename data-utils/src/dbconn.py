from pymongo import MongoClient
import configparser

db_config = configparser.ConfigParser()
db_config.read('dbconfig.ini')
db_conn_url = "mongodb+srv://" + db_config['mongoDB']['user'] + ":" + db_config['mongoDB']['pass'] + "@" + \
              db_config['mongoDB']['host'] + "/" + db_config['mongoDB']['db'] + "?retryWrites=true&w=majority"
conn = MongoClient(db_conn_url)
db = conn.ShopsQueueIndicator
categories_collections = {
    'food': db.food,
    'entertainment': db.entertainment,
}
