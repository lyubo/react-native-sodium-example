import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'

import {styles} from '../styles'


class TestResult extends Component {

  render() {
    const text = (this.props.value == null) ? "?" :(this.props.value ? "Pass":"Fail")
    const style = {color:(this.props.value == null ? "black" : (this.props.value ? "green":"red"))}
    return (
      <View style={styles.testContainer}>
        <Text style={styles.testLabel}>{this.props.name}:</Text>
        <Text style={[styles.testResult,style]}>{text}</Text>
      </View>
    )
  }

}

export class BasicTest extends Component {

  constructor(props) {
    super(props)
    this.state = {tests:[]}
  }

  initTests(testNames) {
    this.setState((state) => {
      const tests = [...state.tests]
      testNames.forEach(tName => {
        const t = tests.find(t => t.name == tName)
        if (!t)
         tests.push({name:tName,value:null,error:null})
        else {
          t.value = null
          t.error = null
        }
      })
      //tests.sort(this._testOrder)
      return {...state,tests}
    })
  }

  _testOrder = (t1,t2) => {
    let result =  t1.name.localeCompare(t2.name)
    return result
  }

  testPassed(name,value = true) {
    this.setState((state) => {
      const tests = [...state.tests]
      const ti = tests.findIndex(t => t.name == name)
      const t = {name,value,error:null}
      if (ti >= 0) tests[ti] = t
      return {...state,tests}
    })
  }

  testFailed(name,error) {
    this.setState((state) => {
      const tests = [...state.tests]
      const ti = tests.findIndex(t => t.name == name)
      const t = {name,value:false,error}
      if (ti >= 0) tests[ti] = t
      return {...state,tests}
    })
  }

  render() {
    const {tests} = this.state
    return (
      <ScrollView style={{flex:1}}>
        {tests.map((t) => <TestResult key={t.name} name={t.name} value={t.value}/>)}
        <View style={{paddingTop:30}}>
          {tests.filter(t => !!t.error).map((t) => <Text key={t.name} style={styles.testError}>{`${t.name} -> ${t.error.message}`}</Text>)}
        </View>
      </ScrollView>
    )
  }

  hex2bin(hex){
    const result = new Uint8Array(hex.length / 2)
    for(var i = 0; i < hex.length-1; i += 2) result[i/2] = parseInt(hex.substr(i, 2), 16)
    return result
  }

  bin2hex(bytes) {

    return Array.from(bytes).map(byte => {
      const unsignedByte = byte & 0xff;
      return (unsignedByte < 16) ? '0' + unsignedByte.toString(16): unsignedByte.toString(16)
    }).join('')
  }

}
