import React from 'react'
import PastExercise from '../../components/PastExercise/PastExercise'
import { useState, useEffect, useRef } from 'react';
import * as fitnessLogAPI from '../../utilities/fitnesslogs-api';
import { Link } from 'react-router-dom'
import Session from '../Session/Session'

export default function FitnessLog({user}) {
    const [fitnessLog, setFitnessLog] = useState({});
    const [updateLog, setUpdateLog] = useState(false)

    useEffect(function() {
        async function getUserFitnessLog(){
            const userFitnessLog = await fitnessLogAPI.getFitnessLog(user._id);
            setFitnessLog(userFitnessLog);
        }
        getUserFitnessLog();
        setUpdateLog(false)
    }, [updateLog]);

    return (
        <>
        <p>{fitnessLog.logName}</p>
        <Link to="/fitnesslog/sessionform" className="button btn-sm"><button>Create New Session</button></Link>
        {fitnessLog.session ? 
        fitnessLog.session.map((s) => (<PastExercise key={s} setUpdateLog={setUpdateLog} sessionId={s} user={user}/>))
        :
         ''}
        </>
    )
}
