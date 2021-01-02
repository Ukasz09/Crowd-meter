import src.markers as markers
import src.categories as categories
import src.dbconn as dbconn

if __name__ == "__main__":
    dbconn.conn.drop_database(dbconn.config['mongoDB']['db'])
    categories.save_categories_into_db()
    markers.save_markers_into_db()
