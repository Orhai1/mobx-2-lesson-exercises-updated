import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import ResInput from './ResInput';

class Restaurant extends Component{
    addReservation = () => {
    this.props.RestaurantStore.addRes(this.props.GeneralStore.name, Number(this.props.GeneralStore.numPeople))
  }
    render () {
        return (
            <div>
                <span>You have {this.props.RestaurantStore.openTables} open tables</span>
                {/* Add in # of people in restaurant */}
                <div>{this.props.RestaurantStore.restPopulation} people in restaurant</div>
                {/* Add in # of completed tables with id "completedTables*/}
                 <div id="completedTables">{this.props.RestaurantStore.completedTables} completed tables</div>
                <ResInput/>
                <button id="addRes" onClick={this.addReservation}>Add Reservation</button>
                {/* Make the Add Reservation button work */}
                <div className = "reservations">
                {/* Map reservation data to Reservation components here */}
                    {this.props.RestaurantStore.reservations.map(res => (
                        <div className={res.completed ? 'reservation conditional' : 'reservation'} key={res.id}>
                        <Reservation res={res} />
                        <button onClick={() => this.props.RestaurantStore.completeRes(res.id)}>complete reservation</button>
                        <button onClick={() => this.props.RestaurantStore.seatRes(res.id)}>seat reservation</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default inject("GeneralStore", "RestaurantStore")(observer(Restaurant))