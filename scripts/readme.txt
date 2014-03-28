HOW TO START

1. install http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/ and follow further instruction (create folder)
2. ad 	monogodb/bin to environment variables path
3. start mongodb by typing  C:\mongodb\bin\mongod.exe --dbpath d:\test\mongodb\data
4. type  "npm -g install" from directory server
5. type  "node server.js" from darts\server\ directory




HOW TO ORGANIZE DATABASE
1. type "mongo"  - it switches on console to manage mongo
2. type "use darts" - it switches to database "darts"
3. example data to mongodb helloworld: for (var i = 1; i <= 25; i++) db.hello.insert( { x : i } ) (typed from mongo console)





