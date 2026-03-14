export interface Book {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  status: 'want-to-read' | 'reading' | 'completed';
  createdAt: string;
}