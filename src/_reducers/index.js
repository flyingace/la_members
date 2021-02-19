import { combineReducers } from 'redux';
import WeatherReducers from './WeatherReducers';

const rootReducer = combineReducers({
  WeatherData: WeatherReducers,
});

export default rootReducer;
