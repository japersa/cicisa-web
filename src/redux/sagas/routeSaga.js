import { call, put, takeLatest } from "redux-saga/effects";
import request from "../../utils/request";

function* getAllRoutes(payload) {
  try {
    yield put({
      type: "FETCH_ROUTES_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/routes?page=${payload.value.page}&search=${payload.value.search}&offset=${payload.value.offset}`;
    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "FETCH_ROUTE_SUCCESS",
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
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied load",
        message: "Falied load Routes",
      },
    });
    yield put({
      type: "FETCH_ROUTE_ERROR",
    });
  }
}

function* postRoute(payload) {
  try {
    yield put({ type: "CREATE_ROUTE_REQUESTING" });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/routes`;

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
      type: "CREATE_ROUTE_SUCCESS",
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
        message: "Successful save Route",
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
        message: "Falied save Route",
      },
    });
    yield put({
      type: "CREATE_ROUTE_ERROR",
    });
  }
}

function* getRouteById(payload) {
  try {
    yield put({
      type: "READ_ROUTE_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/routes/${payload.value.id}`;

    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "READ_ROUTE_SUCCESS",
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
      type: "READ_ROUTE_ERROR",
    });
  }
}

function* disableRouteById(payload) {
  try {
    yield put({
      type: "DISABLE_ROUTE_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/routes/changeState/${payload.value.idRoute}`;

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
      type: "DISABLE_ROUTE_SUCCESS",
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
        message: "Successful disable Route",
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
        message: "Falied disable Route",
      },
    });
    yield put({
      type: "DISABLE_ROUTE_ERROR",
    });
  }
}

function* updateRoute(payload) {
  try {
    yield put({
      type: "UPDATE_ROUTE_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/routes/${payload.value.id}`;

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
      type: "UPDATE_ROUTE_SUCCESS",
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
        message: "Successful update Route",
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
        message: "Falied update Route",
      },
    });
    yield put({
      type: "UPDATE_ROUTE_ERROR",
    });
  }
}

function* getAllCurrentRoute(payload) {
  try {
    yield put({
      type: "FETCH_CURRENT_ROUTE_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/routes/routeByCourier?idCourier=${payload.value.idUser}&date=${payload.value.date}&state=${payload.value.state}`;
    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "FETCH_CURRENT_ROUTE_SUCCESS",
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
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied load",
        message: "Falied load Current Route",
      },
    });
    yield put({
      type: "FETCH_CURRENT_ROUTE_ERROR",
    });
  }
}

function* deleteRouteById(payload) {
  try {
    yield put({
      type: "DELETE_ROUTE_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/routes/deleteRoute/${payload.value.idRoute}`;

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
      type: "DELETE_ROUTE_SUCCESS",
      value: response,
    });
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful delete",
        message: "Successful delete Route",
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
        message: "Falied disable Route",
      },
    });
    yield put({
      type: "DELETE_ROUTE_ERROR",
    });
  }
}

function* updateRoutesCourier(payload) {
  try {
    yield put({ type: "UPDATECOURIER_ROUTE_REQUESTING" });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/routes/changeCourierToRoute`;

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
      type: "UPDATECOURIER_ROUTE_SUCCESS",
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
        message: "Successful update Routes",
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
        message: "Falied update Routes",
      },
    });
    yield put({
      type: "UPDATECOURIER_ROUTE_ERROR",
    });
  }
}

function* deleteAllRoutes(payload) {
  try {
    yield put({
      type: "DELETEALL_ROUTE_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/routes/deleteAllSelectedRoutes`;

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
      type: "DELETEALL_ROUTE_SUCCESS",
      value: response,
    });
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful delete",
        message: "Successful delete Routes",
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
        title: "Falied delete",
        message: "Falied delete Routes",
      },
    });
    yield put({
      type: "DELETEALL_ROUTE_ERROR",
    });
  }
}

export function* watchRoute() {
  yield takeLatest("FETCH_ROUTES_REQUEST", getAllRoutes);
  yield takeLatest("CREATE_ROUTE_REQUEST", postRoute);
  yield takeLatest("READ_ROUTE_REQUEST", getRouteById);
  yield takeLatest("DISABLE_ROUTE_REQUEST", disableRouteById);
  yield takeLatest("UPDATE_ROUTE_REQUEST", updateRoute);
  yield takeLatest("FETCH_CURRENT_ROUTE_REQUEST", getAllCurrentRoute);
  yield takeLatest("DELETE_ROUTE_FORM", deleteRouteById);
  yield takeLatest("UPDATECOURIER_ROUTE_REQUEST", updateRoutesCourier);
  yield takeLatest("DELETEALL_ROUTE_FORM", deleteAllRoutes);
}
