from flask import Flask, request, jsonify, render_template
from tmdb_client import get_movies, get_movie_details

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/movies', methods=['GET'])
def movies():
    genre_id = request.args.get('genre_id')
    sort_by = request.args.get('sort_by', 'popularity.desc')
    movies_data = get_movies(genre_id=genre_id, sort_by=sort_by)
    return jsonify(movies_data)


@app.route('/movie/<int:movie_id>', methods=['GET'])
def movie(movie_id):
    movie_data = get_movie_details(movie_id)
    return jsonify(movie_data)

if __name__ == '__main__':
    app.run(debug=True)
