// creation of the User, Category and JournalEntry Model Inetrfaces to define the types
export interface UserInterface {
  id: number;
  username: string;
  password: string;
}

export interface CategoryInterface {
  id: number;
  name: string;
  color: string;
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
