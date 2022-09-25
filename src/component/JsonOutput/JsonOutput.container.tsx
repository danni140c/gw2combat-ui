import React from 'react';
import JsonOutput from './JsonOutput.component';

type Props = {
  json: string;
};

const downloadJson =
  (json: string): (() => void) =>
  (): void => {
    const element = document.createElement('a');
    const file = new Blob([json], {
      type: 'application/json',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'output.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

export const JsonOutputContainer: React.FC<Props> = (props: Props) => {
  const { json } = props;

  const containerFunctions = {
    downloadJson: downloadJson(json),
  };

  const containerProps = {
    json,
  };

  return <JsonOutput {...containerProps} {...containerFunctions} />;
};

export default JsonOutputContainer;
