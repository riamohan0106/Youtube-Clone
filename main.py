from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Youtube_clone
from model import UserModel
from fastapi.responses import JSONResponse
#for interaction of different ports 

#App object
app = FastAPI()

from database import (
    fetch_userdata,
    fetch_videodata,
    update_userstatus,
    update_videocount,
    create_userdata,
    create_videodata
)
#Connect localhost to fastapi (8000)
origins = ['https://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers=["*"],
)
# just for testing!
@app.get("/")
def read_root():
    return {"Ping":"Pong"}

#fetch the user likes/dislikes
@app.get("/api/UserModel/{user_id}/{title}", response_model=UserModel)
async def get_userdata(user_id,title):
    try:
        response = await fetch_userdata(user_id,title)
        if response:
            print("getting response",response)
            return response
        else:
            print("returning default")
            data = {'user_id':user_id,'title':title,'user_like':'false','user_dislike':'false'}
            print(type(data))
            return data

    except:
        raise HTTPException(404,"Looks like something went wrong! The team will be fixing the issue shortly. Thank you for your patience.")

#fetch the video total likes/dislikes
@app.get("/api/Youtube_clone/{url}", response_model=Youtube_clone)
async def get_videodata(url):
    try:
        response = await fetch_videodata(url)
        if response:
            return response
        else:
            return{"url":url,"video_likes":0,"video_dislikes":0}
    except:
        raise HTTPException(404,"Looks like something went wrong! The team will be fixing the issue shortly. Thank you for your patience.")


#update the user like/dislike status
@app.put("/api/likes/UserModel/{user_id}/{title}/{user_like}/{user_dislike}",response_model=UserModel)
async def put_userstatus(user_id:str,title:str,user_like:str,user_dislike:str):
    try:
        response = await update_userstatus(user_id,title,user_like,user_dislike)
        if response:
            return response
        else:
            response = await create_userdata({"user_id":user_id,"title":title,"user_like":user_like,"user_dislike":user_dislike})
            return response
    except:
        raise HTTPException(400,"Something went wrong! We couldn't find what you're looking for ")

#update the video like/dislike count
@app.put("/api/likes/Youtube_clone/{url}/{video_likes}/{video_dislikes}",response_model=Youtube_clone)
async def put_videocount(url:str,video_likes:int,video_dislikes:int):
    try:
        response = await update_videocount(url,video_likes,video_dislikes)
        if response:
            return response
        else:
            response = await create_videodata({"url":url,"video_likes":video_likes,"video_dislikes":video_dislikes})
            return response
    except:
        raise HTTPException(400,"Something went wrong! We couldn't find what you're looking for ")



