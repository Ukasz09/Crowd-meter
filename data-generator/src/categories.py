import src.dbconn as dbconn

categories = [{
    "_id": "food",
    "name": "food",
    "amenities": [
        {
            "id": "bar",
            "name": "bar"
        },
        {
            "id": "biergarten",
            "name": "biergarten"
        },
        {
            "id": "fast_food",
            "name": "fast food"
        },
        {
            "id": "cafe",
            "name": "cafe"
        },
        {
            "id": "food_court",
            "name": "food court"
        },
        {
            "id": "ice_cream",
            "name": "ice cream"
        },
        {
            "id": "pub",
            "name": "pub"
        },
        {
            "id": "restaurant",
            "name": "restaurant"
        }
    ]
},
    {
        "_id": "entertainment",
        "name": "entertainment",
        "amenities": [
            {
                "id": "casino",
                "name": "casino"
            },
            {
                "id": "cinema",
                "name": "cinema"
            },
            {
                "id": "nightclub",
                "name": "night club"
            },
            {
                "id": "theatre",
                "name": "theatre"
            }
        ]
    }]


def save_categories_into_db():
    dbconn.db.categories.insert_many(categories)
    print('Correct saved categories into database')
