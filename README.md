# :signal_strength: Crowd Meter [![License](https://img.shields.io/badge/licence-MIT-blue)](https://choosealicense.com/licenses/mit/) [![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)](https://github.com/Ukasz09/Printer-Simulator-Game)

### Description

Application visualize how many people are currently in given objects of general public utility. Project is composed of 4 parts:

| Front-end                       | API                             | Data-generator                                                                                                                            | Flow-of-people-simulator                                                                                         |
| ------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Front-end for application       | Provide endpoints for front-end | Fetch amenities data (using overpass-api), parse it and adopt to fit given model requirements. After that save it in database collections | Simulate crowd. Every **_x_** seconds _(default=2)_ change amount of people for each of the saved public utility |
| Angular, TypeScript, HTML, SCSS | Python, Flask                   | Python, PyMongo                                                                                                                           | Python, PyMongo                                                                                                  |

---

### Prerequisites

- **Front-end**

  First of all, make sure that you have installed NodeJs - if not, you can download it from here:
  `https://nodejs.org/en/download/`

  Then install required prerequisites on your development machine:

  `npm install --save`

  I case of running application on dev server make sure that you have installed AngularCLI:

  `npm install -g @angular/cli`

---

### Running application

- **Front-end**

  `npm start` or `ng serve`

  This will start a dev server. After that navigate to page `http://localhost:4200/`

- **Back-end**
  In order to run each of the back-end services, you can use wrapper scirpt `./run.sh` from main folder for each of the projecet or run file `main.py` / `app.py` manually

---

### Demo

![Demo GIF](https://raw.githubusercontent.com/Ukasz09/Queue-indicator-app/master/readmeImages/demo.gif)
![](https://raw.githubusercontent.com/Ukasz09/Queue-indicator-app/master/readmeImages/1.png)
![](https://raw.githubusercontent.com/Ukasz09/Queue-indicator-app/master/readmeImages/2.png)
![](https://raw.githubusercontent.com/Ukasz09/Queue-indicator-app/master/readmeImages/3.png)
![](https://raw.githubusercontent.com/Ukasz09/Queue-indicator-app/master/readmeImages/4.png)
![](https://raw.githubusercontent.com/Ukasz09/Queue-indicator-app/master/readmeImages/5.png)

---

### 📫 Contact

| Created by                                                                                                                                       | gajerski.lukasz@gmail.com        |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| <a href="https://github.com/Ukasz09" target="_blank"><img src="https://avatars0.githubusercontent.com/u/44710226?s=460&v=4"  width="100px;"></a> | Feel free to contact me! :punch: |
