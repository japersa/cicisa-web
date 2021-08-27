const initialState = {
  requestingFetchObservations: false,
  successfulFetchObservations: false,
  errorFetchObservations: false,
  observations: {},
  requestingCreateObservation: false,
  successfulCreateObservation: false,
  errorsCreateObservation: false,
  observation: null,
  requestingReadObservation: false,
  successfulReadObservation: false,
  errorsReadObservation: false,
  rowEdited: null,
  requestingDeleteObservation: false,
  successfulDeleteObservation: false,
  errorsDeleteObservation: false,
  rowDeleted: null,
  requestingUpdateObservation: false,
  successfulUpdateObservation: false,
  errorsUpdateObservation: false,
  rowUpdated: null,
};

const observationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_OBSERVATIONS_REQUESTING":
      return {
        ...state,
        requestingFetchObservations: true,
        successfulFetchObservations: false,
        errorsFetchObservations: false,
      };
    case "FETCH_OBSERVATION_SUCCESS":
      return {
        ...state,
        errorFetchObservations: false,
        requestingFetchObservations: false,
        successfulFetchObservations: true,
        observations: action.value,
      };
    case "FETCH_OBSERVATION_ERROR":
      return {
        ...state,
        errorFetchObservations: true,
        requestingFetchObservations: false,
        successfulFetchObservations: false,
      };
    case "CREATE_OBSERVATION_REQUESTING":
      return {
        ...state,
        requestingCreateObservation: true,
        successfulCreateObservation: false,
        errorsCreateObservation: false,
      };
    case "CREATE_OBSERVATION_SUCCESS":
      return {
        ...state,
        errorsCreateObservation: false,
        requestingCreateObservation: false,
        successfulCreateObservation: true,
        observation: action.value,
      };
    case "CREATE_OBSERVATION_ERROR":
      return {
        ...state,
        errorsCreateObservation: true,
        requestingCreateObservation: false,
        successfulCreateObservation: false,
      };
    case "READ_OBSERVATION_REQUESTING":
      return {
        ...state,
        requestingReadObservation: true,
        successfulReadObservation: false,
        errorsReadObservation: false,
      };
    case "READ_OBSERVATION_SUCCESS":
      return {
        ...state,
        errorsReadObservation: false,
        requestingReadObservation: false,
        successfulReadObservation: true,
        rowEdited: action.value,
      };
    case "READ_OBSERVATION_ERROR":
      return {
        ...state,
        errorsReadObservation: true,
        requestingReadObservation: false,
        successfulReadObservation: false,
      };
    case "DELETE_OBSERVATION_REQUESTING":
      return {
        ...state,
        requestingDeleteObservation: true,
        successfulDeleteObservation: false,
        errorsDeleteObservation: false,
      };
    case "DELETE_OBSERVATION_SUCCESS":
      return {
        ...state,
        errorsDeleteObservation: false,
        requestingDeleteObservation: false,
        successfulDeleteObservation: true,
        rowDeleted: action.value,
      };
    case "DELETE_OBSERVATION_ERROR":
      return {
        ...state,
        errorsDeleteObservation: true,
        requestingDeleteObservation: false,
        successfulDeleteObservation: false,
      };
    case "UPDATE_OBSERVATION_REQUESTING":
      return {
        ...state,
        requestingUpdateObservation: true,
        successfulUpdateObservation: false,
        errorsUpdateObservation: false,
      };
    case "UPDATE_OBSERVATION_SUCCESS":
      return {
        ...state,
        errorsUpdateObservation: false,
        requestingUpdateObservation: false,
        successfulUpdateObservation: true,
        rowUpdated: action.value,
      };
    case "UPDATE_OBSERVATION_ERROR":
      return {
        ...state,
        errorsUpdateObservation: true,
        requestingUpdateObservation: false,
        successfulUpdateObservation: false,
      };
    case "RESET_OBSERVATION_FORM":
      return {
        ...state,
        requestingCreateObservation: false,
        successfulCreateObservation: false,
        errorsCreateObservation: false,
        observation: null,
        requestingReadObservation: false,
        successfulReadObservation: false,
        errorsReadObservation: false,
        rowEdited: null,
        requestingDeleteObservation: false,
        successfulDeleteObservation: false,
        errorsDeleteObservation: false,
        rowDeleted: null,
        requestingUpdateObservation: false,
        successfulUpdateObservation: false,
        errorsUpdateObservation: false,
        rowUpdated: null,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default observationReducer;
