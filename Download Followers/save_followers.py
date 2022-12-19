import csv
import time
import followers_lookup

# Pulls Twitter followers and puts them in a csv file. But it can take a while...
# Rate limited to 15 calls per 15 minutes with a max results of 100 so we use a 15.5 min timer below
# 10 fields per dict entry plus 4 under public_metrics

_USERNAME = 'franchisewolf'
FOLLOWER_FILE = _USERNAME + '_followers.csv'
FIELDNAMES = ["profile","created_at","description","id","location","name","profile_image_url","followers_count","following_count","listed_count","tweet_count","url","username","verified",]

def clean_follower(follower):
    # Adds a Twitter profile url, handles emoji edge cases with encode/decode, and flattens public metrics
    follower['profile'] = "https://twitter.com/" + follower['username']
    follower['name'] = follower['name'].encode('unicode_escape').decode('utf-8')
    follower['description'] = follower['description'].encode('unicode_escape').decode('utf-8')
    for metric in follower['public_metrics']:
      follower[metric] = follower['public_metrics'][metric]
    follower.pop("public_metrics")
    return follower

def upload_file(follower_list):
  # Rewrites entire csv file
  with open(FOLLOWER_FILE, 'w', newline='', encoding="utf-8") as data_file:
    writer = csv.DictWriter(data_file, FIELDNAMES)
    writer.writeheader()
    for follower in follower_list:
      clean_follower(follower)
      writer.writerow(follower)

def append_list(new_follower_list):
  # Adds entry to csv file
  for follower in new_follower_list:
    clean_follower(follower)
    with open(FOLLOWER_FILE, 'a', newline='') as data_file:
        writer = csv.DictWriter(data_file, FIELDNAMES)
        writer.writerow(follower)

def main():
  # First we ping the endpoint 15 times and return a list of followers / then we wait 16 min and ping it again / repeat until follower list is finished
  list_and_token = followers_lookup.main(_USERNAME)
  follower_list = list_and_token[0]
  next_token = list_and_token[1]
  upload_file(follower_list)
  print(f"\nTimestamp: {time.strftime('%H:%M:%S %d %b %Y')}")
  if next_token == 'END': return 'Mission accomplished. Not many followers.'
  print('\nUploaded... Now waiting 16 min...')
  time.sleep(930)


  while True:
    new_list_and_token = followers_lookup.main(_USERNAME, next_token)
    new_follower_list = new_list_and_token[0] 
    next_token = new_list_and_token[1]
    append_list(new_follower_list)
    if next_token == 'END': break
    print(f"\nTimestamp: {time.strftime('%H:%M:%S %d %b %Y')}")
    print('\nUploaded... Now waiting 16 min...')
    time.sleep(930)

if __name__ == "__main__":
    main()


