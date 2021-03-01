import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Linking } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

export default function App() {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    setMessage(data)
  }

  const goToWhatsapp = () => {
    console.log(message)
    Linking.openURL(`${message}`)
    setScanned(false)
  }

  if (hasPermission === null) {
    return <Text>Perdindo por permissao para utilizar a camera</Text>
  }

  if (hasPermission === false) {
    return <Text>Sem acesso a camera</Text>
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
      {scanned && <Button title={`Ir para ${message}`} onPress={() => goToWhatsapp()} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
