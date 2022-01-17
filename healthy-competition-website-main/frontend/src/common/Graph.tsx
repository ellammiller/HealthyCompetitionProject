import React from 'react';
import { Chart } from 'primereact/chart';
import {Game, GameUser, UserEntry} from "../../../backend/src/types/Game";
import {addDays, longEnUSFormatter} from "../common/utils/helpers";
import randomColor from "randomcolor";
import {observer} from "mobx-react";

interface ProgressGraphProps {
    rawData: Game
}

export const ProgressGraph = observer((props: ProgressGraphProps): JSX.Element => {
    const {rawData} = props;

    const labels = getLabels(rawData.timePeriod, rawData.dateStarted);

    function getLabels(timePeriod: string, dateStarted: string): Array<string> {
        const labels: Array<string> = [];

        const startDate = new Date(dateStarted);

        if (timePeriod === '1 week') {
            for(let days = 0; days <= 7; days++) {
                labels.push(longEnUSFormatter.format(addDays(startDate, days)));
            }
        }

        return labels;
    }

    //to properly place the data we must add placeholder values to places where we have no data
    function getDataValues(entries: Array<UserEntry>): Array<number> {
        const data = labels.map(() => NaN);
        entries.forEach((entry) => {
            labels.forEach((label, index) => {
                if (label === entry.date) {
                    data[index] = entry.value;
                }
            });
        });
        return data;
    }

    function getDatasets(users: Array<GameUser>): Array<{[key: string]: any}> {
        return users && users.map(user => {
            return {
                label: user.userName,
                data: getDataValues(user.values),
                fill: false,
                borderColor: randomColor()
            };
        });
    }

    const data = {
        labels: labels,
        datasets: getDatasets(rawData.users)
    };

    const options = {
        title: {
            display: true,
            text: 'Your Progress',
            fontSize: 16
        },
        legend: {
            position: 'bottom'
        },
        responsive: true
    };

    return (
        <div style={{width: "100%", height: "100%"}}>
            <Chart type='line' data={data} options={options} />
        </div>
    );
});
