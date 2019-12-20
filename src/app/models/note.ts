import { Photo } from './photo';
import { Comment } from './comment';
import { Like } from './like';

export class Note {

  id: number;
  title: string;
  description: string;
  text: string;
  likeCount: number;
  onModifiedUsername: string;
  onModified: string;
  categoryId: number;
  userId: number;
  isDraft: boolean;
  mainPhotourl: string;
  photos: string[];
  comments: Comment[];
  tags: string[];
  likes: Like[];
}
