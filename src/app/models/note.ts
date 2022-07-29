import { Photo } from './photo';
import { Comment } from './comment';
import { Like } from './like';

export class Note {

  id: number;
  title: string;
  description: string;
  text: string;
<<<<<<< HEAD
=======
  rawText: string;
>>>>>>> 0fb8875 (angular 14)
  likeCount: number;
  onModifiedUsername: string;
  onModified: string;
  categoryId: number;
<<<<<<< HEAD
  userId: number;
=======
  userId: string;
>>>>>>> 0fb8875 (angular 14)
  isDraft: boolean;
  mainPhotourl: string;
  photos: string[];
  comments: Comment[];
  tags: string[];
  likes: Like[];
}
