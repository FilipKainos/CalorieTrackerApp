import * as React from 'react';
import { Facepile, IFacepilePersona, IFacepileProps } from '@fluentui/react/lib/Facepile';
import { Slider } from '@fluentui/react/lib/Slider';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { PersonaSize } from '@fluentui/react/lib/Persona';
import { facepilePersonas } from './FacepileExampleData';

export interface IFacepileBasicExampleProps {
  numberOfFaces?: number;
  numberFacesChanged?: (newValue: number) => void;
}

export const FacepileBasicExample: React.FunctionComponent<IFacepileBasicExampleProps> = (props) => {
  const [numberOfFaces, setNumberOfFaces] = React.useState(props.numberOfFaces || 3);
  const [personaSize, setPersonaSize] = React.useState(PersonaSize.size32);

  const onChange = (newValue: number): void => {
    setNumberOfFaces(newValue);
    if (props.numberFacesChanged) {
      props.numberFacesChanged(newValue);
    }
  };

  const onPersonaSizeChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    if (option) {
      setPersonaSize(option.key as PersonaSize);
    }
  };

  const personaSizeOptions: IDropdownOption[] = [
    { key: PersonaSize.size8, text: '8px' },
    { key: PersonaSize.size24, text: '24px' },
    { key: PersonaSize.size32, text: '32px' },
    { key: PersonaSize.size40, text: '40px' },
    { key: PersonaSize.size48, text: '48px' },
  ];

  const personas: IFacepilePersona[] = facepilePersonas.slice(0, numberOfFaces);

  const facepileProps: IFacepileProps = {
    personas,
    maxDisplayablePersonas: numberOfFaces,
    personaSize: personaSize,
  };

  return (
    <div className="msFacepileExample">
      <Facepile {...facepileProps} />
      <div className="control">
        <Slider
          label="Number of Personas:"
          min={1}
          max={5}
          step={1}
          value={numberOfFaces}
          showValue
          onChange={onChange}
        />
        <Dropdown
          label="Persona Size:"
          selectedKey={personaSize}
          options={personaSizeOptions}
          onChange={onPersonaSizeChange}
        />
      </div>
    </div>
  );
};
