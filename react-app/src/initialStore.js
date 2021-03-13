const initialStore = {
  lists: [],
  task: {
    comments: {},
    list: {
      title: ''
    }
  },
  ui: {
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
