import { z } from "zod";

export const uploadSchema = z.object({
  files: z
    .array(z.instanceof(File))       // expect an array of File objects
    .nonempty("Please upload at least one file"),
});
export type UploadSchema = z.infer<typeof uploadSchema>;