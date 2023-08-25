// Placeholder to ideate on how to schedule tasks for python workers
class TaskScheduler {
  files: string[];
  initialFileCount: number;

  constructor(initialFileCount: number) {
    this.files = [];
    this.initialFileCount = initialFileCount;
  }

  // Add files to the list of files to be processed
  addFiles(files: string[]) {
    this.files.concat(files);
    this.scheduleTasks();
  }

  // Create tasks for python workers
  scheduleTasks() {
    while (this.files.length >= 5) {
      let batch = this.files.slice(this.files.length - 5, this.files.length);
      this.files = this.files.slice(0, this.files.length - 5);
      // Send batch to python workers
    }
    if (this.workersAreNotBusy()) {
      if (this.files.length === 1) {
        // Send file, initialFileCount to python worker
      } else if (this.files.length > 1 && this.files.length < 5) {
        let batch = this.files;
        this.files = [];
        // Send files to python worker
      }
    }
  }

  // Placeholder
  workersAreNotBusy(): boolean {
    // workers are all idle
    return true;
  }
}
