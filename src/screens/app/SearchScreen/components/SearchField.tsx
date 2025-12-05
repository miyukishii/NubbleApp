import { Icon } from '../../../../components/Icon/Icon';
import { TextField } from '../../../../components/UI/TextField/TextField';

interface SearchFieldProps {
  searchString: string;
  setSearchString: (value: string) => void;
}

export function SearchField({ searchString, setSearchString }: SearchFieldProps) {
  return (
    <TextField
      value={searchString}
      onChangeText={setSearchString}
      placeholder="Digite sua busca"
      LeftComponent={(<Icon name="search" color="gray2" />)}
    />
  );
}
