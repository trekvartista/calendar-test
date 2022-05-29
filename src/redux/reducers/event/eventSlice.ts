import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";
import { AppDispatch } from "../../store";
import { EventState } from "./types";

const initialState: EventState = {
    guests: [],
    events: [],
};

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        setGuests(state = initialState, action: PayloadAction<IUser[]>) {
            state.guests = action.payload;
        },
        setEvents(state = initialState, action: PayloadAction<IEvent[]>) {
            state.events = action.payload;
        },
    },
});

export const fetchGuests = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get<IUser[]>("./users.json");
        // console.log(response.data)
        dispatch(setGuests(response.data));
    } catch (e) {
        console.error(e);
    }
};

export const fetchEvents = (user: string) => async (dispatch: AppDispatch) => {
    try {
        const events = localStorage.getItem("events") || '[]'
        const json = JSON.parse(events) as IEvent[]

        const userEvents = json.filter( event => event.author === user || event.guest === user)
        dispatch(setEvents(userEvents))

    } catch (e) {
        console.error(e);
    }
}

export const createEvent = (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
        const events = localStorage.getItem("events") || "[]";
        const json = JSON.parse(events) as IEvent[];

        json.push(event);

        dispatch(setEvents(json));
        localStorage.setItem("events", JSON.stringify(json))

    } catch (e) {
        console.error(e);
    }
};

export const { setEvents, setGuests } = eventSlice.actions;
export default eventSlice.reducer;
