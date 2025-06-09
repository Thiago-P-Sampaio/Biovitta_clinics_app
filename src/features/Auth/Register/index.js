import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importar DateTimePicker
import { registerPaciente } from '../../../services/authService';
import { registerStyles } from './styles';

export default function RegisterScreen() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    imgUrl: '',
    dataNascimento: '',
    senha: ''
  });
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para controlar visibilidade do picker

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // Fechar picker no iOS, manter aberto no Android (pode mudar para false para ambos se preferir)
    const currentDate = selectedDate || new Date();
    // Formata a data para YYYY-MM-DD
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    handleChange('dataNascimento', `${year}-${month}-${day}`);
  };


  const handleSubmit = async () => {
    setError('');
    // Validação básica antes de enviar
    if (!form.nome || !form.email || !form.telefone || !form.dataNascimento || !form.senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await registerPaciente(form);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Faça login para continuar.');
      navigation.navigate('Login');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao registrar. Tente novamente.';
      setError(errorMessage);
      Alert.alert('Erro de Registro', errorMessage);
    }
  };

return (
    <LinearGradient
      colors={['#6a1b9a', '#7c4dff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={registerStyles.bgGradient}
    >
      {/* CORREÇÃO: Adicione flex: 1 à ScrollView para ela ocupar todo o espaço vertical */}
      <ScrollView contentContainerStyle={registerStyles.scrollViewContent} style={{ flex: 1 }}>
        <View style={registerStyles.authBox}>
          <Text style={registerStyles.title}>Registrar-se</Text>
          <TextInput
            placeholder="Nome"
            value={form.nome}
            onChangeText={(text) => handleChange('nome', text)}
            style={registerStyles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Email"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
            style={registerStyles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Telefone"
            value={form.telefone}
            onChangeText={(text) => handleChange('telefone', text)}
            style={registerStyles.input}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="URL da Foto (opcional)"
            value={form.imgUrl}
            onChangeText={(text) => handleChange('imgUrl', text)}
            style={registerStyles.input}
            keyboardType="url"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />

          {/* Campo de Data de Nascimento usando TouchableOpacity e DateTimePicker */}
          {/* CORREÇÃO: Adicionar o componente Text para o label da Data de Nascimento */}
          <Text style={registerStyles.label}>Data de Nascimento*</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={registerStyles.input}>
            <Text style={form.dataNascimento ? { color: '#222' } : { color: '#999' }}>
              {form.dataNascimento || 'Selecione a Data'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={form.dataNascimento ? new Date(form.dataNascimento) : new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <TextInput
            placeholder="Senha"
            value={form.senha}
            onChangeText={(text) => handleChange('senha', text)}
            style={registerStyles.input}
            secureTextEntry
            placeholderTextColor="#999"
          />

          <TouchableOpacity onPress={handleSubmit} style={registerStyles.registerBtnWrapper}>
            <LinearGradient
              colors={['#6a1b9a', '#7c4dff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={registerStyles.registerBtn}
            >
              <Text style={registerStyles.registerBtnText}>Registrar</Text>
            </LinearGradient>
          </TouchableOpacity>
          {error ? <Text style={registerStyles.error}>{error}</Text> : null}
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={registerStyles.loginLink}>
            <Text style={registerStyles.loginLinkText}>Voltar ao Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}