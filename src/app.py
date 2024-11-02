from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import time

app = Flask(__name__)
CORS(app)

def fisher_yates_shuffle(questions):
    random.seed(time.time())
    shuffled_questions = questions[:]
    n = len(shuffled_questions)
    for i in range(n - 1, 0, -1):
        j = random.randint(0, i)
        shuffled_questions[i], shuffled_questions[j] = shuffled_questions[j], shuffled_questions[i]
    return shuffled_questions

def random_select_and_shuffle_questions(questions_by_type):
    selected_and_shuffled_questions = []

    for question_type, details in questions_by_type.items():
        questions = details['questions']
        count = details['count']

        # Randomly select the required number of questions
        if count > len(questions):
            count = len(questions)

        selected_questions = random.sample(questions, count)
        shuffled_questions = fisher_yates_shuffle(selected_questions)
        selected_and_shuffled_questions.extend(shuffled_questions)

    return selected_and_shuffled_questions

@app.route('/shuffle-questions', methods=['POST'])
def shuffle_questions():
    questions_by_type = request.json.get('questions_by_type')
    selected_and_shuffled = random_select_and_shuffle_questions(questions_by_type)
    return jsonify(selected_and_shuffled)

if __name__ == '__main__':
    app.run(debug=True)
