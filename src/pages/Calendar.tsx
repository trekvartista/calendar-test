import { Button, Layout, Modal, Row } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CreateEventForm from "../components/CreateEventForm";
import EventsCalendar from "../components/EventsCalendar";
import { useAppSelector } from "../hooks";
import { IEvent } from "../models/IEvent";
import { createEvent, fetchEvents, fetchGuests } from "../redux/reducers/event/eventSlice";

const Calendar: FC = () => {
    const dispatch = useDispatch();
    const { guests, events } = useAppSelector((state) => state.eventReducer);
    const { user } = useAppSelector(state => state.authReducer)

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const createNewEvent = (event: IEvent) => {
        setIsModalVisible(false);

        dispatch(createEvent(event) as any)
    }

    useEffect(() => {
        dispatch(fetchGuests() as any);
        dispatch(fetchEvents(user.username) as any);
    }, []);

    return (
        <Layout className="px-4 lg:px-24 py-4 lg:py-12">
            
            <Row justify="start" className="mb-4">
                <Button
                    type="primary"
                    className="bg-teal-400"
                    onClick={showModal}
                >
                    Add event
                </Button>
            </Row>
            <EventsCalendar events={events} />

            <Modal
                title="Basic Modal"
                visible={isModalVisible}

                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <CreateEventForm guests={guests} submit={createNewEvent}/>
            </Modal>
        </Layout>
    );
};

export default Calendar;
