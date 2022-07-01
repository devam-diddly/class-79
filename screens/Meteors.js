import React, { Component } from 'react';
import { Text, View,Alert } from 'react-native';
import axios from "axios";

export default class MeteorScreen extends Component {
    constructor(){
        super()
        this.state = {
            meteors:{}
        }
    }
    getMeteors=()=>{
        axios.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=hlZxZWny1JsBuzKzUFCi6q168J7F9VBZcWDhTF01")
        .then(response=>{
            this.setState({
                meteors:response.data.near_earth_objects
            })
            //console.log(this.state.meteors)

        })
        .catch(error=>{
            Alert.alert(error.message)
        })
    }

    componentDidMount(){
        this.getMeteors()
    }
    render() {

        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading</Text>
                </View>
            )
                } else {
                    let meteor_arr = Object.keys(this.state.meteors).map(meteor_date => { return this.state.meteors[meteor_date] })
                    //console.log(meteor_arr)
                    let meteors = [].concat.apply([], meteor_arr);
                    meteors.forEach(function (element) { let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2 
                    let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000 
                    element.threat_score = threatScore; });
                    console.log(meteors)

                
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text>Meteor Screen!</Text>
            </View>
        )
            }
    }
}
