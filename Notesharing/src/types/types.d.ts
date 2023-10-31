interface ISTATE {
  isModalOpen: boolean;
  notes: Array;
  title: string;
  description: string,
  error: string,
  loading: boolean
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
  title: string;
  description: string;
}