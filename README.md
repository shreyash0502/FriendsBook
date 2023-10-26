# FriendsBook
A network of friends | Baavalibuch

Tasklist:

- [x] Create a backend tier using ExpressJS.
- [x] Create a PWA using React that that accepts text input (ID), a photo, text input (friendID) and password, and sends it to the backend. Bonus : UI changes on interaction.

 The backend server should have the following functionalities -
- [x] Add the persons ID (A) to mongodb
- [x] Add the friendID (B) to the friend list in the person
- [x] Store the encrypted photo in a directory on the disc using multer (A)
- [x] Update friend's (B) friendList to include person (A)
- [ ] Implement auth so that A and B can't see each other's friends
      
- [x] Graph analysis (Hint - use NetworkX or write your own code)
- [ ] Count the number of nodes and the number of edges, and display the numbers.
- [ ] Then list degrees of all the nodes.
- [x] Bonus: Visualise the graph
- [ ] Bonus : Messaging between person A and B
- [x] Create a new repo on GitHub which has all the commits.
- [ ] Bonus : Containerise each of the components (Node frontend, Node backend, Django Backend) on independent docker containers
