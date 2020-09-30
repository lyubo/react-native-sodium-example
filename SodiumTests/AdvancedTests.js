import React, { Component } from 'react'
import {ScrollView, Text, View} from 'react-native'

import Base64 from 'base64-js'
import Sodium from 'react-native-sodium'

import {BasicTest} from './BasicTest'

export default class Test extends BasicTest {

  constructor(props) {
    super(props)
  }

  async _testScalarMult() {

    const alicesk1 = "77076d0a7318a57d3c16c17251b26645df4c2f87ebc0992ab177fba51db92c2a";
    const alicepk = "8520f0098930a754748b7ddcb43ef75a0dbf3a0d26381af4eba4a98eaa9b4e6a";
    const bobsk   = "5dab087e624a8a4b79e17f8b83800ee66f3bb1292618b6fd1c2f8b27ff88e0eb";
    const bobpk   = "de9edb7d7b7dc1b4d35b61c2ece435373f8343c85b78674dadfc7e146f882b4f";
    const small_order_p = "e0eb7a7c3b41b8ae1656e3faf19fc46ada098deb9c32b1fd866205165f49b800";
    const sharedKey = "4a5d9d5ba4ce2de1728e3bf480350f25e07e21c947d19e3376f09b3c1e161742";

    const testsSMB = [
      {n: alicesk1,q: alicepk},
      {n: bobsk,q: bobpk}
    ]
    const testsSM = [
      { n: alicesk1, p: bobpk, q: sharedKey},
      { n: bobsk, p: alicepk, q: sharedKey},
      { n: bobsk, p: this.bin2hex(this.hex2bin(alicepk).map((b,i) => i != 31 ? b : b ^ 0x80)), q: sharedKey},
      { n: bobsk, p: small_order_p, q: null}
    ]

    Promise.all(testsSMB.map(t => {
      return Sodium.crypto_scalarmult_base(Base64.fromByteArray(this.hex2bin(t.n)))
        .then(q => t.q === this.bin2hex(Base64.toByteArray(q)))
        .catch(e => {if (t.q == null) return true;throw e})
    }))
    .then(results => this.testPassed('crypto_scalarmult_base',results.find(t => t == false) == undefined?true:false))
    .catch((error) =>  this.testFailed('crypto_scalarmult_base',error))

    Promise.all(testsSM.map(t => {
      return Sodium.crypto_scalarmult(Base64.fromByteArray(this.hex2bin(t.n)),Base64.fromByteArray(this.hex2bin(t.p)))
        .then(q => t.q === this.bin2hex(Base64.toByteArray(q)))
        .catch(e => {if (t.q == null) return true;throw e})
    }))
    .then(results => this.testPassed('crypto_scalarmult',results.find(t => t == false) == undefined?true:false))
    .catch((error) =>  this.testFailed('crypto_scalarmult',error))
  }

  componentDidMount() {
    this.initTests([
      'crypto_scalarmult_base',
      'crypto_scalarmult'
    ])

    this._testScalarMult()

  }

}
