const initialState = {
  requestingFetchAreas: false,
  successfulFetchAreas: false,
  errorFetchAreas: false,
  areas: {},
  requestingCreateArea: false,
  successfulCreateArea: false,
  errorsCreateArea: false,
  area: null,
  requestingReadArea: false,
  successfulReadArea: false,
  errorsReadArea: false,
  rowEdited: null,
  requestingDeleteArea: false,
  successfulDeleteArea: false,
  errorsDeleteArea: false,
  rowDeleted: null,
  requestingUpdateArea: false,
  successfulUpdateArea: false,
  errorsUpdateArea: false,
  rowUpdated: null,
};

const areaReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_AREAS_REQUESTING":
      return {
        ...state,
        requestingFetchAreas: true,
        successfulFetchAreas: false,
        errorsFetchAreas: false,
      };
    case "FETCH_AREA_SUCCESS":
      return {
        ...state,
        errorFetchAreas: false,
        requestingFetchAreas: false,
        successfulFetchAreas: true,
        areas: action.value,
      };
    case "FETCH_AREA_ERROR":
      return {
        ...state,
        errorFetchAreas: true,
        requestingFetchAreas: false,
        successfulFetchAreas: false,
      };
    case "CREATE_AREA_REQUESTING":
      return {
        ...state,
        requestingCreateArea: true,
        successfulCreateArea: false,
        errorsCreateArea: false,
      };
    case "CREATE_AREA_SUCCESS":
      return {
        ...state,
        errorsCreateArea: false,
        requestingCreateArea: false,
        successfulCreateArea: true,
        area: action.value,
      };
    case "CREATE_AREA_ERROR":
      return {
        ...state,
        errorsCreateArea: true,
        requestingCreateArea: false,
        successfulCreateArea: false,
      };
    case "READ_AREA_REQUESTING":
      return {
        ...state,
        requestingReadArea: true,
        successfulReadArea: false,
        errorsReadArea: false,
      };
    case "READ_AREA_SUCCESS":
      return {
        ...state,
        errorsReadArea: false,
        requestingReadArea: false,
        successfulReadArea: true,
        rowEdited: action.value,
      };
    case "READ_AREA_ERROR":
      return {
        ...state,
        errorsReadArea: true,
        requestingReadArea: false,
        successfulReadArea: false,
      };
    case "DELETE_AREA_REQUESTING":
      return {
        ...state,
        requestingDeleteArea: true,
        successfulDeleteArea: false,
        errorsDeleteArea: false,
      };
    case "DELETE_AREA_SUCCESS":
      return {
        ...state,
        errorsDeleteArea: false,
        requestingDeleteArea: false,
        successfulDeleteArea: true,
        rowDeleted: action.value,
      };
    case "DELETE_AREA_ERROR":
      return {
        ...state,
        errorsDeleteArea: true,
        requestingDeleteArea: false,
        successfulDeleteArea: false,
      };
    case "UPDATE_AREA_REQUESTING":
      return {
        ...state,
        requestingUpdateArea: true,
        successfulUpdateArea: false,
        errorsUpdateArea: false,
      };
    case "UPDATE_AREA_SUCCESS":
      return {
        ...state,
        errorsUpdateArea: false,
        requestingUpdateArea: false,
        successfulUpdateArea: true,
        rowUpdated: action.value,
      };
    case "UPDATE_AREA_ERROR":
      return {
        ...state,
        errorsUpdateArea: true,
        requestingUpdateArea: false,
        successfulUpdateArea: false,
      };
    case "RESET_AREA_FORM":
      return {
        ...state,
        requestingCreateArea: false,
        successfulCreateArea: false,
        errorsCreateArea: false,
        area: null,
        requestingReadArea: false,
        successfulReadArea: false,
        errorsReadArea: false,
        rowEdited: null,
        requestingDeleteArea: false,
        successfulDeleteArea: false,
        rowDeleted: null,
        requestingUpdateArea: false,
        successfulUpdateArea: false,
        errorsUpdateArea: false,
        rowUpdated: null,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default areaReducer;
