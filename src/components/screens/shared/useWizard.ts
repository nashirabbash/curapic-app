import { useState } from "react";

export interface WizardStep {
  tahap: number;
  [key: string]: unknown;
}

/**
 * State-wizard dipakai bersama SignUp & ForgotPassword: step index, nilai &
 * error per-langkah. Satu sumber kebenaran; perubahan kecil pada perilaku
 * wizard dikerjakan sekali, bukan di dua screen.
 */
export function useWizard<T extends WizardStep>(steps: readonly T[]) {
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<Record<number, string>>({});
  const [errors, setErrors] = useState<Record<number, string | undefined>>({});
  const step = steps[stepIndex];

  const setValue = (value: string) => {
    setValues((prev) => ({ ...prev, [step.tahap]: value }));
    setErrors((prev) => ({ ...prev, [step.tahap]: undefined }));
  };
  const setError = (tahap: number, message?: string | null) =>
    setErrors((prev) => ({ ...prev, [tahap]: message ?? undefined }));

  return { stepIndex, setStepIndex, step, values, setValue, errors, setError };
}
