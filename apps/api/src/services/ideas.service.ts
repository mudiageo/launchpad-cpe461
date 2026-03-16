import { ideasRepo } from '../repositories/ideas.repository';
import { CreateIdeaInput } from '@launchpad/shared';

export async function listIdeas(opts: Parameters<typeof ideasRepo.findAll>[0]) {
  return ideasRepo.findAll(opts);
}

export async function getIdea(id: string) {
  const idea = await ideasRepo.findById(id);
  if (!idea) {
    const err: any = new Error('Idea not found');
    err.statusCode = 404;
    throw err;
  }
  return idea;
}

export async function createIdea(input: CreateIdeaInput & { authorId: string }) {
  return ideasRepo.create(input);
}

export async function updateIdea(id: string, requesterId: string, input: Partial<CreateIdeaInput>) {
  const idea = await ideasRepo.findById(id);
  if (!idea) { const e: any = new Error('Not found'); e.statusCode = 404; throw e; }
  if (idea.author?.id !== requesterId) { const e: any = new Error('Forbidden'); e.statusCode = 403; throw e; }
  return ideasRepo.update(id, input);
}

export async function deleteIdea(id: string, requesterId: string) {
  const idea = await ideasRepo.findById(id);
  if (!idea) { const e: any = new Error('Not found'); e.statusCode = 404; throw e; }
  if (idea.author?.id !== requesterId) { const e: any = new Error('Forbidden'); e.statusCode = 403; throw e; }
  await ideasRepo.deleteById(id);
}