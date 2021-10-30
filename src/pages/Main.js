import React, {useState, useContext, useEffect} from 'react';
import Card from '../components/UI/Card/Card';
import DropdownList from '../components/UI/DropdownList/DropdownList';
import { Context } from '../index';
import axios from 'axios';
import months from '../store/months.json'

import './Main.css'

const Main = () => {
    const {store} = useContext(Context)
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [cities, setCities] = useState([])

    async function fetchData () {
        try {
            const response = await axios.get(`https://raw.githubusercontent.com/xsolla/xsolla-frontend-school-2021/main/events.json`)
            console.log(response.data)
            setEvents(response.data)
        } catch (e) {
            console.error(e);
        }
    }

    const getCitiesList = (events) => {
        let citiList = []
        events.forEach(item => {
            citiList.push({id: item.id, name: item.name})
        })
        console.log(citiList)
        setCities(citiList);
    }

    useEffect(() => {
        setIsLoading(false)
        fetchData()
        getCitiesList(events)
        
        console.log("EFFECT") 
        setIsLoading(true)
        
    }, [setEvents])

    return (
        <div className="container">
            <div className="content">
                <h1 className="header">Event Listing</h1>
                <div className="block">
                    <span>City:</span>
                    {isLoading  
                        ? <DropdownList data={events} items={cities}></DropdownList>
                        : <span>loading...</span>
                    }
                    <span>Month:</span>
                    {isLoading 
                        ? <DropdownList data={events} items={months}></DropdownList>
                        : <span>loading...</span>
                    }
                </div>
                <div className="events">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
        </div>
    )
}

export default Main;