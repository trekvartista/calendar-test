import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";

export interface EventState {
    guests: IUser[];
    events: IEvent[];
}

export enum EventActionEnum {
    SET_GUESTS = "SET_GUESTS",
    SET_EVENTS = "SET_EVENTS",
}

interface setGuestsAction {
    type: EventActionEnum.SET_GUESTS;
    payload: IUser[];
}

interface setEventsAction {
    type: EventActionEnum.SET_EVENTS;
    payload: IEvent[];
}

export type EventAction = setEventsAction | setGuestsAction;
