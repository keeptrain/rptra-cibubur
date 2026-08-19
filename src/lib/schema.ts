import { pipe, string, maxLength, minLength, trim, uuid } from "valibot";

export function uuidV7Schema() {
  return pipe(
    string("ID harus berupa teks."),
    trim(),
    uuid(),
    maxLength(36, "ID  maksimal 36 karakter."),
    minLength(36, "ID  minimal 36 karakter."),
  );
}
