import { FC } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { userSlice } from "./redux/reducers/UserSlice";

const App: FC = () => {

    const {count} = useAppSelector(state => state.userReducer);
    const {increment} = userSlice.actions;
    const dispatch = useAppDispatch()

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => dispatch(increment(10))}>
                INCREMENT
            </button>
        </div>
    );
};

export default App;
