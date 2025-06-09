import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { searchBarStyles } from './styles';

export default function SearchBar({ onSearchChange }) {
  const [query, setQuery] = useState('');

  const handleChange = (value) => {
    setQuery(value);
    onSearchChange(value);
  };

  return (
    <View style={searchBarStyles.searchContainer}>
      <TextInput
        placeholder="Buscar..."
        value={query}
        onChangeText={handleChange} // Usa onChangeText para TextInput
        style={searchBarStyles.searchInput}
        placeholderTextColor="#888"
      />
    </View>
  );
}