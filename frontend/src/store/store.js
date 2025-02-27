import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import patientsReducer from "./slices/patientsSlice";
import doctorsReducer from "./slices/doctorsSlice";
import appointmentsReducer from "./slices/appointmentsSlice";
import usersReducer from "./slices/usersSlice";
import departmentsReducer from "./slices/departmentsSlice";
import specialisationsReducer from  "./slices/specialisationsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientsReducer,
    doctors: doctorsReducer,
    appointments: appointmentsReducer,
    users: usersReducer, // Ensure this matches what useSelector expects
    departments: departmentsReducer,
    specialisations: specialisationsReducer,
  },
});

export default store;
