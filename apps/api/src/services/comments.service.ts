import { commentsRepo } from '../repositories/comments.repository';
import { CreateCommentInput } from '@launchpad/shared';

export async function getComments(ideaId: string) {
  return commentsRepo.findByIdeaId(ideaId);
}

export async function createComment(
  input: CreateCommentInput,
  authorId: string,
  ideaId: string
) {
  return commentsRepo.create({ ...input, authorId, ideaId });
}

export async function deleteComment(commentId: string, requesterId: string) {
  const comment = await commentsRepo.findById(commentId);
  if (!comment) {
    const err: any = new Error('Comment not found');
    err.statusCode = 404;
    throw err;
  }
  if (comment.authorId !== requesterId) {
    const err: any = new Error('You can only delete your own comments');
    err.statusCode = 403;
    throw err;
  }
  await commentsRepo.deleteById(commentId);
}