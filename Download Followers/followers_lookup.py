import requests
import os
import json
import user_lookup

bearer_token = os.environ.get("BEARER_TOKEN")

def create_url(username):
    # Creates url endpoint to lookup followers
    user_lookup_response = user_lookup.main(username)  # Get user id from a username
    user_id = user_lookup_response['data'][0]['id']
    return "https://api.twitter.com/2/users/{}/followers".format(user_id)


def get_params():
    return {"user.fields": 'name,username,created_at,description,public_metrics,url,location,profile_image_url,verified',
            'max_results': 100,
            'pagination_token': {}}


def bearer_oauth(r):
    # Method required by bearer token authentication.
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2FollowersLookupPython"
    return r


def connect_to_endpoint(url, params, next_token=None):
    # Connects to url endpoint and gets followers
    params['pagination_token'] = next_token  # If we pass a next_token, sets pagination token otherwise None (see parameters)
    response = requests.request("GET", url, auth=bearer_oauth, params=params)
    print(response.status_code)
    if response.status_code != 200:
        print("Request returned an error: {} {}".format(
                response.status_code, response.text
            ))
        return False
    return response.json()


def main(username='franchisewolf', next_token=None):
    # Connects to endpoint and gets list of followers / 
    url = create_url(username)
    params = get_params()
    json_response = connect_to_endpoint(url, params, next_token)  # Gets first page of followers list
    #print(json.dumps(json_response, indent=4, sort_keys=True))
    follower_list = json_response['data'] # Creates list of followers and adds first page

    while True:  # loops though pagination pages
        try:
            next_token = json_response['meta']['next_token']
            json_response = connect_to_endpoint(url, params, next_token)
            if json_response == False: break  # Break if I hit an error / To return the list and finish save_followers / we needed to kill the exception handling
            follower_list.extend(json_response['data']) # Adds current pagination page to list of followers
            #print(json.dumps(json_response, indent=4, sort_keys=True))
            #print(f'\nFollower List: {len(follower_list)}\n')
        except KeyError:
            print('\n\n You\'re done!!')
            next_token = 'END'
            break
    
    return follower_list, next_token

if __name__ == "__main__":
    main()
