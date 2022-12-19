import csv, json, os, sqlite3, base64, hashlib, re
from flask import Flask, request, render_template, flash, abort, session, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
import requests
from requests.auth import AuthBase, HTTPBasicAuth
from requests_oauthlib import OAuth2Session
import tweet_freq_chart

# os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1' 
os.environ["BEARER_TOKEN"] = 'AAAAAAAAAAAAAAAAAAAAAP6whgEAAAAA0%2BduNNrJ%2Bs8SlfBOowzX2DXEn%2F8%3DMUqoEpqz5bWMlyGNwwXdhfBWCNrQ8gaMqMaJgMbZVYm4gb4JkG'
os.environ["CLIENT_ID"] = 'MzhYeHBoWWxHY19UaGhGR3gtRnE6MTpjaQ'
os.environ["CLIENT_SECRET"] = 'C-6acy4agBZ_2Nx3mhhBmhc4uGZ-unXXYwq7lbNwrm5Oy21Eix'
UPLOAD_FOLDER = "templates/newsletters/uploaded"
DOWNLOAD_FOLDER = 'templates/newsletters/downloaded/'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['DOWNLOAD_FOLDER'] = DOWNLOAD_FOLDER

# Set the secret key to some random bytes. Keep this really secret!
app.secret_key = b'fc46828fe52285ad5d16533f818700dc085b0748139cf195bba1ff7a179344e7'

# Twitter OAuth
client_id = os.environ.get("CLIENT_ID")
client_secret = os.environ.get("CLIENT_SECRET")
redirect_uri = "https://beta.creatorscloud.xyz/"

# Set scopes
scopes = ["bookmark.read", "bookmark.write", "tweet.write", "tweet.read", "users.read", "offline.access", "like.write", "like.read", "follows.write", "follows.read", "space.read", "list.read", "list.write"]

# Create a code verifier
code_verifier = base64.urlsafe_b64encode(os.urandom(30)).decode("utf-8")
code_verifier = re.sub("[^a-zA-Z0-9]+", "", code_verifier)

# Create a code challenge
code_challenge = hashlib.sha256(code_verifier.encode("utf-8")).digest()
code_challenge = base64.urlsafe_b64encode(code_challenge).decode("utf-8")
code_challenge = code_challenge.replace("=", "")

# Start an OAuth 2.0 session
oauth = OAuth2Session(client_id, redirect_uri=redirect_uri, scope=scopes)

# Create an authorize URL
auth_url = "https://twitter.com/i/oauth2/authorize"
authorization_url, state = oauth.authorization_url(
    auth_url, code_challenge=code_challenge, code_challenge_method="S256"
)

def twitter_auth_response(auth_response):
    authorization_response = auth_response

    # Fetch access token
    token_url = "https://api.twitter.com/2/oauth2/token"
    auth = HTTPBasicAuth(client_id, client_secret)
    token = oauth.fetch_token(
        token_url=token_url,
        authorization_response=authorization_response,
        auth=auth,
        client_id=client_id,
        include_client_id=True,
        code_verifier=code_verifier,
    )
    access = token["access_token"]

    # Make a request to the users/me endpoint to get your user ID
    user_me = requests.request(
        "GET",
        "https://api.twitter.com/2/users/me",
        headers={"Authorization": "Bearer {}".format(access)},
    ).json()
    # print(f"\nuser/me: {user_me}\n")
    user_id = user_me["data"]["id"]
    username = user_me["data"]['username']
    session["user_id"] = user_id
    session["username"] = username
    session["access"] = access

    fields = "created_at,description,location,name,pinned_tweet_id,public_metrics,verified,profile_image_url"
    params = {"user.fields": fields}
    user_data = requests.request(
        "GET",
        "https://api.twitter.com/2/users/me", params=params,
        headers={"Authorization": "Bearer {}".format(access)},
    ).json()

    return user_data

def request_bookmarks():
    # Make a request to the bookmarks url
    url = "https://api.twitter.com/2/users/{}/bookmarks".format(session["user_id"])
    headers = {
        "Authorization": "Bearer {}".format(session["access"]),
        "User-Agent": "BookmarksSampleCode",
    }
    response = requests.request("GET", url, headers=headers)
   
    if response.status_code != 200:
        raise Exception(
            "Request returned an error: {} {}".format(response.status_code, response.text)
        )
    json_response = response.json()
    # print("Response code: {}".format(response.status_code))
    # print(json.dumps(json_response, indent=4, sort_keys=True))
    return json_response

