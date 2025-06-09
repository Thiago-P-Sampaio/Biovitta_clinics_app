import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import Modal from 'react-native-modal'; // Usar react-native-modal
import DateTimePicker from '@react-native-community/datetimepicker'; // Para input de data
import { Formik } from 'formik';
import * as Yup from 'yup';
import { pacienteModalStyles } from './styles';

// Esquema de validação DINÂMICO baseado no modo (edição ou criação)
const getValidationSchema = (isEdit) => {
  return Yup.object().shape({
    nome: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    telefone: Yup.string().required('Telefone é obrigatório'),
    imgUrl: isEdit
      ? Yup.string().url('URL da foto inválida').nullable()
      : Yup.string().url('URL da foto inválida').required('Foto é obrigatória'),
    dataNascimento: Yup.string().required('Data de nascimento é obrigatória'),
    senha: isEdit
      ? Yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').nullable()
      : Yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
  });
};

export default function PacienteModal({ isOpen, onClose, initialValues, onSubmit, isEdit }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formattedInitialDataNascimento = initialValues?.dataNascimento
    ? new Date(initialValues.dataNascimento).toISOString().split('T')[0]
    : '';

  const initialFormValues = initialValues
    ? {
        ...initialValues,
        dataNascimento: formattedInitialDataNascimento,
        senha: '',
      }
    : {
        nome: '',
        email: '',
        telefone: '',
        imgUrl: '',
        dataNascimento: '',
        senha: '',
      };

  const onDateChange = (event, selectedDate, setFieldValue) => {
    setShowDatePicker(Platform.OS === 'ios'); // Fecha o picker no iOS, mantém aberto no Android para facilitar seleção
    const currentDate = selectedDate || new Date();
    setFieldValue('dataNascimento', currentDate.toISOString().split('T')[0]);
  };

  return (
    <Modal isVisible={isOpen} onBackdropPress={onClose} style={pacienteModalStyles.overlay}>
      <View style={pacienteModalStyles.modal}>
        <Text style={pacienteModalStyles.modalTitle}>{isEdit ? 'Editar Paciente' : 'Cadastrar Paciente'}</Text>

        <Formik
          initialValues={initialFormValues}
          validationSchema={getValidationSchema(isEdit)}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const dataToSubmit = { ...values };
              if (isEdit && !dataToSubmit.senha) {
                delete dataToSubmit.senha;
              }
              if (!dataToSubmit.imgUrl) {
                dataToSubmit.imgUrl = null;
              }
              await onSubmit(dataToSubmit);
              resetForm();
              onClose();
            } catch (error) {
              console.error("Erro ao submeter formulário do paciente (no modal):", error.response?.data || error);
              Alert.alert('Erro', error.response?.data?.message || 'Erro ao salvar paciente. Verifique os dados.');
            } finally {
              setSubmitting(false);
            }
          }}
          enableReinitialize={true}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, isValid, dirty, setFieldValue }) => (
            <ScrollView contentContainerStyle={pacienteModalStyles.form}>
              <Text style={pacienteModalStyles.label}>Nome</Text>
              <TextInput
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
                value={values.nome}
                style={pacienteModalStyles.input}
              />
              {touched.nome && errors.nome && <Text style={pacienteModalStyles.errorText}>{errors.nome}</Text>}

              <Text style={pacienteModalStyles.label}>Email</Text>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={pacienteModalStyles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && <Text style={pacienteModalStyles.errorText}>{errors.email}</Text>}

              <Text style={pacienteModalStyles.label}>Telefone</Text>
              <TextInput
                onChangeText={handleChange('telefone')}
                onBlur={handleBlur('telefone')}
                value={values.telefone}
                style={pacienteModalStyles.input}
                keyboardType="phone-pad"
              />
              {touched.telefone && errors.telefone && <Text style={pacienteModalStyles.errorText}>{errors.telefone}</Text>}

              <Text style={pacienteModalStyles.label}>URL da Foto</Text>
              <TextInput
                onChangeText={handleChange('imgUrl')}
                onBlur={handleBlur('imgUrl')}
                value={values.imgUrl}
                style={pacienteModalStyles.input}
                keyboardType="url"
                autoCapitalize="none"
              />
              {touched.imgUrl && errors.imgUrl && <Text style={pacienteModalStyles.errorText}>{errors.imgUrl}</Text>}

              <Text style={pacienteModalStyles.label}>Data de Nascimento</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={pacienteModalStyles.input}>
                <Text>{values.dataNascimento || 'Selecione a Data'}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={values.dataNascimento ? new Date(values.dataNascimento) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => onDateChange(event, selectedDate, setFieldValue)}
                />
              )}
              {touched.dataNascimento && errors.dataNascimento && <Text style={pacienteModalStyles.errorText}>{errors.dataNascimento}</Text>}

              {!isEdit ? (
                <>
                  <Text style={pacienteModalStyles.label}>Senha</Text>
                  <TextInput
                    onChangeText={handleChange('senha')}
                    onBlur={handleBlur('senha')}
                    value={values.senha}
                    style={pacienteModalStyles.input}
                    secureTextEntry
                  />
                  {touched.senha && errors.senha && <Text style={pacienteModalStyles.errorText}>{errors.senha}</Text>}
                </>
              ) : (
                <>
                  <Text style={pacienteModalStyles.label}>Senha (deixe em branco para não alterar)</Text>
                  <TextInput
                    onChangeText={handleChange('senha')}
                    onBlur={handleBlur('senha')}
                    value={values.senha}
                    style={pacienteModalStyles.input}
                    secureTextEntry
                  />
                  {touched.senha && errors.senha && <Text style={pacienteModalStyles.errorText}>{errors.senha}</Text>}
                </>
              )}

              <View style={pacienteModalStyles.actions}>
                <TouchableOpacity onPress={onClose} style={pacienteModalStyles.cancelButton}>
                  <Text style={pacienteModalStyles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={pacienteModalStyles.saveButton}
                  disabled={isSubmitting || (isEdit && !dirty) || !isValid} // Desabilita o botão
                >
                  <Text style={pacienteModalStyles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </Formik>
      </View>
    </Modal>
  );
}