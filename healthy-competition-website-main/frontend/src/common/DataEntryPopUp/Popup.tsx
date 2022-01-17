import { Button } from "primereact/button";
import React, {useEffect, useState} from "react";
import {InputNumber} from "primereact/inputnumber";
import {Calendar} from "primereact/calendar";
import {addDays, longEnUSFormatter} from "../../common/utils/helpers";
import {UserEntry} from "../../../../backend/src/types/Game";
import {httpRequest} from "../../common/utils/axios";
import {currentUserStore, gameStore} from "../../stores";

interface PopUpProps {
    handleClose: ()=> void,
    show: boolean,
    metric: string,
    startDate: string
}

export const PopUp = (props: PopUpProps): JSX.Element => {
    const {
        startDate,
        handleClose,
        show,
        metric,
    } = props;

    const [inputMetric, setInputMetric] = useState<number>();
    const [inputDate, setInputDate] = useState<Date | Array<Date>>();

    useEffect(() => {
        document.getElementById('metricResponse').innerText = '';
        if (inputDate) {
            setInputDate(undefined);
        }
        if (inputMetric) {
            setInputMetric(undefined);
        }
    }, [show]);

    async function addMetric() {
        //create user entry
        if (inputDate instanceof Date && inputMetric) {
            try {
                const newEntry: UserEntry = {
                    date: longEnUSFormatter.format(inputDate),
                    value: inputMetric
                };

                //send new info to backend
                const response = await httpRequest({
                    method: "POST",
                    endpoint: '/api/games/',
                    data: {
                        data: {
                            newEntry,
                            id: gameStore.game.id
                        },
                        type: 'update-one',
                        user: currentUserStore.user.id
                    }
                });

                const value = response.data;

                //add user entry to game user
                gameStore.game.users.filter(value => value.id === currentUserStore.user.id)[0]?.values.push(newEntry);

                document.getElementById('metricResponse').innerText = "Successfully added entry";
            } catch (e) {
                document.getElementById('metricResponse').innerText = "Failed to add entry";
            }
        } else {
            alert('Values not properly entered');
        }
    }

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <div className="modal-main">
                <div className="modal-title p-d-flex p-jc-between p-ai-center">
                    Enter Data
                    <Button icon="pi pi-times" className="p-mr-2 " onClick={handleClose}/>
                </div>
                <div className={"p-p-4"}>
                    <span className="p-m-3 p-float-label">
                        <Calendar id="date-input" value={inputDate} onChange={(e) => setInputDate(e.value)} minDate={new Date(startDate)} maxDate={addDays(startDate, 7)} readOnlyInput />
                        <label htmlFor="date-input">Date</label>
                    </span>
                    <br/>
                    <span className="p-m-3 p-float-label">
                        <InputNumber id="metric-input" value={inputMetric} onValueChange={(e)=> setInputMetric(e.value)} mode={"decimal"} suffix=" lbs"/>
                        <label htmlFor="metric-input">{metric}</label>
                    </span>
                    <Button className="p-mr-2" label="submit" onClick={addMetric}/>
                    <p id="metricResponse"></p>
                </div>
            </div>
        </div>
    );
};