def recent_tweets(user):
  return json.dumps(tweet_freq_chart.main(user))

# @app.before_request
def load_user():
    # redirect using HTTP instead of HTTPS
    if "username" not in session and request.endpoint != 'login':
      return redirect(url_for('login'))

@app.route('/', methods=['GET','POST'])
def home():
  if "pro_pic" not in session:
    session['pro_pic'] = "../static/styles/images/avatar-icon.png"
  
  if 'name' not in session:
    session['name'] = "Joe Sweeny"
  
  if 'username' not in session:
    session["username"] = "joeysweeny"
    twts = recent_tweets('culturaltutor')
  else: twts = recent_tweets(session["username"][1:])

  if 'state' in (request.args):
    user_data = twitter_auth_response(request.url)
    small_pro_pic = user_data['data']['profile_image_url']
    pro_pic = (small_pro_pic.removesuffix('normal.jpg')) + '400x400.jpg'
    profile_descript = user_data['data']['description']
    profile_created = user_data['data']['created_at']
    followers = user_data['data']['public_metrics']['followers_count']
    following = user_data['data']['public_metrics']['following_count']
    listed = user_data['data']['public_metrics']['listed_count']
    tweet_count = user_data['data']['public_metrics']['tweet_count']
    profile_name = user_data['data']['name'] 
    # profile_location = user_data['data']['location'] 
    # profile_id = user_data['data']['id']  
    # profile_verified = user_data['data']['verified']
    session['pro_pic'] = pro_pic
    session["name"] = profile_name
    session['followers'] = followers
    session['following'] = following
    session['listed'] = listed
    session['tweet_count'] = tweet_count
    session['description'] = profile_descript
    
    return render_template('index.html', twts = twts, pro_pic=pro_pic, name=profile_name, username=session["username"])
  return render_template('index.html', twts = twts, pro_pic=session['pro_pic'], name=session["name"], username=session["username"] )

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
      return redirect(authorization_url)
    return render_template('login.html', pro_pic=session['pro_pic'])

@app.route('/bookmarks', methods=['GET', 'POST'])
def bookmarks():
  try: books = request_bookmarks()['data']
  except: abort(401)
  return render_template('bookmarks.html', bookmarks = books, pro_pic=session['pro_pic'])

@app.route('/newsletters')
def newsletters():
  return render_template('newsletters.html', pro_pic=session['pro_pic'])

@app.route('/newsletters/frosted')
def newsletters_frosted():
  return render_template('newsletters_frosted.html')

@app.route('/newsletters/loader')
def newsletters_loader():
  return render_template('ww-loader.html') 

@app.route('/metrics', methods=['GET', 'POST'])
def metrics():
  user = request.form.get('user-tweet-count')
  twts = json.dumps(tweet_freq_chart.main(user))
  if 'followers' in session:
    return render_template('metrics.html', twts=twts, pro_pic=session['pro_pic'], name = session["name"], followers = session['followers'], following = session['following'], listed = session['listed'], tweet_count = session['tweet_count'], descript = session['description'], username = session['username'])
  else: abort(401)

@app.route('/commandline')
def twitter_terminal():
  return render_template('twitter_terminal.html')

@app.route('/upload', methods=('GET', 'POST'))
def upload_news():
  if request.method == 'POST':
    newsletter = request.form['newsletter']
    title = request.form['title']
    date = request.form['date']
    subject_line = request.form['subject_line']
    content = request.files['content']
  
    if not newsletter:
      flash('Newsletter is required!')
    elif not title:
      flash('Title is required!')
    elif not date:
      flash('Date is required!')
    elif not subject_line:
      flash('Subject line is required!')
    elif not content:
      flash('Content is required!')
    else:
      content.save(os.path.join(app.config['UPLOAD_FOLDER'],secure_filename(content.filename)))
      return redirect(url_for('home'))
  return render_template('upload.html')

@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    session.pop('name', None)
    session.pop('pro_pic', None)
    session.pop('profile_metrics', None)
    session.pop('description', None)
    return redirect(url_for('home'))

@app.errorhandler(401)
def unauthorized(e):
    return render_template('error_401.html', pro_pic=session['pro_pic']), 401

@app.errorhandler(404)
def page_not_found(error):
    return render_template('error.html', pro_pic=session['pro_pic']), 404

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)
    # ssl_context='adhoc'