import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import UIReducer from './UISlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    currentUI: UIReducer,
  },
});
