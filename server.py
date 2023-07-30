from flask import Flask, jsonify
from flask_cors import CORS
from parse import PythonCodeGenerator

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:8000"}})

@app.route('/api/python', methods=['GET'])
def get_python():
    pgen = PythonCodeGenerator()
    correct = False
    while not correct:
        s = pgen.get_random_randomized_python_string()
        correct = pgen.test_correctness(s)
    return jsonify(s)

if __name__ == '__main__':
    app.run()
