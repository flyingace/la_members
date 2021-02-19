import { SET_DAILY_FORECAST, SET_FIVE_DAY_FORECAST } from '../_actions/MemberProfileActions';

const initialState = {
  dailyForecast: {
    temp: null,
    date: null,
    feelsLike: null,
    generalOutlook: '',
    highTemp: null,
    lowTemp: null,
    weatherIconURL: '',
  },
  fiveDayForecast: [],
};

export default function WeatherReducers(state = initialState, action) {
  switch (action.type) {
    case SET_DAILY_FORECAST:
      return Object.assign({}, state, { dailyForecast: action.dailyForecast });
    case SET_FIVE_DAY_FORECAST:
      return Object.assign({}, state, { fiveDayForecast: action.fiveDayForecast });
    default:
      return state;
  }
}
