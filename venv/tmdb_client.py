import requests
import os
from dotenv import load_dotenv


load_dotenv()

API_KEY = os.getenv('TMDB_API_KEY')
BASE_URL = 'https://api.themoviedb.org/3'

def get_movies(genre_id=None, sort_by='popularity.desc'):
    url = f"{BASE_URL}/discover/movie"
    params = {
        'api_key': API_KEY,
        'sort_by': sort_by,
        'with_genres': genre_id
    }
    response = requests.get(url, params=params)
    return response.json()

def get_movie_details(movie_id):
    url = f"{BASE_URL}/movie/{movie_id}"
    params = {
        'api_key': API_KEY
    }
    response = requests.get(url, params=params)
    return response.json()
