import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import { devToolsEnhancer } from "redux-devtools-extension";

import authReducer from "./Auth/reducers";
// import homeReducer from "@modules/home/reducers";
// import cartReducer from "@modules/cart/reducers";
// import categoryReducer from "./modules/category/reducers";
// import savedReducer from "./modules/saved/reducers";
// import policiesReducers from "./modules/policies/reducers";

const peresistConfig = {
  key: "root",
};

const rootReducer = combineReducers({
  auth: authReducer,
  //   home: homeReducer,
  //   cart: cartReducer,
  //   categories: categoryReducer,
  //   saved: savedReducer,
  //   policies: policiesReducers,
});

// const persistedReducer = persistReducer(peresistConfig, rootReducer);

const store = createStore(rootReducer, devToolsEnhancer({ trace: true }));

// const store = createStore(persistedReducer, applyMiddleware(createLogger()));

// let persistor = persistStore(store);

export { store };
