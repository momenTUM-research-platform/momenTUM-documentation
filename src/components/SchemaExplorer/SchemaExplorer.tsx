import React, { useEffect, useState } from 'react';
import JsonView from '@uiw/react-json-view';

type SchemaExplorerProps = {
  schemaPath: string;
  title?: string;
};

export default function SchemaExplorer({ schemaPath, title = 'Schema' }: SchemaExplorerProps) {
  const [schema, setSchema] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(schemaPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load ${schemaPath}`);
        }
        return response.json();
      })
      .then((data) => {
        setSchema(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [schemaPath]);

  if (error) {
    return (
      <div style={{ border: '1px solid #ef4444', borderRadius: 12, padding: '1rem' }}>
        <strong>Could not load schema.</strong>
        <p>{error}</p>
      </div>
    );
  }

  if (!schema) {
    return <p>Loading schema...</p>;
  }

  return (
    <div
      style={{
        border: '1px solid var(--ifm-color-emphasis-200)',
        borderRadius: 16,
        padding: '1rem',
        background: 'var(--ifm-background-surface-color)',
        marginTop: '1rem',
      }}
    >
      <h3>{title}</h3>
      <JsonView value={schema as object} collapsed={2} displayDataTypes={false} />
    </div>
  );
}