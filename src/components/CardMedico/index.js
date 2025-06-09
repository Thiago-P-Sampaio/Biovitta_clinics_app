import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Usando FontAwesome5
import { cardMedicoStyles } from './styles';

export default function CardMedico({ medico, onView, onEdit, onDelete }) {
  const displayedEspecialidades = medico.especialidades
    ?.map(e => e.nome)
    .slice(0, 3)
    .join(', ');

  const remainingEspecialidadesCount = medico.especialidades
    ? medico.especialidades.length - (displayedEspecialidades ? displayedEspecialidades.split(', ').length : 0)
    : 0;

  return (
    <TouchableOpacity onPress={onView} style={cardMedicoStyles.cardMedico}>
      <View style={cardMedicoStyles.cardMedicoImageContainer}>
        <Image
          source={{ uri: medico.imgUrl || 'https://via.placeholder.com/150/6a1b9a/ffffff?text=Médico' }}
          // alt={`Foto de ${medico.nome}`} // REMOVIDO: 'alt' não existe em Image do RN
          accessibilityLabel={`Foto de ${medico.nome}`} // Adicionado para acessibilidade
          style={cardMedicoStyles.cardMedicoImg}
        />
      </View>

      <Text style={cardMedicoStyles.cardMedicoName}>{medico.nome}</Text>
      <Text style={cardMedicoStyles.cardMedicoDetail}>
        <Icon name="envelope" style={cardMedicoStyles.cardMedicoIcon} />
        {medico.email}
      </Text>
      <Text style={cardMedicoStyles.cardMedicoDetail}>
        <Icon name="phone" style={cardMedicoStyles.cardMedicoIcon} />
        <Text>Telefone: {medico.telefone}</Text>
      </Text>
      {medico.especialidades && medico.especialidades.length > 0 && (
        <Text style={cardMedicoStyles.cardMedicoSpecialties}>
          <Icon name="tags" style={cardMedicoStyles.cardMedicoIcon} />
          <Text style={cardMedicoStyles.cardMedicoLabel}>Especialidades:</Text> {displayedEspecialidades}
          {remainingEspecialidadesCount > 0 && (
            <Text style={cardMedicoStyles.cardMedicoMoreSpecialties}>... (+{remainingEspecialidadesCount})</Text>
          )}
        </Text>
      )}

      <View style={cardMedicoStyles.cardMedicoActions}>
        {typeof onEdit === 'function' && (
          <TouchableOpacity
            onPress={() => onEdit(medico)}
            style={[cardMedicoStyles.cardMedicoButton, cardMedicoStyles.cardMedicoEditButton]}
            accessibilityLabel={`Editar médico ${medico.nome}`} // Adicionado para acessibilidade
          >
            <Text style={{ color: 'white' }}>Editar</Text>
          </TouchableOpacity>
        )}

        {typeof onDelete === 'function' && (
          <TouchableOpacity
            onPress={() => onDelete(medico)}
            style={[cardMedicoStyles.cardMedicoButton, cardMedicoStyles.cardMedicoDeleteButton]}
            accessibilityLabel={`Excluir médico ${medico.nome}`} // Adicionado para acessibilidade
          >
            <Text style={{ color: 'white' }}>Excluir</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}