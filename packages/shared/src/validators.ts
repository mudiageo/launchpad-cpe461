import * as v from 'valibot';

export const CreateIdeaSchema = v.object({
  title:       v.pipe(v.string(), v.minLength(5), v.maxLength(120)),
  description: v.pipe(v.string(), v.minLength(20), v.maxLength(2000)),
  categoryId:  v.pipe(v.string(), v.uuid()),
});

export const CreateCommentSchema = v.object({
  body: v.pipe(v.string(), v.minLength(2), v.maxLength(500)),
});

export const RegisterSchema = v.object({
  email:    v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
  name:     v.pipe(v.string(), v.minLength(2), v.maxLength(80)),
});

export type CreateIdeaInput    = v.InferOutput<typeof CreateIdeaSchema>;
export type CreateCommentInput = v.InferOutput<typeof CreateCommentSchema>;
