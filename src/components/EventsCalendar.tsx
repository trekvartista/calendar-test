import { Badge, BadgeProps, Calendar } from "antd";
import { Moment } from "moment";
import React, { FC, useEffect, useState } from "react";
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
            <div className="flex flex-col">
                {dayEvents.map((event, i) => (
                    // <div key={i}>{event.description}</div>
                    <Badge status={"success" as BadgeProps['status']} text={event.description}/>
                ))}
            </div>
        );
    };

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    return (
        <div className="max-w-5xl">
            <Calendar
                className="px-4"
                dateCellRender={dateCellRender}
                fullscreen={width > 900}
            />
        </div>
    );
};

export default EventsCalendar;
