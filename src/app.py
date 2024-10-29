from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def fisher_yates_shuffle(questions):
    shuffled_questions = questions[:]
    n = len(shuffled_questions)
    for i in range(n - 1, 0, -1):
        j = random.randint(0, i)
        shuffled_questions[i], shuffled_questions[j] = shuffled_questions[j], shuffled_questions[i]
    return shuffled_questions

@app.route('/shuffle-questions', methods=['POST'])
def shuffle_questions():
    questions = request.json.get('questions')
    shuffled = fisher_yates_shuffle(questions)
    return jsonify(shuffled)

@app.route('/shuffle-quiz-questions', methods=['POST'])
def shuffle_quiz_questions():
    questions = request.json.get('questions')
    if not questions:
        return jsonify({"error": "No questions provided"}), 400
    shuffled = fisher_yates_shuffle(questions)
    return jsonify(shuffled)

if __name__ == '__main__':
    app.run(debug=True)
