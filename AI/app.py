from flask import Flask, jsonify, request
app = Flask(__name__)


@app.get('/')
def index():
	return jsonify(message="Hello from MoodSphere AI (Flask)"), 200


@app.get('/health')
def health():
	return 'OK', 200


@app.post('/echo')
def echo():
	data = request.get_json(silent=True)
	return jsonify(received=data or {}), 200


if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000, debug=True)

