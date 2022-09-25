import React from 'react';

type Props = {
  json: string;
  downloadJson: () => void;
};

export const JsonOutput: React.FC<Props> = (props: Props) => {
  const { json, downloadJson } = props;

  return (
    <div onClick={downloadJson}>
      <pre>{json}</pre>
    </div>
  );
};

export default JsonOutput;
