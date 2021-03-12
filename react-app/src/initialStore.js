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
      comment: {
        currentId: null,
        active: false
      }
    },
    snackBar: {
      open: false,
      message: null,
      severity: 'success'
    }
  }
}

export default initialStore;
