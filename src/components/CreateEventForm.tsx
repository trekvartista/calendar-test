import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { Moment } from "moment";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks";
import { IEvent } from "../models/IEvent";
import { IUser } from "../models/IUser";
import { formatDate } from "../utils/date";
import { rules } from "../utils/rules";

interface EventFormProps {
    guests: IUser[];
    submit: (event: IEvent) => void;
}

const CreateEventForm: FC<EventFormProps> = (props) => {
    const dispatch = useDispatch();
    const { user } = useAppSelector((state) => state.authReducer);

    const [date, setDate] = useState();
    const [event, setEvent] = useState<IEvent>({
        author: "",
        guest: "",
        date: "",
        description: "",
    } as IEvent);

    const handleGuestChange = (value: string) => {
        setEvent({ ...event, guest: value });
    };

    const selectDate = (date: Moment | null) => {
        if (date) {
            // console.log( formatDate(date?.toDate()) )
            setEvent({ ...event, date: formatDate(date?.toDate()) });
        }
    };

    const onSubmit = () => {
        // console.log({...event, author: user.username})
        props.submit({ ...event, author: user.username });
    };

    return (
        <Form onFinish={onSubmit}>
            <Form.Item
                label="Event description"
                name="event"
                rules={[rules.required()]}
            >
                <Input
                    autoComplete="off"
                    onChange={(e) =>
                        setEvent({ ...event, description: e.target.value })
                    }
                />
            </Form.Item>

            <Form.Item
                label="Event date"
                name="date"
                rules={[rules.required(), rules.isDateValid()]}

            >
                <DatePicker onChange={(e) => selectDate(e)} />
            </Form.Item>
            <Form.Item label="Guest" name="guest" rules={[rules.required()]}>
                <Select onChange={handleGuestChange}>
                    {props.guests.map((guest, i) => (
                        <Select.Option key={i} value={guest.username}>
                            {guest.username}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Row justify="end">
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-teal-400"
                    >
                        Create Event
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default CreateEventForm;
