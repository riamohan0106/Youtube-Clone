from pydantic import BaseModel
#autocreate json schema

class Youtube_clone(BaseModel):
    url: str
    video_likes: int
    video_dislikes: int
    class Config:
        orm_mode = True

class UserModel(BaseModel):
    user_id: str
    user_like: str
    user_dislike: str
    title: str
    class config:
        orm_mode = True

