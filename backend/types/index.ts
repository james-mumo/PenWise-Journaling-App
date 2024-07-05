export interface UserInterface {
  id: number;
  username: string;
  password: string;
}

export interface CategoryInterface {
  id: number;
  name: string;
  color: string;
  icon: string;
  userId: number;
  isEditable: boolean;
}

export interface JournalEntryInterface {
  id: number;
  title: string;
  content: string;
  category: string;
  date: Date;
  userId: number;
  categoryId: number;
}
