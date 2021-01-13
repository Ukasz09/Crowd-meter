# :bar_chart: Queue Indidator [![License](https://img.shields.io/badge/licence-MIT-blue)](https://choosealicense.com/licenses/mit/) [![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)](https://github.com/Ukasz09/Printer-Simulator-Game)

Application visualizate how many peoples is already in given public utility objects. Project is composed of 4 parts:

- **Api** _(Python, Flask, PyMongo)_
  Provide endpoints for front-end web applications
- **Data-generator** _(Python, PyMongo)_
  Fetch amenities data (using overpass-api), parse it and adopt to fit given model requirements. After that save it in database collections
- **Flow-of-people-simulator** _(Python, PyMongo)_
  Scripts simulate database flow. Every **_x_** seconds (default=2) change amount of peoples for each of the saved public utility object
- **Front-end** _(Angular, Typescript, HTML, SCSS)_
  Front-end for application
  </br>

### Prerequisites

- **Front-end**

First of all, make sure that you have installed NodeJs - if not, you can download it from here:
`https://nodejs.org/en/download/`

Then install required prerequisites on your development machine:

`npm install --save`

I case of running application on dev server make sure that you have installed AngularCLI:

`npm install -g @angular/cli`

### Running application

- **Front-end**

`npm start` or `ng serve`

This will start a dev server. After that navigate to page `http://localhost:4200/`

- **Back-end**
  In order to run each of the back-end services, you can use wrapper scirpt `./run.sh` from main folder for each of the projecet or run file `main.py` / `app.py` manually

- **Database**
  Used database is mongoDB. For default it run on localhost but you can change that if you wich

### Screenshots

![alt text](https://raw.githubusercontent.com/Ukasz09/Queue-indicator-app/master/readmeImages/1.png)
![alt text](https://raw.githubusercontent.com/Ukasz09/Queue-indicator-app/master/readmeImages/2.png)
![alt text](https://raw.githubusercontent.com/Ukasz09/Queue-indicator-app/master/readmeImages/3.png)
![alt text](https://raw.githubusercontent.com/Ukasz09/Queue-indicator-app/master/readmeImages/4.png)
![alt text](https://raw.githubusercontent.com/Ukasz09/Queue-indicator-app/master/readmeImages/5.png)
![alt text](https://raw.githubusercontent.com/Ukasz09/Queue-indicator-app/master/readmeImages/6.png)

### TODO's

- heroku app deployement
- python requirements file

### 📫 Contact

Created by <br/>
<a href="https://github.com/Ukasz09" target="_blank"><img src="https://avatars0.githubusercontent.com/u/44710226?s=460&v=4"  width="100px;"></a>
<br/> gajerski.lukasz@gmail.com - feel free to contact me! ✊

https://raw.githubusercontent.com/Ukasz09/Queue-indicator-app/master/readmeImages/1.png
https://raw.githubusercontent.com/Ukasz09/Queue-indicator-app/master/readmeImages/2.png
