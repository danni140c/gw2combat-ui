import React from 'react';
import JsonOutput from './JsonOutput.component';

type Props = {
  jsonInput: any;
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
  const { jsonInput } = props;
  const [json, setJson] = React.useState('');

  const containerFunctions = {
    downloadJson: downloadJson(json),
  };

  const containerProps = {
    json,
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setJson(JSON.stringify(jsonInput, null, 2));
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [jsonInput]);

  return <JsonOutput {...containerProps} {...containerFunctions} />;
};

export default JsonOutputContainer;
