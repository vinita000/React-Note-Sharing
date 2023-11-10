interface ISTATE {
  isModalOpen: boolean;
  notes: Array;
  title: string;
  description: string,
  error: string,
  loading: boolean
  login: boolean,
  name: string,
  email: string,
  password: string,
  errorMessage: string
  isShared: boolean,
  updatedId: string,
  updatedText: string,
  updatedDescription: string,
  sharedId: string
  sharedBy: string
}

interface NoteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  isCreate: boolean
  updateTitle: string,
  updateDescription: string,
  updateId: string,
  noteId: string
}

interface NoteAppProps {
  noteList: Array,
  loading: boolean;
  fetchUpdatedList: Array
}

interface Note {
  id: string;
  sharedBy?: string; 
  note: {
    title: string;
    description: string;
  };
}

interface SortingNote {
  id: string;
  sharedBy?: string; 
  createdAt: { seconds: number; nanoseconds: number };
  note: {
    title: string;
    description: string;
  };
}


