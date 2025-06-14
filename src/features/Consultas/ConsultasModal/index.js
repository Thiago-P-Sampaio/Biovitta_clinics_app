import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, ScrollView, Platform, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { consultaModalStyles } from './styles'; 
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function ConsultaModal({ isOpen, onClose, onSubmit, initialData, medicos, pacientes, isEdit, userRole }) {
  const [form, setForm] = useState({
    medicoId: '',
    pacienteId: '',
    dataConsulta: '',
  });
  const [medicoEspecialidade, setMedicoEspecialidade] = useState(''); 
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false); 
  const [dateForPicker, setDateForPicker] = useState(new Date());

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        const medicoSelecionado = medicos.find(m => m.nome === initialData.medico);
        const pacienteSelecionado = pacientes.find(p => p.nome === initialData.paciente);

        const initialDateObj = initialData.dataConsulta ? new Date(initialData.dataConsulta) : new Date();
        const formattedInitialDate = initialDateObj.toISOString().slice(0, 16);

        setForm({
          medicoId: medicoSelecionado ? medicoSelecionado.crm : '',
          pacienteId: pacienteSelecionado ? pacienteSelecionado.pacienteId : '',
          dataConsulta: formattedInitialDate,
        });
        setMedicoEspecialidade(medicoSelecionado?.especialidades || '');
        setDateForPicker(initialDateObj);
      } else {
        setForm({
          medicoId: '',
          pacienteId: '',
          dataConsulta: '',
        });
        setMedicoEspecialidade('');
        setDateForPicker(new Date());
      }
    }
  }, [isOpen, initialData, medicos, pacientes]);

  function handleMedicoChange(itemValue) {
    setForm(prev => ({ ...prev, medicoId: itemValue }));
    const medico = medicos.find(m => m.crm === itemValue);
    setMedicoEspecialidade(medico?.especialidades || '');
  }

  function handleChange(name, value) {
    setForm(prev => ({ ...prev, [name]: value }));
  }

  const onDateSelect = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === 'set') {
      const currentDate = selectedDate || new Date();
      setDateForPicker(currentDate);
      if (Platform.OS === 'android') { // No Android, precisamos abrir o TimePicker separadamente
        setShowTimePicker(true);
      } else { 
        setShowTimePicker(true);
      }
    }
  };

  const onTimeSelect = (event, selectedTime) => {
    setShowTimePicker(false);
    if (event.type === 'set') {
      const currentDateTime = selectedTime || dateForPicker;
      setDateForPicker(currentDateTime);

      const year = currentDateTime.getFullYear();
      const month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDateTime.getDate().toString().padStart(2, '0');
      const hours = currentDateTime.getHours().toString().padStart(2, '0');
      const minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
      const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
      
      handleChange('dataConsulta', formattedDateTime);
    }
  };

  const handleCloseAndReset = () => {
    onClose();
  };

  function handleSubmit() {
    if (!form.medicoId || !form.dataConsulta) {
      Alert.alert('Erro de Validação', 'Por favor, selecione um médico e uma data/hora para a consulta.');
      return;
    }
    if (userRole !== 'paciente' && !form.pacienteId) {
        Alert.alert('Erro de Validação', 'Por favor, selecione um paciente para a consulta.');
        return;
    }

    onSubmit(form);
  }

  const isAdminOrMedico = userRole === 'admin' || userRole === 'medico';

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={handleCloseAndReset}
    >
      <View style={consultaModalStyles.modalOverlay}>
        <View style={consultaModalStyles.modalContent}>
          <TouchableOpacity onPress={handleCloseAndReset} style={consultaModalStyles.modalCloseButton} accessibilityLabel="Fechar">
            <Icon name="times" style={consultaModalStyles.modalCloseIcon} />
          </TouchableOpacity>

          <Text style={consultaModalStyles.modalTitle}>{isEdit ? 'Editar Consulta' : 'Adicionar Consulta'}</Text>

          <ScrollView 
            style={consultaModalStyles.scrollView} 
            contentContainerStyle={consultaModalStyles.formContentContainer} 
            showsVerticalScrollIndicator={false} // Opcional: esconder a barra de rolagem
            keyboardShouldPersistTaps="handled" // Importante para que toques fora dos inputs fechem o teclado
          >
            {isAdminOrMedico && (
              <>
                <Text style={consultaModalStyles.label}>Paciente*</Text>
                <View style={consultaModalStyles.pickerContainer}>
                  <Picker
                    selectedValue={form.pacienteId}
                    onValueChange={(itemValue) => handleChange('pacienteId', itemValue)}
                    style={consultaModalStyles.picker}
                    mode="dropdown"
                  >
                    <Picker.Item label="Selecione um paciente" value="" />
                    {pacientes.map(p => (
                      <Picker.Item key={p.pacienteId} label={String(p.nome)} value={p.pacienteId} />
                    ))}
                  </Picker>
                </View>
              </>
            )}

            <Text style={consultaModalStyles.label}>Médico*</Text>
            <View style={consultaModalStyles.pickerContainer}>
              <Picker
                selectedValue={form.medicoId}
                onValueChange={handleMedicoChange}
                style={consultaModalStyles.picker}
                mode="dropdown"
              >
                <Picker.Item label="Selecione um médico" value="" />
                {medicos.map(m => (
                  <Picker.Item key={m.crm} label={String(m.nome)} value={m.crm} />
                ))}
              </Picker>
            </View>

            <Text style={consultaModalStyles.label}>Especialidade do Médico</Text>
            <TextInput
              style={consultaModalStyles.input}
              value={medicoEspecialidade || 'N/A'}
              editable={false}
              selectTextOnFocus={false}
              placeholderTextColor="#999"
            />

            <Text style={consultaModalStyles.label}>Data e Hora da Consulta*</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={consultaModalStyles.input}>
              <Text style={form.dataConsulta ? { color: '#333' } : { color: '#999' }}>
                {form.dataConsulta ? new Date(form.dataConsulta).toLocaleString('pt-BR') : 'Selecionar Data e Hora'}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={dateForPicker}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'} // 'spinner' para iOS é mais consistente
                onChange={onDateSelect}
              />
            )}

            {showTimePicker && (
              <DateTimePicker
                value={dateForPicker}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onTimeSelect}
              />
            )}
          </ScrollView>

          <View style={consultaModalStyles.modalActions}>
            <TouchableOpacity onPress={handleCloseAndReset} style={[consultaModalStyles.btn, consultaModalStyles.btnCancel]}>
              <Text style={consultaModalStyles.btnCancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={[consultaModalStyles.btn, consultaModalStyles.btnSave]}>
              <Text style={consultaModalStyles.btnSaveText}>{isEdit ? 'Salvar' : 'Adicionar'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}