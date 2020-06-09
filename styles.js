
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
   //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding:5
  },

  testContainer: {
    flex: 1,
    flexDirection:'row',
    padding:5
  },

  testLabel: {
    flex:4,
    textAlign: 'left',
    color: '#333333',
  },

  testResult: {
    flex:1,
    textAlign: 'center',
  },

  testError: {
    flex:1,
    padding:5,
    textAlign: 'left',
    color: 'red',
  },

  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },

  instructions: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  },

})
