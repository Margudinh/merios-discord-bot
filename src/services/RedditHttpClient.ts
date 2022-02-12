import axios, { Axios, AxiosInstance } from "axios";
import config  from "../config";
import { addSeconds, isAfter } from "date-fns"
import { ParsedOptions } from "getopts";

export default class RedditHttpClient {
  authHttp: AxiosInstance
  api: AxiosInstance
  token: string
  tokenExpiresAt: Date


  constructor(){
    this.authHttp = axios.create({
      baseURL: "https://www.reddit.com"
    });
    this.api = axios.create({
      baseURL: "https://oauth.reddit.com",
    })
    this.token = ""
    this.tokenExpiresAt = new Date();
  }

  async getToken(){
    if(!this.token || !isAfter(new Date(), this.tokenExpiresAt)){
      return;
    }

    const base64 = Buffer.from(`${config.redditClientId}:${config.redditClientSecret}`).toString("base64");

    const response = await this.authHttp.post<RedditAuthResponse>("/api/v1/access_token", {}, {
      params: {
        grant_type: "client_credentials"
      },
      headers: {
        'Authorization': `Basic ${base64}`
      }
    });

    this.token = response.data.access_token
    this.tokenExpiresAt = addSeconds(new Date(), response.data.expires_in);
  }

  async getRandomPostFromSubreddit(subreddit: string) : Promise<KindData<SubredditContentResponse>[]> {
    
    const allowedSubreddits = ["prequelmemes"];

    if(!allowedSubreddits.includes(subreddit.toLowerCase())){
      throw Error("Not allowed subreddit");
    }
    
    
    await this.getToken();

    const response = await this.api.get<KindData<SubredditContentResponse>[]>(`/r/${subreddit}/random.json`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accepts: `application/json`,
        'User-Agent': 'MyBot/0.0.1'
      }
    });
    const batches = response.data;

    return batches
  }
}

type RedditAuthResponse = {
  access_token: string,
  token_type: string,
  expires_in: number,
  scope: string
}

type KindData<T> = {
  kind: string,
  data: T
}

type SubredditContentResponse = {
  after: string,
  dist: number,
  modhash: string,
  children: KindData<SubredditPost>[]
}

type SubredditPost = {
  id: string,
  url_overridden_by_dest: string | null,
  title: string
  pinned: boolean
}