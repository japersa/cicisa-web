import { all, fork } from "redux-saga/effects";
import { watchLogin } from "./loginSaga";
import { watchForgotPassword } from "./forgotPasswordSaga";
import { watchResetPassword } from "./resetPasswordSaga";
import { watchCountry } from "./countrySaga";
import { watchDepartment } from "./departmentSaga";
import { watchCity } from "./citySaga";
import { watchRole } from "./roleSaga";
import { watchArea } from "./areaSaga";
import { watchZone } from "./zoneSaga";
import { watchNeighborhood } from "./neighborhoodSaga";
import { watchCompany } from "./companySaga";
import { watchPermission } from "./permissionSaga";
import { watchUser } from "./userSaga";
import { watchPermissionRole } from "./permissionRoleSaga";
import { watchAddress } from "./addressSaga";
import { watchRoute } from "./routeSaga";
import { watchObservation } from "./observationSaga";
import { watchZoneNeighborhood } from "./zoneNeighborhoodSaga";
import { watchNovelty } from "./noveltySaga";
import { watchAddressesEvent } from "./addressesEventSaga";
import { watchHeadquarters } from "./headquartersSaga";

export function* rootSaga() {
  yield all([fork(watchLogin)]);
  yield all([fork(watchForgotPassword)]);
  yield all([fork(watchResetPassword)]);
  yield all([fork(watchCountry)]);
  yield all([fork(watchDepartment)]);
  yield all([fork(watchCity)]);
  yield all([fork(watchRole)]);
  yield all([fork(watchArea)]);
  yield all([fork(watchZone)]);
  yield all([fork(watchNeighborhood)]);
  yield all([fork(watchCompany)]);
  yield all([fork(watchPermission)]);
  yield all([fork(watchUser)]);
  yield all([fork(watchPermissionRole)]);
  yield all([fork(watchAddress)]);
  yield all([fork(watchRoute)]);
  yield all([fork(watchObservation)]);
  yield all([fork(watchZoneNeighborhood)]);
  yield all([fork(watchNovelty)]);
  yield all([fork(watchAddressesEvent)]);
  yield all([fork(watchHeadquarters)]);
}
