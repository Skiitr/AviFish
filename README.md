### Project: AviFish
#### Author: Dan Gallagher
##### License: MIT

This application is created to generate links by reaching out to a Perforce Web server grabbing the files from a specified changelist and printing out the result as a list so links can be created to all the files on that changelist at that changelist version of the file.

Currently, this is coded to look for two servers that are located inside Avidyne, Corp. If you were to replace the buttons called Lincoln and Melbourne, and the base URL that is associated with those buttons, this could be remapped to any server.

The way this web app works is you choose a repository to query, a chagelist number, and a type as "text" to preview the changelist information, or as "XML" to see the XML data. Click "open" and another window with this information will open. If open XML and highlight from the open to close ```<perforce></perforce>``` tags and copy and paste this into the application's translate box, you can then click "generate" and it will give you a web link to the files that are on that changelist.
