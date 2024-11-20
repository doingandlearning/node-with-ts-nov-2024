### Implementing a Chat System with Node.js Event System

For this exercise, you'll be enhancing the provided starting code to create a fully functional chat system utilizing Node.js's `EventEmitter`. Your implementation will allow users to join or leave a chat, send messages, and view a list of users in the chat. Follow the detailed steps to build upon the existing `ChatSystem` class. Remember, there is a completed solution in the solution directory if you get stuck.

#### Implementation Steps

1. **Complete the User Joining Method**:
   Update the `join` method to add a user to the `users` array and emit a `user-joined` event. After a user joins, display the chat history to them.

2. **Complete the User Leaving Method**:
   Implement the `leave` method to remove a user from the `users` array and emit a `user-left` event.

3. **Complete the Send Message Method**:
   Flesh out the `sendMessage` method to format the message, add it to `chatHistory`, and emit a `message` event. Ensure that `chatHistory` does not exceed 10 messages.
   
4. **Complete the List Users Method**:
   Implement `listUsers` to emit an event displaying all current users.

5. **Register Event Listeners**:
   Add event listeners to your `ChatSystem` instance for `user-joined`, `user-left`, `message`, and `list-users`. These should handle the respective events and provide appropriate console output.

6. **Test the Chat System**:
   Using the provided CLI, test your chat system's functionality by simulating users joining, leaving, sending messages, and listing users.

7. **Handle Errors**:
   Implement error handling within your methods and emit an `error` event if any issues occur. Register an `error` event listener to log these errors.

 
#### Bonus Challenges

1. **Private Messaging**: Extend the `sendMessage` method to support sending private messages to a specific user.
   
2. **Persistent Chat History**: Implement a mechanism to store the chat history, potentially using a file system or database.
   
3. **Interactive CLI**: Enhance the CLI to be more user-friendly and support more complex commands.

By completing this exercise, you will have a chat system that not only performs the basic functionalities but also adheres to good practices by handling errors and providing a user-friendly interface. Remember to test each feature thoroughly and ensure that your event listeners are correctly responding to the emitted events.