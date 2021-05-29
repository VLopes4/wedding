import React, { useEffect, useState } from 'react';
import './styles.css';

export default function Countdown() {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft);
        }, 1000);
        
        return () => clearTimeout(timer);
    });

    function calculateTimeLeft() {
        let difference = new Date(2021, 7, 1, 16, 0, 0).getTime() - new Date().getTime();

        if(difference > 0){
            setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
            setMinutes(Math.floor((difference / 1000 / 60) % 60));
            setSeconds(Math.floor((difference / 1000) % 60));
        }
    }

    return(
        <div className="container-countdown">
            <div className="time-countdown">
                <span>{days}</span>
                <span>{hours}</span>
                <span>{minutes}</span>
                <span>{seconds}</span>
            </div>
            <div className="label-countdown">
                <span>{days > 1 ? 'dias' : 'dia'}</span>
                <span>{hours > 1 ? 'horas' : 'hora'}</span>
                <span>{minutes > 1 ? 'minutos' : 'minuto'}</span>
                <span>{seconds > 1 ? 'segundos' : 'segundo'}</span>
            </div>
        </div>
    );
}