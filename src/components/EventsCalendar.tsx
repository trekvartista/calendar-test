import { Badge, BadgeProps, Calendar } from "antd";
import { Moment } from "moment";
import React, { FC } from "react";
import { IEvent } from "../models/IEvent";
import { formatDate } from "../utils/date";

interface EventCalendarProps {
    events: IEvent[];
}

const EventsCalendar: FC<EventCalendarProps> = (props) => {
    const dateCellRender = (value: Moment) => {
        const formatedDate = formatDate(value.toDate());
        const dayEvents = props.events.filter(
            (event) => event.date === formatedDate
        );
        return (
            <div>
                {dayEvents.map((event, i) => (
                    <div key={i}>{event.description}</div>
                ))}
            </div>
        );
    };

    return <Calendar className="px-4" dateCellRender={dateCellRender} />;
};

export default EventsCalendar;
