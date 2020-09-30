import React, { useEffect, useState } from "react"
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native'
import Sodium from 'react-native-sodium'

import { styles } from './styles'
import RandomDataTests from './SodiumTests/RandomDataTests'
import SecretKeyCryptographyTests from './SodiumTests/SecretKeyCryptographyTests'
import PublicKeyCryptographyTests from './SodiumTests/PublicKeyCryptographyTests'
import PasswordHashingTests from './SodiumTests/PasswordHashingTests'
import AdvancedTests from './SodiumTests/AdvancedTests'

export default function YourApp() {

  const [sodiumVersion, setSodiumVersion] = useState("")
  const [selectedTest, setSelectedTest] = useState(0)

  useEffect(() => {
    Sodium.sodium_version_string()
      .then((version) => setSodiumVersion(version))
      .catch((error) => this._handleError(error))
  },[])

  return (
    <SafeAreaView style={{flex:1}}>
        <View>
          <Text style={[styles.header,{marginTop: 60}]}>Salted React Native!</Text>
          <Text style={styles.header}>{sodiumVersion}</Text>
        </View>
        {selectedTest == 0 &&
          <View>
            <Button onPress={() => setSelectedTest(1)} title="Random data generation"/>
            <Button onPress={() => setSelectedTest(2)} title="Secret-key cryptography"/>
            <Button onPress={() => setSelectedTest(3)} title="Public-key cryptography"/>
            <Button onPress={() => setSelectedTest(4)} title="Password Hashing"/>
            <Button onPress={() => setSelectedTest(5)} title="Advanced"/>
          </View>
        }
        <View style={{flex:1}}>
          {selectedTest == 1 && <RandomDataTests/> }
          {selectedTest == 2 && <SecretKeyCryptographyTests/> }
          {selectedTest == 3 && <PublicKeyCryptographyTests/> }
          {selectedTest == 4 && <PasswordHashingTests/> }
          {selectedTest == 5 && <AdvancedTests/> }

        </View>
        {selectedTest != 0 &&
          <View>
            <Button onPress={() => setSelectedTest(0)} title="Clear"/>
          </View>
        }
    </SafeAreaView>
  )
}
