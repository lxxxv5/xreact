function workLoopSync(root) {}

function renderRootSync(root) {
  workLoopSync(root)
}
function commitRoot(root) {}

function performSyncWorkOnRoot(root) {
  renderRootSync(root)
  commitRoot(root)
}

exports.performSyncWorkOnRoot = performSyncWorkOnRoot
