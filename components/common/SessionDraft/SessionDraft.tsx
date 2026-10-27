'use client';
import { useEffect } from 'react';
import { useFormikContext } from 'formik';

interface SessionDraftProps {
  storageKey: string;
  fields: string[];
}
export default function SessionDraft({
  storageKey,
  fields,
}: SessionDraftProps) {
  const { values } = useFormikContext<Record<string, string>>();
  useEffect(() => {
    const draft = Object.fromEntries(
      fields.map((field) => [field, values[field] ?? '']),
    );

    const isEmpty = Object.values(draft).every((value) => !value.trim());

    if (isEmpty) {
      sessionStorage.removeItem(storageKey);
      return;
    }

    sessionStorage.setItem(storageKey, JSON.stringify(draft));
  }, [values, fields, storageKey]);
  return null;
}
