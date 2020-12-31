from flask import jsonify
from app import app
import controller


@app.route('/markers', methods=['GET'])
def markers():
    return jsonify(controller.get_markers())


@app.route('/marker/<int:marker_id>', methods=['GET'])
def marker(marker_id: int):
    result = controller.get_marker(marker_id)
    if result:
        return jsonify(result)
    else:
        return {"message": "Not found marker with given ID"}, 404
