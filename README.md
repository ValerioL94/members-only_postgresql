# <a href="">members-only</a> <- Live here!

Building a nodejs/express/postgresqlDB app where users can read and write posts.

Specifically:

- Unregistered users can only read anonymous messages.
- Registered users can write/read anonymous messages.
- Registered users with the status of club-member can write/read posts AND they can see authors' names and posts' titles.
- Registered users with the status of admin have the same privileges as club-members, additionally they can delete posts.
- This version uses postgresqlDB.
