import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import { thunk } from 'redux-thunk'
import { authReducer } from './Auth/auth.ruducer'
import { postReducer } from './Post/post.reducer'
import { messageReducer } from './Message/message.reducer'
import { profileReducer } from './Profile/profile.reducer'
import {notificationReducer} from "./notification/noti.reducer";


const rootReducers = combineReducers({
    auth:authReducer,
    post:postReducer,
    message:messageReducer,
    profile:profileReducer,
    notify: notificationReducer
})

export const store=legacy_createStore(rootReducers, applyMiddleware(thunk))