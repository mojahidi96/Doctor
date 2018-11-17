import { FormControl, FormGroup } from '@angular/forms';

const typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }
  typeCache[<string>label] = true;
  return <T>label;
}

export function trimValues<T>(collection: any): T {
  const localObject = {};
  for (const key in collection) {
    if (typeof (collection[key]) === 'string') {
      localObject[key] = collection[key].trim();
    }
  }
  return <T>localObject;
}

export function validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    }
  });
}
