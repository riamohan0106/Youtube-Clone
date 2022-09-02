from model import Youtube_clone
from model import UserModel

# MongoDB driver
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
# the default port connection

database = client.Youtube_clone
video_collection = database.videos
userdb = client.UserModel
user_collection = userdb.credentials


#fetch the  user like/dislike status
async def fetch_userdata(user_id,title):
    document = await user_collection.find_one({"user_id":user_id,"title":title})
    return document


#fetch the video total likes/dislikes counter
async def fetch_videodata(url):
    document = await video_collection.find_one({"url":url})
    return document

#update the user like/dislike status
async def update_userstatus(user_id,title,user_like,user_dislike):
    await user_collection.update_one({"user_id":user_id,"title":title},{"$set":{"user_like":user_like,
    "user_dislike":user_dislike}})
    document = await user_collection.find_one({"user_id":user_id,"title":title})
    return document

#update the total likes/dislikes count
async def update_videocount(url,video_likes,video_dislikes):
    await video_collection.update_one({"url":url},{"$set":{"video_likes":video_likes,"video_dislikes":video_dislikes}})
    document = await video_collection.find_one({"url":url})
    return document
    
#create new records for a new user
async def create_userdata(data):
    result = await user_collection.insert_one(data)
    return result

# create new records for a new video status
async def create_videodata(data):
    result = await video_collection.insert_one(data)
    return result

