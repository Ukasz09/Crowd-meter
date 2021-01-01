from flask import jsonify, abort
from flask_cors import cross_origin

from app import app
import controller


@app.route('/markers', methods=['GET'])
@cross_origin()
def markers():
    return jsonify(controller.get_markers())


@app.route('/marker/<int:marker_id>', methods=['GET'])
@cross_origin()
def marker(marker_id: int):
    result = controller.get_marker(marker_id)
    if result:
        return jsonify(result)
    else:
        return {"message": "Not found marker with given ID"}, 404


@app.route('/categories', methods=['GET'])
@cross_origin()
def categories():
    return jsonify(controller.get_categories())
