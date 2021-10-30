import { makeAutoObservable } from "mobx"

export default class mainStore {
    constructor() {
        this._cities = [
            {id: 1, name: 'Amsterdam'},
            {id: 2, name: 'Berlin'},
            {id: 3, name: 'Rim'},
        ]
        this._months = [
            {id: 1, name: 'January'},
            {id: 2, name: 'February'},
            {id: 3, name: 'March'},
            {id: 4, name: 'April'},
            {id: 5, name: 'May'},
            {id: 6, name: 'June'},
            {id: 7, name: 'July'},
            {id: 8, name: 'August'},
            {id: 9, name: 'September'},
            {id: 10, name: 'October'},
            {id: 11, name: 'November'},
            {id: 12, name: 'December'}
        ]
        makeAutoObservable(this)
    }

    setCities(cities) {
        this._cities = cities
    }

    setMonth(months) {
        this._months = months
    }

    get cities() {
        return this._cities
    }

    get months() {
        return this._months
    }
}