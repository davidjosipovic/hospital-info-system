import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import patientsReducer from "../features/patients/patientsSlice";
import doctorsReducer from "../features/doctors/doctorsSlice";
import appointmentsReducer from "../features/appointments/appointmentsSlice";
import usersReducer from "../features/users/usersSlice";
import departmentsReducer from "../features/departments/departmentsSlice";
import specializationsReducer from  "../features/specializations/specializationsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientsReducer,
    doctors: doctorsReducer,
    appointments: appointmentsReducer,
    users: usersReducer,
    departments: departmentsReducer,
    specializations: specializationsReducer,
  },
});

export default store;
