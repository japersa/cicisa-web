const initialState = {
  requestingFetchHeadquartersses: false,
  successfulFetchHeadquartersses: false,
  errorFetchHeadquartersses: false,
  headquartersses: {},
  requestingCreateHeadquarters: false,
  successfulCreateHeadquarters: false,
  errorsCreateHeadquarters: false,
  headquarters: null,
  requestingReadHeadquarters: false,
  successfulReadHeadquarters: false,
  errorsReadHeadquarters: false,
  rowEdited: null,
  requestingDeleteHeadquarters: false,
  successfulDeleteHeadquarters: false,
  errorsDeleteHeadquarters: false,
  rowDeleted: null,
  requestingUpdateHeadquarters: false,
  successfulUpdateHeadquarters: false,
  errorsUpdateHeadquarters: false,
  rowUpdated: null,
};

const headquartersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_HEADQUARTERSSES_REQUESTING":
      return {
        ...state,
        requestingFetchHeadquartersses: true,
        successfulFetchHeadquartersses: false,
        errorsFetchHeadquartersses: false,
      };
    case "FETCH_HEADQUARTERS_SUCCESS":
      return {
        ...state,
        errorFetchHeadquartersses: false,
        requestingFetchHeadquartersses: false,
        successfulFetchHeadquartersses: true,
        headquartersses: action.value,
      };
    case "FETCH_HEADQUARTERS_ERROR":
      return {
        ...state,
        errorFetchHeadquartersses: true,
        requestingFetchHeadquartersses: false,
        successfulFetchHeadquartersses: false,
      };
    case "CREATE_HEADQUARTERS_REQUESTING":
      return {
        ...state,
        requestingCreateHeadquarters: true,
        successfulCreateHeadquarters: false,
        errorsCreateHeadquarters: false,
      };
    case "CREATE_HEADQUARTERS_SUCCESS":
      return {
        ...state,
        errorsCreateHeadquarters: false,
        requestingCreateHeadquarters: false,
        successfulCreateHeadquarters: true,
        headquarters: action.value,
      };
    case "CREATE_HEADQUARTERS_ERROR":
      return {
        ...state,
        errorsCreateHeadquarters: true,
        requestingCreateHeadquarters: false,
        successfulCreateHeadquarters: false,
      };
    case "READ_HEADQUARTERS_REQUESTING":
      return {
        ...state,
        requestingReadHeadquarters: true,
        successfulReadHeadquarters: false,
        errorsReadHeadquarters: false,
      };
    case "READ_HEADQUARTERS_SUCCESS":
      return {
        ...state,
        errorsReadHeadquarters: false,
        requestingReadHeadquarters: false,
        successfulReadHeadquarters: true,
        rowEdited: action.value,
      };
    case "READ_HEADQUARTERS_ERROR":
      return {
        ...state,
        errorsReadHeadquarters: true,
        requestingReadHeadquarters: false,
        successfulReadHeadquarters: false,
      };
    case "DELETE_HEADQUARTERS_REQUESTING":
      return {
        ...state,
        requestingDeleteHeadquarters: true,
        successfulDeleteHeadquarters: false,
        errorsDeleteHeadquarters: false,
      };
    case "DELETE_HEADQUARTERS_SUCCESS":
      return {
        ...state,
        errorsDeleteHeadquarters: false,
        requestingDeleteHeadquarters: false,
        successfulDeleteHeadquarters: true,
        rowDeleted: action.value,
      };
    case "DELETE_HEADQUARTERS_ERROR":
      return {
        ...state,
        errorsDeleteHeadquarters: true,
        requestingDeleteHeadquarters: false,
        successfulDeleteHeadquarters: false,
      };
    case "UPDATE_HEADQUARTERS_REQUESTING":
      return {
        ...state,
        requestingUpdateHeadquarters: true,
        successfulUpdateHeadquarters: false,
        errorsUpdateHeadquarters: false,
      };
    case "UPDATE_HEADQUARTERS_SUCCESS":
      return {
        ...state,
        errorsUpdateHeadquarters: false,
        requestingUpdateHeadquarters: false,
        successfulUpdateHeadquarters: true,
        rowUpdated: action.value,
      };
    case "UPDATE_HEADQUARTERS_ERROR":
      return {
        ...state,
        errorsUpdateHeadquarters: true,
        requestingUpdateHeadquarters: false,
        successfulUpdateHeadquarters: false,
      };
    case "RESET_HEADQUARTERS_FORM":
      return {
        ...state,
        requestingCreateHeadquarters: false,
        successfulCreateHeadquarters: false,
        errorsCreateHeadquarters: false,
        headquarters: null,
        requestingReadHeadquarters: false,
        successfulReadHeadquarters: false,
        errorsReadHeadquarters: false,
        rowEdited: null,
        requestingDeleteHeadquarters: false,
        successfulDeleteHeadquarters: false,
        rowDeleted: null,
        requestingUpdateHeadquarters: false,
        successfulUpdateHeadquarters: false,
        errorsUpdateHeadquarters: false,
        rowUpdated: null,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default headquartersReducer;
