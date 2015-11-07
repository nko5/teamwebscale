## Google-Fu

# Playing the game

go to http://teamwebscale.2015.nodeknockout.com/ on your desktop or mobile phone

you can play with friends in the same room, or on the other side of the world.

you can ever play with strangers by joining public games.

the best games have between 4 and 8 players

#### Start a game

Start a game, choose **public** or **private** game.

Once you start a game, tell your friends what the **game code** is, so they can join your game.

_or_

#### Join a game

Join a game, enter a **game code** _or_ select a public game to play with strangers.



# Development

### File Structure

Almost everything can be replaced, however, the `scripts/postinstall.js` and `package.json` files must be in tact.

`npm start` must **work** to start the app, because that's how modulus will serve the app.

### Running The App

~~~sh
npm start
~~~

### Running Tests

~~~sh
npm test
~~~

### Deploying the app with Docker

_from the teamwebscale project directory_

using the [docker-modulus](https://hub.docker.com/r/theremix/docker-modulus/) image

~~~sh
# pull the modulus docker image
docker pull theremix/docker-modulus

# run a temporary container, mounting the current directory to /app
docker run --rm -it --name teamwebscale_deploy -v "$PWD":/app -w /app theremix/docker-modulus

# (inside the container) login to modulus
/app # modulus login

# (inside the container) deploy to modulus
/app # modulus deploy

# (inside the container) view the most recent logs from modulus
/app # modulus project logs
~~~

## NKO Quick Start

_you probably don't need to do this, just follow the **running the app** instructions above_

~~~sh
# getting the code
git clone git@github.com:nko5/teamwebscale.git && cd ./teamwebscale/

# developing
npm install
npm start

# setup your modulus account
npm install -g modulus
modulus login

# deploying to Modulus (to http://teamwebscale.2015.nodeknockout.com/)
modulus deploy

# view the most recent logs from modulus
modulus project logs
~~~

Read more about this setup [on our blog][deploying-nko].

[deploying-nko]: http://www.nodeknockout.com/deploying

### Vote KO Widget

![Vote KO widget](http://f.cl.ly/items/1n3g0W0F0G3V0i0d0321/Screen%20Shot%202012-11-04%20at%2010.01.36%20AM.png)

Use our "Vote KO" widget to let from your app directly. Here's the code for
including it in your site:

~~~html
<iframe src="http://nodeknockout.com/iframe/teamwebscale" frameborder=0 scrolling=no allowtransparency=true width=115 height=25>
</iframe>
~~~

## Have fun!

If you have any issues, we're on IRC in #nodeknockout on freenode, email us at
<help@nodeknockout.com>, or tweet [@nodeknockout](https://twitter.com/nodeknockout).
