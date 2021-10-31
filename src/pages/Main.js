import React, {useState, useEffect} from 'react';
import Card from '../components/UI/Card/Card';
import DropdownList from '../components/UI/DropdownList/DropdownList';
import axios from 'axios';
import months from '../store/months.json'

import './Main.css'

const Main = () => {
    const [events, setEvents] = useState([])
    const [filterEvents, setFilterEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [cities, setCities] = useState([])
    const [selectMonth, setSelectMonth] = useState('09')
    const [selectCity, setSelectCity] = useState('01')
    const [clickFav, setClickFav] = useState(true)
    const [favouritesList, setFavouritesList] = useState([])

    // нажатие на избранное, если событие есть в избранном, тогда убираем его оттуда, иначе добавляем
    const onClickFavourite = (id) => {
        const event = events.filter((item => item.id === id))
        const isFind = favouritesList.filter((item => item.id === id)).length > 0 ? true : false;
        if (isFind) {
            const newFavouritesList = favouritesList.filter((item => item.id !== id))
            setFavouritesList(newFavouritesList)
            // запоминаем в локальном хранилище список избранных
            localStorage.setItem('favouritesList', JSON.stringify(newFavouritesList))
        }
        else {
            setFavouritesList([...favouritesList, event[0]])
            localStorage.setItem('favouritesList', JSON.stringify([...favouritesList, event[0]]))
        }
        setClickFav(!clickFav)
    }

    const getlistCards = () => {
        if (filterEvents.length > 0) {
            return filterEvents.map((item) => {
                return (
                    <Card key={item.id} event={item} onClick={onClickFavourite} favList={favouritesList}></Card>
                )
            })
        }
        else {
            return <p>В запрашиваемых городе и месяце нет событий. Выберите другой город или месяц.</p> 
        }
    }    

    // запрашиваем данные по http
    async function fetchData () {
        await axios.get(`https://raw.githubusercontent.com/xsolla/xsolla-frontend-school-2021/main/events.json`)
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => {
            console.log(error)
        })
    }

    const getCitiesList = (events) => {
        let citiList = []
        events.forEach(item => {
            const isExist = citiList.find(elem => elem.name === item.city);
            if (isExist === undefined) {
                citiList.push({id: item.id, name: item.city})
            }
        })
        setCities(citiList);
    }

    // получаем список отфильтрованных событий по городу и дате
    const getFilterEvents = () => {
        let filterList = []
        const curCity = cities.filter((item => item.id === selectCity))
        const curMonth = months.filter((item => item.id === selectMonth))

        if (curCity.length !== 0) {
            events.forEach(item => {
                if (item.city === curCity[0].name && item.date.substr(3,2) === curMonth[0].id) {
                    filterList.push(item)
                }
            })
            setFilterEvents(filterList)
        }
    }

    useEffect(() => {
        setIsLoading(false)
        fetchData()
        setFavouritesList(localStorage.getItem('favouritesList') === null ? [] : JSON.parse(localStorage.getItem('favouritesList')))
        setIsLoading(true)
    }, [selectCity, selectMonth, clickFav])

    useEffect(() => {
        getCitiesList(events)
    }, [events])

    useEffect(() => {
        getFilterEvents()
    }, [cities])

    return (
        <div className="container">
            <div className="content">
                <h1 className="header">Event Listing</h1>
                <div className="block">
                    <span>City:</span>
                    {isLoading  
                        ? <DropdownList items={cities} changeItem={setSelectCity} defaultSelect={selectCity}></DropdownList>
                        : <span>loading...</span>
                    }
                    <span>Month:</span>
                    {isLoading 
                        ? <DropdownList items={months} changeItem={setSelectMonth} defaultSelect={selectMonth}></DropdownList>
                        : <span>loading...</span>
                    }
                </div>
                <div className="events">
                    {isLoading 
                        ? getlistCards()
                        : <span>loading...</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Main;