const initialState = {
  requestingFetchAddressesEvents: false,
  successfulFetchAddressesEvents: false,
  errorFetchAddressesEvents: false,
  addressesEvents: {},
  requestingCreateAddressesEvent: false,
  successfulCreateAddressesEvent: false,
  errorsCreateAddressesEvent: false,
  addressesEvent: null,
  requestingReadAddressesEvent: false,
  successfulReadAddressesEvent: false,
  errorsReadAddressesEvent: false,
  rowEdited: null,
  requestingUpdateAddressesEvent: false,
  successfulUpdateAddressesEvent: false,
  errorsUpdateAddressesEvent: false,
  rowUpdated: null,
  requestingReadAddressesEventByIdAddress: false,
  successfulReadAddressesEventByIdAddress: false,
  errorsReadAddressesEventByIdAddress: false,
  addressesEventsByIdAddress: null,
};

const addressesEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ADDRESSES_EVENTS_REQUESTING":
      return {
        ...state,
        requestingFetchAddressesEvents: true,
        successfulFetchAddressesEvents: false,
        errorsFetchAddressesEvents: false,
      };
    case "FETCH_ADDRESSES_EVENT_SUCCESS":
      return {
        ...state,
        errorFetchAddressesEvents: false,
        requestingFetchAddressesEvents: false,
        successfulFetchAddressesEvents: true,
        addressesEvents: action.value,
      };
    case "FETCH_ADDRESSES_EVENT_ERROR":
      return {
        ...state,
        errorFetchAddressesEvents: true,
        requestingFetchAddressesEvents: false,
        successfulFetchAddressesEvents: false,
      };
    case "CREATE_ADDRESSES_EVENT_REQUESTING":
      return {
        ...state,
        requestingCreateAddressesEvent: true,
        successfulCreateAddressesEvent: false,
        errorsCreateAddressesEvent: false,
      };
    case "CREATE_ADDRESSES_EVENT_SUCCESS":
      return {
        ...state,
        errorsCreateAddressesEvent: false,
        requestingCreateAddressesEvent: false,
        successfulCreateAddressesEvent: true,
        addressesEvent: action.value,
      };
    case "CREATE_ADDRESSES_EVENT_ERROR":
      return {
        ...state,
        errorsCreateAddressesEvent: true,
        requestingCreateAddressesEvent: false,
        successfulCreateAddressesEvent: false,
      };
    case "READ_ADDRESSES_EVENT_REQUESTING":
      return {
        ...state,
        requestingReadAddressesEvent: true,
        successfulReadAddressesEvent: false,
        errorsReadAddressesEvent: false,
      };
    case "READ_ADDRESSES_EVENT_SUCCESS":
      return {
        ...state,
        errorsReadAddressesEvent: false,
        requestingReadAddressesEvent: false,
        successfulReadAddressesEvent: true,
        rowEdited: action.value,
      };
    case "READ_ADDRESSES_EVENT_ERROR":
      return {
        ...state,
        errorsReadAddressesEvent: true,
        requestingReadAddressesEvent: false,
        successfulReadAddressesEvent: false,
      };
    case "UPDATE_ADDRESSES_EVENT_REQUESTING":
      return {
        ...state,
        requestingUpdateAddressesEvent: true,
        successfulUpdateAddressesEvent: false,
        errorsUpdateAddressesEvent: false,
      };
    case "UPDATE_ADDRESSES_EVENT_SUCCESS":
      return {
        ...state,
        errorsUpdateAddressesEvent: false,
        requestingUpdateAddressesEvent: false,
        successfulUpdateAddressesEvent: true,
        rowUpdated: action.value,
      };
    case "UPDATE_ADDRESSES_EVENT_ERROR":
      return {
        ...state,
        errorsUpdateAddressesEvent: true,
        requestingUpdateAddressesEvent: false,
        successfulUpdateAddressesEvent: false,
      };
    case "READ_BY_IDADDRESS_ADDRESSES_EVENT_REQUESTING":
      return {
        ...state,
        requestingReadAddressesEventByIdAddress: true,
        successfulReadAddressesEventByIdAddress: false,
        errorsReadAddressesEventByIdAddress: false,
      };
    case "READ_BY_IDADDRESS_ADDRESSES_EVENT_SUCCESS":
      return {
        ...state,
        errorsReadAddressesEventByIdAddress: false,
        requestingReadAddressesEventByIdAddress: false,
        successfulReadAddressesEventByIdAddress: true,
        addressesEventsByIdAddress: action.value,
      };
    case "READ_BY_IDADDRESS_ADDRESSES_EVENT_ERROR":
      return {
        ...state,
        errorsReadAddressesEventByIdAddress: true,
        requestingReadAddressesEventByIdAddress: false,
        successfulReadAddressesEventByIdAddress: false,
      };
    case "RESET_ADDRESSES_EVENT_FORM":
      return {
        ...state,
        requestingCreateAddressesEvent: false,
        successfulCreateAddressesEvent: false,
        errorsCreateAddressesEvent: false,
        addressesEvent: null,
        requestingReadAddressesEvent: false,
        successfulReadAddressesEvent: false,
        errorsReadAddressesEvent: false,
        rowEdited: null,
        requestingUpdateAddressesEvent: false,
        successfulUpdateAddressesEvent: false,
        errorsUpdateAddressesEvent: false,
        rowUpdated: null,
        requestingReadAddressesEventByIdAddress: false,
        successfulReadAddressesEventByIdAddress: false,
        errorsReadAddressesEventByIdAddress: false,
        addressesEventsByIdAddress: null,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default addressesEventReducer;
