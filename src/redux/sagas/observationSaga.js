import { call, put, takeLatest } from "redux-saga/effects";
import request from "../../utils/request";

function* getAllObservations(payload) {
  try {
    yield put({
      type: "FETCH_OBSERVATIONS_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/routeObservations?page=${payload.value.page}&search=${payload.value.search}&offset=${payload.value.offset}`;
    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "FETCH_OBSERVATION_SUCCESS",
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
        message: "Falied load Observations",
      },
    });
    yield put({
      type: "FETCH_OBSERVATION_ERROR",
    });
  }
}

function* postObservation(payload) {
  try {
    yield put({ type: "CREATE_OBSERVATION_REQUESTING" });

    yield put({
      type: "SHOW_LOADING",
    });
    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/routeObservations`;

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
      type: "CREATE_OBSERVATION_SUCCESS",
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
        message: "Successful save Observation",
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
        message: "Falied save Observation",
      },
    });
    yield put({
      type: "CREATE_OBSERVATION_ERROR",
    });
  }
}

function* getObservationById(payload) {
  try {
    yield put({
      type: "READ_OBSERVATION_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/routeObservations/${payload.value.id}`;

    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "READ_OBSERVATION_SUCCESS",
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
      type: "READ_OBSERVATION_ERROR",
    });
  }
}

function* deleteObservationById(payload) {
  try {
    yield put({
      type: "DELETE_OBSERVATION_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/routeObservations/changeState/${payload.value.idRouteObservation}`;

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
      type: "DELETE_OBSERVATION_SUCCESS",
      value: response,
    });
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful disable",
        message: "Successful disable Observation",
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
        title: "Falied disable",
        message: "Falied disable Observation",
      },
    });
    yield put({
      type: "DELETE_OBSERVATION_ERROR",
    });
  }
}

function* updateObservation(payload) {
  try {
    yield put({
      type: "UPDATE_OBSERVATION_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/routeObservations/${payload.value.id}`;

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
      type: "UPDATE_OBSERVATION_SUCCESS",
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
        message: "Successful update Observation",
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
        message: "Falied update Observation",
      },
    });
    yield put({
      type: "UPDATE_OBSERVATION_ERROR",
    });
  }
}

export function* watchObservation() {
  yield takeLatest("FETCH_OBSERVATIONS_REQUEST", getAllObservations);
  yield takeLatest("CREATE_OBSERVATION_REQUEST", postObservation);
  yield takeLatest("READ_OBSERVATION_REQUEST", getObservationById);
  yield takeLatest("DELETE_OBSERVATION_REQUEST", deleteObservationById);
  yield takeLatest("UPDATE_OBSERVATION_REQUEST", updateObservation);
}
