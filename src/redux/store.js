import { legacy_createStore as createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import { tasksReducer } from './tasksReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, tasksReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
