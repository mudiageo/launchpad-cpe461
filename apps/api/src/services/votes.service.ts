import { votesRepo } from '../repositories/votes.repository';

export async function toggleVote(userId: string, ideaId: string) {
  return votesRepo.toggle(userId, ideaId);
}