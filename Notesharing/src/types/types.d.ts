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
}

interface NoteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  isCreate: boolean
  updateTitle: string,
  updateDescription: string,
  updateId: string
}

interface NoteAppProps {
  noteList: Array,
  loading: boolean;
}

interface Note {
  id: string;
  note: {
    title: string;
    description: string;
  };
}

interface SortingNote {
  id: string;
  createdAt: { seconds: number; nanoseconds: number };
  note: {
    title: string;
    description: string;
  };
}

