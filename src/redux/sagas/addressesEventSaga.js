import { call, put, takeLatest } from "redux-saga/effects";
import request from "../../utils/request";

function* getAllAddressesEvents(payload) {
  try {
    yield put({
      type: "FETCH_ADDRESSES_EVENTS_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/addressesEvents?page=${payload.value.page}&search=${payload.value.search}&offset=${payload.value.offset}`;
    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "FETCH_ADDRESSES_EVENT_SUCCESS",
      value: response,
    });
    yield put({
      type: "HIDE_LOADING",
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied load",
        message: "Falied load AddressesEvents",
      },
    });
    yield put({
      type: "FETCH_ADDRESSES_EVENT_ERROR",
    });
  }
}

function* postAddressesEvent(payload) {
  try {
    yield put({ type: "CREATE_ADDRESSES_EVENT_REQUESTING" });

    yield put({
      type: "SHOW_LOADING",
    });
    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/addressesEvents`;

    const headers = {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payload.value),
    };

    const response = yield call(request, requestURL, headers);

    yield put({
      type: "CREATE_ADDRESSES_EVENT_SUCCESS",
      value: response,
    });
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful save",
        message: "Successful save AddressesEvent",
      },
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied save",
        message: "Falied save AddressesEvent",
      },
    });
    yield put({
      type: "CREATE_ADDRESSES_EVENT_ERROR",
    });
  }
}

function* getAddressesEventById(payload) {
  try {
    yield put({
      type: "READ_ADDRESSES_EVENT_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/addressesEvents/${payload.value.id}`;

    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "READ_ADDRESSES_EVENT_SUCCESS",
      value: response,
    });
    yield put({
      type: "HIDE_LOADING",
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "READ_ADDRESSES_EVENT_ERROR",
    });
  }
}

function* updateAddressesEvent(payload) {
  try {
    yield put({
      type: "UPDATE_ADDRESSES_EVENT_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/addressesEvents/${payload.value.id}`;

    const headers = {
      method: "PATCH",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payload.value),
    };

    const response = yield call(request, requestURL, headers);

    yield put({
      type: "UPDATE_ADDRESSES_EVENT_SUCCESS",
      value: response,
    });
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful update",
        message: "Successful update AddressesEvent",
      },
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied update",
        message: "Falied update AddressesEvent",
      },
    });
    yield put({
      type: "UPDATE_ADDRESSES_EVENT_ERROR",
    });
  }
}

function* getAddressesEventByIdAddress(payload) {
  try {
    yield put({
      type: "READ_BY_IDADDRESS_ADDRESSES_EVENT_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/addressesEvents/address/${payload.value.idAddress}`;

    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "READ_BY_IDADDRESS_ADDRESSES_EVENT_SUCCESS",
      value: response,
    });
    yield put({
      type: "HIDE_LOADING",
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "READ_BY_IDADDRESS_ADDRESSES_EVENT_ERROR",
    });
  }
}

export function* watchAddressesEvent() {
  yield takeLatest("FETCH_ADDRESSES_EVENTS_REQUEST", getAllAddressesEvents);
  yield takeLatest("CREATE_ADDRESSES_EVENT_REQUEST", postAddressesEvent);
  yield takeLatest("READ_ADDRESSES_EVENT_REQUEST", getAddressesEventById);
  yield takeLatest("UPDATE_ADDRESSES_EVENT_REQUEST", updateAddressesEvent);
  yield takeLatest(
    "READ_BY_IDADDRESS_ADDRESSES_EVENT_REQUEST",
    getAddressesEventByIdAddress
  );
}
