# 🏢 Intelligent Floor Plan Management System

### Real-Time Room and Floor Management with Advanced Features

---

## Overview
The *Intelligent Floor Plan Management System* is a web application designed to facilitate efficient management of floors and rooms within a building. It offers features for adding, updating, and deleting floors and rooms, as well as room booking recommendations based on availability and capacity.

![SocialVibe Overview](https://res.cloudinary.com/daex3gj8h/image/upload/v1729792548/home_gtljuf.jpg)

## Features
- 🏢 *Floor Management*: Admins can add, update, and delete floors in the system.
- 🏷 *Room Management*: Manage rooms with functionalities to add, update, and delete rooms, including specifications such as room number, capacity, and description.
  
### Version Control System (VCS)
#### Merkle Tree
- *What is it?*
  - A *Merkle Tree* is a data structure that creates a hash for a chunk of information and stores the hashes as leaf nodes.
  
- *Process of Implementation*:
  - *Hash Generation*: Each chunk of data (like room plans or configurations) is hashed to create a unique representation, stored as leaf nodes in the Merkle Tree.
  - *Parent Hash Calculation*: The hashes of child nodes are combined and hashed again to form the parent node, creating a hierarchy of hashes. This allows for efficient tracking of changes across the tree.
  - *Change Tracking*: Whenever a modification is made (e.g., updating room capacity or details), the Merkle Tree enables rapid verification of changes by comparing the affected hashes. This ensures that only the parts of the data structure that have changed need to be updated.
  
- *Why Implement Merkle Tree?*:
  - *Efficient Storage*: By using hashes to represent data, the system can reduce the amount of storage required. Only the hashes need to be stored instead of entire data sets.
  - *Fast Change Detection: The ability to track changes in **O(log n)* time complexity allows for quick updates and ensures data integrity. This is particularly important in a system that frequently modifies room and floor data.
  - *Security*: Hashes provide a layer of security, ensuring that data cannot be altered without detection. Any change in the data will result in a different hash, alerting administrators to potential issues.

### Room Suggestion
#### Binary Search
- *What is it?*
  - *Binary Search* is used to efficiently find rooms based on capacity requirements.

- *Process*:
  - For each booking requirement, the room with equivalent or just larger capacity is allocated using *Binary Search* with a time complexity of *O(log n)*.
  - When a room becomes unoccupied, the requirement equivalent or just smaller than the capacity is allocated using Binary Search, also with a time complexity of **O(log n)*.

## Technologies Used
- *Frontend*: React.js
- *Backend*: Node.js, Express.js
- *Database*: MongoDB
- *Authentication*: Auth0
- *Data Structures*: Merkle Tree, Binary Search
- *API*: RESTful APIs for client-server communication
