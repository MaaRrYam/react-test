import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Search} from '@/assets/icons';
import {SearchButtonProps} from '@/interfaces';
const SearchButton: React.FC<SearchButtonProps> = ({style, onPress}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Search />
    </TouchableOpacity>
  );
};

export default SearchButton;
