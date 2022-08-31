import {
  CREATE_ACTIVITY,
  FILTER_ACTIVITIES,
  FILTER_BY_CONTINENT,
  GET_ACTIVITIES,
  GET_BY_NAME,
  GET_COUNTRIES,
  GET_DETAIL,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
} from "../actions";

const initialState = {
  countries: [],
  activities: [],
  detail: [],
  countriesFormated: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        countriesFormated: action.payload,
      };

    case FILTER_BY_CONTINENT:
      const filteredCont =
        action.payload !== "All"
          ? state.countries.filter(
              (country) => country.continent === action.payload
            )
          : (state.countriesFormated = state.countries);
      return {
        ...state,
        countriesFormated: filteredCont,
      };

    case ORDER_BY_NAME:
      if (action.payload === "All")
        return { ...state, countriesFormated: state.countries };
      if (action.payload === "asc") {
        const algo = state.countriesFormated.slice();
        return {
          ...state,
          countriesFormated: algo.sort(function (a, b) {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          }, console.log(state.countriesFormated)),
        };
      } else {
        const algo = state.countriesFormated.slice();
        return {
          ...state,
          countriesFormated: algo.sort(function (a, b) {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
          }, console.log(state.countriesFormated)),
        };
      }

    case ORDER_BY_POPULATION:
      if (action.payload === "All")
        return { ...state, countriesFormated: state.countries };
      if (action.payload === "asc") {
        const algo = state.countriesFormated.slice();
        return {
          ...state,
          countriesFormated: algo.sort(function (a, b) {
            if (a.population > b.population) return 1;
            if (a.population < b.population) return -1;
            return 0;
          }, console.log(state.countriesFormated)),
        };
      } else {
        const algo = state.countriesFormated.slice();
        return {
          ...state,
          countriesFormated: algo.sort(function (a, b) {
            if (a.population > b.population) return -1;
            if (a.population < b.population) return 1;
            return 0;
          }, console.log(state.countriesFormated)),
        };
      }

    case GET_BY_NAME:
      return {
        ...state,
        countriesFormated: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case CREATE_ACTIVITY:
      return {
        ...state,
        activities: [action.payload, ...state.activities],
      };

    case FILTER_ACTIVITIES:
      const countriesByActivity =
        action.payload === "All"
          ? (state.countriesFormated = state.countries)
          : state.countries.filter(
              (country) =>
                country.activities &&
                country.activities
                  .map((activity) => activity.name)
                  .includes(action.payload)
            );
      console.log(action.payload, countriesByActivity);
      return {
        ...state,
        countriesFormated: countriesByActivity,
      };

    default:
      return state;
  }
}

export default rootReducer;

// ORDER BY NAME & ORDER BY POP
// case ORDER_BY_NAME:
//   switch (action.payload) {
//     case "asc":
//       const countriesByNameAsc = state.countriesFormated.sort(function (
//         a,
//         b
//       ) {
//         if (a.name > b.name) {
//           return 1;
//         }
//         if (b.name > a.name) {
//           return -1;
//         }
//         return 0;
//       });
//       // console.log("HOLA DESDE ASC" + countriesByNameAsc);
//       return { ...state, countriesFormated: countriesByNameAsc };

//     case "desc":
//       const countriesByNameDesc = state.countriesFormated.sort(function (
//         a,
//         b
//       ) {
//         if (a.name > b.name) {
//           return -1;
//         }
//         if (b.name > a.name) {
//           return 1;
//         }
//         return 0;
//       });
//       // console.log("HOLA DESDE DESC" + countriesByNameDesc);
//       return { ...state, countriesFormated: countriesByNameDesc };

//     default:
//       return {
//         ...state,
//         countriesFormated: state.countries,
//       };
//   }

// case ORDER_BY_POPULATION:
//   switch (action.payload) {
//     case "asc":
//       const algo = state.countriesFormated;
//       const countriesByNameAsc = algo.sort(function (a, b) {
//         if (a.population > b.population) {
//           return 1;
//         }
//         if (b.population > a.population) {
//           return -1;
//         }
//         return 0;
//       });
//       // console.log("HOLA DESDE ASC" + countriesByNameAsc);
//       return { ...state, countriesFormated: countriesByNameAsc };

//     case "desc":
//       const algo2 = state.countriesFormated;
//       const countriesByNameDesc = algo2.sort(function (a, b) {
//         if (a.population > b.population) {
//           return -1;
//         }
//         if (b.population > a.population) {
//           return 1;
//         }
//         return 0;
//       });
//       // console.log("HOLA DESDE DESC" + countriesByNameDesc);
//       return { ...state, countriesFormated: countriesByNameDesc };

//     default:
//       return {
//         ...state,
//         countriesFormated: state.countries,
//       };
//   }
