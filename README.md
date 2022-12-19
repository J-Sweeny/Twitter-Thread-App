# Twitter-Thread-App
Internal tool for creators' at Workweek to draft Twitter threads

What's in this repository: 
* Accesses the Twitter API to send new Tweets and request bookmarks, recent tweets, and user metrics. 
* Basic UX for writing new Twitter threads
* Scrapes HTML from email newsletters, resizes it, and displays it on a newsletter landing page based on Medium’s UX
* Dark mode toggles colors across all UI components
* Flask app for routes and error catching.  Used jinja templates to simplify HTML
* Login with Twitter. Allows users to login and saves their username, metrics, and profile picture to use across the site. Saves user authentication of Twitter for future API requests. 

**TODO:**
- Reimplement Postgres database to save Tweet drafts
- Add tweet scheduling features 
- Replace Tweet canvas with ProseMirror editor (currently contenteditable and insecure)
- Fill out Newsletter homepage with sidebar and related content. 
- Build out DMs feature
- Solve for content flash when navigating the site in dark mode 
- Tweet Mechanics: Delete Tweets, upload photos or gifs, fix line breaks, character count
- Rebuild with React, a CSS utility framework like Tailwind, and a responsive, coherent design system

# Download Twitter Followers
**Problem:** There’s no way for larger accounts to know who their followers are. Twitter won't let you sort them or download them. This script downloads all publicly available information on all of an accounts followers and writes it to a searchable CSV.

Twitter doesn't want people cloning it’s social graph so it rate limits the follower API endpoint to 1500 results every 15 minutes. 

This app pulls 1500 followers, writes them into a CSV, waits 15 minutes, then passes the last pagination token and picks up where it left off, pulling followers and writing them until you have a full list of followers. 

For accounts with tens of thousands of followers it takes a *long* time but if you're going to use the Twitter API it's the only option.

*Tip:* After I downloaded each follower list I passed the names and Twitter handles to the People Data API to get email addresses, LinkedIn and social urls, work history, and other searchable information on followers. The first 1000 hits are free and after that it’s about 2 cents per hit. For media brands enrichment can be very valuble. 
