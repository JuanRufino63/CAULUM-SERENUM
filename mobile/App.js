import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [url, setUrl] = useState('https://caulum-serenum.onrender.com');
  const [reading, setReading] = useState(null);
  const [status, setStatus] = useState('Aguardando conexão');

  async function refresh() {
    try {
      const response = await fetch(`${url.replace(/\/$/, '')}/readings/latest`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setReading(await response.json());
      setStatus('Conectado');
    } catch (error) {
      setStatus(`Erro de conexão: ${error.message}`);
    }
  }

  useEffect(() => {
    refresh();
    const timer = setInterval(refresh, 3000);
    return () => clearInterval(timer);
  }, [url]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>AlertaCalor</Text>
      <Text>Endereço da API:</Text>
      <TextInput style={styles.input} value={url} onChangeText={setUrl} autoCapitalize="none" autoCorrect={false} keyboardType="url" />
      <Button title="Atualizar agora" onPress={refresh} />
      <View style={styles.card}>
        <Text style={styles.label}>Temperatura</Text>
        <Text style={styles.value}>{reading?.temperature == null ? '--' : `${reading.temperature} °C`}</Text>
        <Text style={styles.label}>Umidade</Text>
        <Text style={styles.value}>{reading?.humidity == null ? '--' : `${reading.humidity} %`}</Text>
        <Text style={styles.label}>Nível de alerta</Text>
        <Text style={styles.value}>{reading?.level || '--'}</Text>
        <Text style={styles.label}>Alarme</Text>
        <Text style={styles.value}>{reading?.alarm_muted ? 'Silenciado' : 'Ativo / normal'}</Text>
        <Text style={styles.small}>Última leitura: {reading?.updated_at || 'Nenhuma'}</Text>
      </View>
      <Text style={styles.status}>{status}</Text>
      <Text style={styles.small}>Atualização automática a cada 3 segundos</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7fb', padding: 24, paddingTop: 65 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, color: '#183153' },
  input: { borderWidth: 1, borderColor: '#b8c5d4', backgroundColor: 'white', borderRadius: 8, padding: 12, marginVertical: 12 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 24, marginTop: 28, marginBottom: 20 },
  label: { fontSize: 16, color: '#52667b', marginTop: 12 },
  value: { fontSize: 32, fontWeight: 'bold', color: '#183153' },
  small: { fontSize: 12, color: '#63758a', marginTop: 12 },
  status: { fontSize: 16, fontWeight: '600' }
});
