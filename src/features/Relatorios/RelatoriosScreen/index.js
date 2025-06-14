import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Platform, Linking } from 'react-native';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { relatoriosScreenStyles } from './styles';
import * as FileSystem from 'expo-file-system'; // Para gerenciar arquivos
import * as IntentLauncher from 'expo-intent-launcher'; // Para Android, abrir arquivo
import * as WebBrowser from 'expo-web-browser'; // Para iOS, abrir URL

export default function RelatoriosScreen() {
  const { user } = useAuth();
  const [dataHoraAtual, setDataHoraAtual] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR');
    const horaFormatada = agora.toLocaleTimeString('pt-BR');
    setDataHoraAtual(`${dataFormatada} ${horaFormatada}`);
  }, []);

  // Bloqueia acesso se não for admin
  if (!user || user.role.toLowerCase() !== 'admin') {
    return (
      <View style={relatoriosScreenStyles.container}>
        <Text style={relatoriosScreenStyles.title}>Acesso negado</Text>
        <Text style={relatoriosScreenStyles.infoText}>Você não tem permissão para acessar esta página.</Text>
      </View>
    );
  }

  async function baixarRelatorio() {
    setLoading(true);
    setError('');
    try {
      const filename = 'relatorio_consultas.pdf';
      const fileUri = FileSystem.documentDirectory + filename; // Caminho para salvar no dispositivo

      // 1. Faz a requisição, esperando um ArrayBuffer para dados binários
      const response = await api.get('api/relatorios/consultas', {
        responseType: 'arraybuffer', // Alterado para 'arraybuffer'
      });

      // 2. Converte o ArrayBuffer recebido para uma string Base64
      // Esta é a forma padrão de converter ArrayBuffer para Base64 em ambientes de navegador/React Native
      const base64data = btoa(
        new Uint8Array(response.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      // 3. Salva o arquivo Base64 no sistema de arquivos local
      await FileSystem.writeAsStringAsync(fileUri, base64data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 4. Abre o arquivo com um visualizador apropriado
      if (Platform.OS === 'android') {
        const cUri = await FileSystem.getContentUriAsync(fileUri);
        await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
          data: cUri,
          flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
          type: 'application/pdf',
        });
      } else { // iOS
        WebBrowser.openBrowserAsync(fileUri); // Abre no navegador interno, que pode exibir PDFs
      }

      Alert.alert('Sucesso', `Relatório "${filename}" baixado e aberto.`);

    } catch (err) {
      console.error('Erro ao baixar relatório:', err.response?.data || err.message || err);
      setError('Erro ao baixar relatório. Tente novamente.');
      Alert.alert('Erro', 'Erro ao baixar relatório. Verifique sua conexão ou permissões. Detalhes: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={relatoriosScreenStyles.container}>
      <Text style={relatoriosScreenStyles.title}>Relatórios</Text>
      <Text style={relatoriosScreenStyles.infoText}>
        <Text style={{ fontWeight: 'bold' }}>Usuário:</Text> {user.usuario}
      </Text>
      <Text style={relatoriosScreenStyles.welcomeText}>Seja bem-vindo(a) à área de relatórios!</Text>
      <Text style={relatoriosScreenStyles.infoText}>
        <Text style={{ fontWeight: 'bold' }}>Data e horário atual:</Text> {dataHoraAtual}
      </Text>

      <TouchableOpacity
        style={relatoriosScreenStyles.downloadButton}
        onPress={baixarRelatorio}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={relatoriosScreenStyles.downloadButtonText}>Baixar Relatório de Consultas</Text>
        )}
      </TouchableOpacity>

      {error && <Text style={relatoriosScreenStyles.errorText}>{error}</Text>}
    </View>
  );
}