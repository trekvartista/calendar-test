import moment, { Moment } from "moment";

export const rules = {
    required: (message: string = "This field is required.") => ({
        required: true,
        message
    }),
    isDateValid: (message: string = "Sorry, you cannot create an event for a past date.") => () => ({

        validator(_: any, value: Moment) {
            if (value.isSameOrAfter(moment())) {
                return Promise.resolve();
            }
            return Promise.reject(new Error(message))
        }
    })
}