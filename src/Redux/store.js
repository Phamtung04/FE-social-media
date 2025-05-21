import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import { thunk } from 'redux-thunk'
import { authReducer } from './Auth/auth.ruducer'
import { postReducer } from './Post/post.reducer'
import { messageReducer } from './Message/message.reducer'
import { profileReducer } from './Profile/profile.reducer'
import {notificationReducer} from "./notification/noti.reducer";
import {reelsReducer} from "./reels/reels.reducer";
import {userReducer} from "./user/user.reducer";


const rootReducers = combineReducers({
    auth:authReducer,
    post:postReducer,
    message:messageReducer,
    profile:profileReducer,
    notify: notificationReducer,
    reels: reelsReducer,
    user: userReducer
})

export const store=legacy_createStore(rootReducers, applyMiddleware(thunk))