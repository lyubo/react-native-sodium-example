import React, { Component } from 'react'
import {ScrollView, Text, View} from 'react-native'

import Base64 from 'base64-js'
import Sodium from 'react-native-sodium'

import {BasicTest} from './BasicTest'

export default class Test extends BasicTest {

  async _testRandom1() {
    let freq = [];
    for (i = 0; i < 256; ++i) freq[i] = 0;
    for (i = 0; i < 20*256; ++i) ++freq[await Sodium.randombytes_uniform(256)]
    var fail = false
    for (i = 0; i < 256 && !fail; ++i) if (freq[i] == 0) fail = true
    this.testPassed('randombytes_uniform',!fail)
  }

  async _testRandom2() {
    let freq = [];
    for (i = 0; i < 256; ++i) freq[i] = 0;
    Sodium.randombytes_buf(20*256).then((value) => {
      let a = Base64.toByteArray(value)
      for (i = 0; i < a.length; ++i) ++freq[a[i]]
      var fail = false
      for (i = 0; i < 256 && !fail; ++i) if (freq[i] == 0) fail = true
      this.testPassed('randombytes_buf',!fail)
    })
  }

  async _testRandom3() {
    let freq = [];
    for (i = 0; i < 256; ++i) freq[i] = 0;
    for (i = 0; i < 5*256; ++i) {
      let v = await Sodium.randombytes_random()
      ++freq[v & 0xff]
      ++freq[(v >>> 8) & 0xff]
      ++freq[(v >>> 16) & 0xff]
      ++freq[(v >>> 24) & 0xff]
    }
    var fail = false
    for (i = 0; i < 256 && !fail; ++i) if (freq[i] == 0) fail = true
    this.testPassed('randombytes_random',!fail)
  }

  componentDidMount() {
    this.initTests(['randombytes_uniform','randombytes_buf','randombytes_random'])
    this._testRandom1()
    this._testRandom2()
    this._testRandom3()
  }

}
