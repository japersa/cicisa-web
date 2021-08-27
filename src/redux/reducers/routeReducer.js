const initialState = {
  requestingFetchRoutes: false,
  successfulFetchRoutes: false,
  errorFetchRoutes: false,
  routes: {},
  requestingCreateRoute: false,
  successfulCreateRoute: false,
  errorsCreateRoute: false,
  route: null,
  requestingReadRoute: false,
  successfulReadRoute: false,
  errorsReadRoute: false,
  rowEdited: null,
  requestingDisableRoute: false,
  successfulDisableRoute: false,
  errorsDisableRoute: false,
  rowDisabled: null,
  requestingUpdateRoute: false,
  successfulUpdateRoute: false,
  errorsUpdateRoute: false,
  rowUpdated: null,
  requestingFetchCurrentRoute: false,
  successfulFetchCurrentRoute: false,
  errorFetchCurrentRoute: false,
  currentRoute: null,
  requestingDeleteRoute: false,
  successfulDeleteRoute: false,
  errorsDeleteRoute: false,
  rowDeleted: null,
  requestingPatchRoutesCourier: false,
  successfulPatchRoutesCourier: false,
  errorsPatchRoutesCourier: false,
  routesCourier: null,
  requestingDeleteAllRoutes: false,
  successfulDeleteAllRoutes: false,
  errorsDeleteAllRoutes: false,
  rowsDeleted: null,
};

const routeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ROUTES_REQUESTING":
      return {
        ...state,
        requestingFetchRoutes: true,
        successfulFetchRoutes: false,
        errorsFetchRoutes: false,
      };
    case "FETCH_ROUTE_SUCCESS":
      return {
        ...state,
        errorFetchRoutes: false,
        requestingFetchRoutes: false,
        successfulFetchRoutes: true,
        routes: action.value,
      };
    case "FETCH_ROUTE_ERROR":
      return {
        ...state,
        errorFetchRoutes: true,
        requestingFetchRoutes: false,
        successfulFetchRoutes: false,
      };
    case "CREATE_ROUTE_REQUESTING":
      return {
        ...state,
        requestingCreateRoute: true,
        successfulCreateRoute: false,
        errorsCreateRoute: false,
      };
    case "CREATE_ROUTE_SUCCESS":
      return {
        ...state,
        errorsCreateRoute: false,
        requestingCreateRoute: false,
        successfulCreateRoute: true,
        route: action.value,
      };
    case "CREATE_ROUTE_ERROR":
      return {
        ...state,
        errorsCreateRoute: true,
        requestingCreateRoute: false,
        successfulCreateRoute: false,
      };
    case "READ_ROUTE_REQUESTING":
      return {
        ...state,
        requestingReadRoute: true,
        successfulReadRoute: false,
        errorsReadRoute: false,
      };
    case "READ_ROUTE_SUCCESS":
      return {
        ...state,
        errorsReadRoute: false,
        requestingReadRoute: false,
        successfulReadRoute: true,
        rowEdited: action.value,
      };
    case "READ_ROUTE_ERROR":
      return {
        ...state,
        errorsReadRoute: true,
        requestingReadRoute: false,
        successfulReadRoute: false,
      };
    case "DISABLE_ROUTE_REQUESTING":
      return {
        ...state,
        requestingDisableRoute: true,
        successfulDisableRoute: false,
        errorsDisableRoute: false,
      };
    case "DISABLE_ROUTE_SUCCESS":
      return {
        ...state,
        errorsDisableRoute: false,
        requestingDisableRoute: false,
        successfulDisableRoute: true,
        rowDisabled: action.value,
      };
    case "DISABLE_ROUTE_ERROR":
      return {
        ...state,
        errorsDisableRoute: true,
        requestingDisableRoute: false,
        successfulDisableRoute: false,
      };
    case "UPDATE_ROUTE_REQUESTING":
      return {
        ...state,
        requestingUpdateRoute: true,
        successfulUpdateRoute: false,
        errorsUpdateRoute: false,
      };
    case "UPDATE_ROUTE_SUCCESS":
      return {
        ...state,
        errorsUpdateRoute: false,
        requestingUpdateRoute: false,
        successfulUpdateRoute: true,
        rowUpdated: action.value,
      };
    case "UPDATE_ROUTE_ERROR":
      return {
        ...state,
        errorsUpdateRoute: true,
        requestingUpdateRoute: false,
        successfulUpdateRoute: false,
      };
    case "FETCH_CURRENT_ROUTE_REQUESTING":
      return {
        ...state,
        requestingFetchCurrentRoute: true,
        successfulFetchCurrentRoute: false,
        errorsFetchCurrentRoute: false,
      };
    case "FETCH_CURRENT_ROUTE_SUCCESS":
      return {
        ...state,
        errorFetchCurrentRoute: false,
        requestingFetchCurrentRoute: false,
        successfulFetchCurrentRoute: true,
        currentRoute: action.value,
      };
    case "FETCH_CURRENT_ROUTE_ERROR":
      return {
        ...state,
        errorFetchCurrentRoute: true,
        requestingFetchCurrentRoute: false,
        successfulFetchCurrentRoute: false,
      };
    case "DELETE_ROUTE_REQUESTING":
      return {
        ...state,
        requestingDeleteRoute: true,
        successfulDeleteRoute: false,
        errorsDeleteRoute: false,
      };
    case "DELETE_ROUTE_SUCCESS":
      return {
        ...state,
        errorsDeleteRoute: false,
        requestingDeleteRoute: false,
        successfulDeleteRoute: true,
        rowDeleted: action.value,
      };
    case "DELETE_ROUTE_ERROR":
      return {
        ...state,
        errorsDeleteRoute: true,
        requestingDeleteRoute: false,
        successfulDeleteRoute: false,
      };
    case "RESET_ROUTE_FORM":
      return {
        ...state,
        requestingCreateRoute: false,
        successfulCreateRoute: false,
        errorsCreateRoute: false,
        route: null,
        requestingReadRoute: false,
        successfulReadRoute: false,
        errorsReadRoute: false,
        rowEdited: null,
        requestingDeleteRoute: false,
        successfulDeleteRoute: false,
        rowDeleted: null,
        requestingUpdateRoute: false,
        successfulUpdateRoute: false,
        errorsUpdateRoute: false,
        rowUpdated: null,
        requestingFetchCurrentRoute: false,
        successfulFetchCurrentRoute: false,
        errorFetchCurrentRoute: false,
        currentRoute: null,
        requestingDisableRoute: false,
        successfulDisableRoute: false,
        errorsDisableRoute: false,
        rowDisabled: null,
        requestingUpdateRoute: false,
        successfulUpdateRoute: false,
        errorsUpdateRoute: false,
        rowUpdated: null,
        requestingFetchCurrentRoute: false,
        successfulFetchCurrentRoute: false,
        errorFetchCurrentRoute: false,
        currentRoute: null,
        requestingDeleteRoute: false,
        successfulDeleteRoute: false,
        errorsDeleteRoute: false,
        rowDeleted: null,
        requestingPatchRoutesCourier: false,
        successfulPatchRoutesCourier: false,
        errorsPatchRoutesCourier: false,
        routesCourier: null,
        requestingDeleteAllRoutes: false,
        successfulDeleteAllRoutes: false,
        errorsDeleteAllRoutes: false,
        rowsDeleted: null,
      };
    case "UPDATECOURIER_ROUTE_REQUESTING":
      return {
        ...state,
        requestingPatchRoutesCourier: true,
        successfulPatchRoutesCourier: false,
        errorsPatchRoutesCourier: false,
      };
    case "UPDATECOURIER_ROUTE_SUCCESS":
      return {
        ...state,
        errorsPatchRoutesCourier: false,
        requestingPatchRoutesCourier: false,
        successfulPatchRoutesCourier: true,
        routesCourier: action.value,
      };
    case "UPDATECOURIER_ROUTE_ERROR":
      return {
        ...state,
        errorsPatchRoutesCourier: true,
        requestingPatchRoutesCourier: false,
        successfulPatchRoutesCourier: false,
      };
    case "DELETEALL_ROUTE_REQUESTING":
      return {
        ...state,
        requestingDeleteAllRoutes: true,
        successfulDeleteAllRoutes: false,
        errorsDeleteAllRoutes: false,
      };
    case "DELETEALL_ROUTE_SUCCESS":
      return {
        ...state,
        errorsDeleteAllRoutes: false,
        requestingDeleteAllRoutes: false,
        successfulDeleteAllRoutes: true,
        rowsDeleted: action.value,
      };
    case "DELETEALL_ROUTE_ERROR":
      return {
        ...state,
        errorsDeleteAllRoutes: true,
        requestingDeleteAllRoutes: false,
        successfulDeleteAllRoutes: false,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default routeReducer;
