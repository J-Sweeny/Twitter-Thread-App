import requests
import os
from datetime import datetime

bearer_token = os.environ.get("BEARER_TOKEN")
search_url = "https://api.twitter.com/2/tweets/counts/recent"


def bearer_oauth(r):
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2RecentTweetCountsPython"
    return r


def connect_to_endpoint(url, params):
    response = requests.request("GET", search_url, auth=bearer_oauth, params=params)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()


def count_tweets(q='from:joeysweeny'):
    json_response = connect_to_endpoint(search_url, {'query': q,'granularity': 'day'})
    # print(json.dumps(json_response, indent=4, sort_keys=True))
    return json_response


def main(user='joeysweeny'):
    if type(user) != str:
        user = 'joeysweeny'

    # Create a dashboard of how many times I've Tweeted recently
    days = count_tweets(f'(from:{user})')
    total_tweets = days['meta']['total_tweet_count']

    weekdays = dict(zip(range(7), 'Mon Tue Wed Thu Fri Sat Sun'.split()))
    
    twts = {}
    for day in days['data']:
        dt_day = datetime.strptime((day['start']), '%Y-%m-%dT%H:%M:%S.%fZ')  # Turn start date str into datetime object
        twts.update({weekdays[dt_day.weekday()] : day["tweet_count"]})  # Turn date into a weekday using weekdays dict, get tweet_count value, add both to dict twts
    return twts

if __name__ == "__main__":
    main()

