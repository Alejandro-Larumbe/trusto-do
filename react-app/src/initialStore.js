const initialStore = {
  lists: [],
  task: {
    comments: {},
    list: {
      title: ''
    }
  },
  ui: {
    dark: false,
    task: {
      currentId: null,
      type: ''
    },
    openTask: {
      open: false,
      taskId: '',
    },
    snackBar: {
      open: false,
      message: null,
      severity: 'success'
    },
    list: {
      type: '',
      currentId: null

    }
  }
}
export default initialStore;
