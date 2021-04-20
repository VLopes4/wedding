import React, { useEffect, useState } from 'react';
import './styles.css';

export default function Countdown() {
    const remaining = (new Date(2021, 7, 1, 16, 0, 0).getTime() - new Date().getTime()) / 1000;
    const [days, setDays] = useState(Math.round(remaining / 60 / 60 / 24));
    const [hours, setHours] = useState(Math.round(remaining / 60 / 60 % 24));
    const [minutes, setMinutes] = useState(Math.round(remaining / 60 % 60));
    const [seconds, setSeconds] = useState(Math.round(remaining % 60));

    useEffect(() => {
        if(days > 0){
            setTimeout(() => {
                setSeconds(seconds - 1)
                if(seconds === 0){
                    setSeconds(60);
                    setMinutes(minutes - 1);
                }
                if(minutes === 0){
                    setMinutes(60);
                    setHours(hours - 1);
                }
                if(hours === 0){
                    setHours(24);
                    setDays(days - 1);
                }
            }, 1000)
        }
    },[seconds, minutes, hours, days]);

    return(
        <div className="container-countdown">
            <div className="time-countdown">
                <span>{days}</span>
                <span>{hours}</span>
                <span>{minutes}</span>
                <span>{seconds}</span>
            </div>
            <div className="label-countdown">
                <span>dias</span>
                <span>horas</span>
                <span>minutos</span>
                <span>segundos</span>
            </div>
        </div>
    );
}