import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './reducer/store';
import route from './config/router';

store.subscribe(()=>{
  // console.log(store.getState());
});
render(
   <Provider store={store}>
     {route}
   </Provider>,
  document.getElementById('app')
);

