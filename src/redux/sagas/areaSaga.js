import { call, put, takeLatest } from "redux-saga/effects";
import request from "../../utils/request";

function* getAllAreas(payload) {
  try {
    yield put({
      type: "FETCH_AREAS_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/areas?page=${payload.value.page}&search=${payload.value.search}&offset=${payload.value.offset}`;
    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "HIDE_LOADING",
    });

    yield put({
      type: "FETCH_AREA_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied load",
        message: "Falied load Areas",
      },
    });
    yield put({
      type: "FETCH_AREA_ERROR",
    });
  }
}

function* postArea(payload) {
  try {
    yield put({ type: "CREATE_AREA_REQUESTING" });
    yield put({
      type: "SHOW_LOADING",
    });
    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/areas`;

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
      type: "HIDE_LOADING",
    });

    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful save",
        message: "Successful save Area",
      },
    });

    yield put({
      type: "CREATE_AREA_SUCCESS",
      value: response,
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
        message: "Falied save Area",
      },
    });
    yield put({
      type: "CREATE_AREA_ERROR",
    });
  }
}

function* getAreaById(payload) {
  try {
    yield put({
      type: "READ_AREA_REQUESTING",
    });
    yield put({
      type: "SHOW_LOADING",
    });
    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/areas/${payload.value.id}`;

    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "HIDE_LOADING",
    });

    yield put({
      type: "READ_AREA_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "READ_AREA_ERROR",
    });
  }
}

function* deleteAreaById(payload) {
  try {
    yield put({
      type: "DELETE_AREA_REQUESTING",
    });
    yield put({
      type: "SHOW_LOADING",
    });
    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/areas/changeState/${payload.value.idArea}`;

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
      type: "HIDE_LOADING",
    });

    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful disable",
        message: "Successful disable Area",
      },
    });

    yield put({
      type: "DELETE_AREA_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied disable",
        message: "Falied disable Area",
      },
    });
    yield put({
      type: "DELETE_AREA_ERROR",
    });
  }
}

function* updateArea(payload) {
  try {
    yield put({
      type: "UPDATE_AREA_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/areas/${payload.value.id}`;

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
      type: "HIDE_LOADING",
    });

    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful update",
        message: "Successful update Area",
      },
    });

    yield put({
      type: "UPDATE_AREA_SUCCESS",
      value: response,
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
        message: "Falied update Area",
      },
    });
    yield put({
      type: "UPDATE_AREA_ERROR",
    });
  }
}

export function* watchArea() {
  yield takeLatest("FETCH_AREAS_REQUEST", getAllAreas);
  yield takeLatest("CREATE_AREA_REQUEST", postArea);
  yield takeLatest("READ_AREA_REQUEST", getAreaById);
  yield takeLatest("DELETE_AREA_REQUEST", deleteAreaById);
  yield takeLatest("UPDATE_AREA_REQUEST", updateArea);
}
