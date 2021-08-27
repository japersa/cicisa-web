import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import forgotPasswordReducer from "./forgotPasswordReducer";
import resetPasswordReducer from "./resetPasswordReducer";
import countryReducer from "./countryReducer";
import departmentReducer from "./departmentReducer";
import cityReducer from "./cityReducer";
import roleReducer from "./roleReducer";
import areaReducer from "./areaReducer";
import zoneReducer from "./zoneReducer";
import neighborhoodReducer from "./neighborhoodReducer";
import companyReducer from "./companyReducer";
import permissionReducer from "./permissionReducer";
import userReducer from "./userReducer";
import permissionRoleReducer from "./permissionRoleReducer";
import addressReducer from "./addressReducer";
import routeReducer from "./routeReducer";
import alertReducer from "./alertReducer";
import loadingReducer from "./loadingReducer";
import permissionsReducer from "./permissionsReducer";
import authReducer from "./authReducer";
import observationReducer from "./observationReducer";
import zoneNeighborhoodReducer from "./zoneNeighborhoodReducer";
import noveltyReducer from "./noveltyReducer";
import addressesEventReducer from "./addressesEventReducer";
import headquartersReducer from "./headquartersReducer";
import { MenuOpenReducer } from './MenuOpenReducer';

export const rootReducer = combineReducers({
  loginState: loginReducer,
  forgotPasswordState: forgotPasswordReducer,
  resetPasswordState: resetPasswordReducer,
  countryState: countryReducer,
  departmentState: departmentReducer,
  cityState: cityReducer,
  roleState: roleReducer,
  areaState: areaReducer,
  zoneState: zoneReducer,
  neighborhoodState: neighborhoodReducer,
  companyState: companyReducer,
  permissionState: permissionReducer,
  userState: userReducer,
  permissionRoleState: permissionRoleReducer,
  addressState: addressReducer,
  routeState: routeReducer,
  alertState: alertReducer,
  loadingState: loadingReducer,
  permissions: permissionsReducer,
  auth: authReducer,
  observationState: observationReducer,
  zoneNeighborhoodState: zoneNeighborhoodReducer,
  noveltyState: noveltyReducer,
  addressesEventState: addressesEventReducer,
  headquartersState: headquartersReducer,
  menuState: MenuOpenReducer
});
