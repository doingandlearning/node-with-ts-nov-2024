// Create the Event Emitter
// Emitter send out events (emit)

// Attach to listen to those events

// http
import { EventEmitter } from "node:events";

const fileUploaded = new EventEmitter();

enum FileUploadEvent {
  UploadStarted = "uploadstarted",
  UploadCompleted = "uploadcompleted",
  UploadPaused = "uploadpaused",
  UploadError = "uploaderror",
}

/**
 * Event listeners - handlers!
 */

fileUploaded.on(FileUploadEvent.UploadStarted, (filename: string) => {
  console.log(`Upload started. Filename: ${filename}`);
  startProgressTracker();
});

fileUploaded.on(FileUploadEvent.UploadPaused, () => {
  saveUploadState();
});

fileUploaded.on(FileUploadEvent.UploadCompleted, () => {
  console.log("Upload completed successfully!");
  cleanupTemporaryFiles();
  sendCompletionNotification();
});

fileUploaded.on(FileUploadEvent.UploadError, (error: Error) => {
  console.error("An error occurred during file upload:", error.message);
  logError(error);
  retryUpload();
});

/**
 *
 *Helper functions
 */

function startProgressTracker() {
  console.log("Progress tracker started.");
  // Simulate updating progress
}

function saveUploadState() {
  console.log("Upload state saved. Resume when ready.");
}

function cleanupTemporaryFiles() {
  console.log("Temporary files cleaned up.");
}

function sendCompletionNotification() {
  console.log("User has been notified about the upload completion.");
}

function logError(error: Error) {
  console.error("Logging error for debugging:", error.message);
}

function retryUpload() {
  console.log("Retrying upload in 5 seconds...");
  setTimeout(() => {
    console.log("Retrying now...");
    fileUploaded.emit(FileUploadEvent.UploadStarted); // Retry logic can go here
  }, 5000);
}

/**
 * Client code
 */
fileUploaded.emit(FileUploadEvent.UploadStarted, "file.txt");
fileUploaded.emit(FileUploadEvent.UploadPaused);
fileUploaded.emit(FileUploadEvent.UploadStarted, "file.txt");
fileUploaded.emit(FileUploadEvent.UploadCompleted);
fileUploaded.removeAllListeners();
console.log("Listeners have all been removed .... ");
// Register listeners setup()

fileUploaded.emit(FileUploadEvent.UploadCompleted);

fileUploaded.on("error", (error: Error) => {
  console.log("Something went wrong.");
  console.log(error.message);
});

fileUploaded.emit("thiseventdoesnotexist");
fileUploaded.emit("error", new Error("The file is too big"));
