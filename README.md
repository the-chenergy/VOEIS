# VOEIS

#### https://voeis.pythonanywhere.com

## Overview
Visualization of the Online Encylodpedia of Integer Sequences (VOEIS) aims to visualize integer sequences for analaysis purposes. We use the [OEIS](https://oeis.org) database for our project.

If you want to learn more, check out [this video](https://www.youtube.com/watch?v=h8mhWaJFFLM):

[![](https://img.youtube.com/vi/h8mhWaJFFLM/0.jpg)](https://youtu.be/h8mhWaJFFLM)

## Gallery

![image](https://user-images.githubusercontent.com/44916353/188030488-b68c5a17-3300-4f08-a404-c04e5e3c2523.png)

![image](https://user-images.githubusercontent.com/44916353/188030663-c8c9b137-97a4-47ae-8171-5fd3f79f12de.png)

![image](https://user-images.githubusercontent.com/44916353/188030680-a9f367c5-a828-4b61-9914-beee4a8b8839.png)



## Online Version

The application is currently hosted on PythonAnywhere:
https://voeis.pythonanywhere.com/

## Local Version
The local version requires you to host the database locally. Because of this, we recommend running this on a machine with at least 6GB of RAM.

To run our project locally, be sure to first clone our repo:

```bash
git clone https://github.com/DavidJMiller/VOEIS
```

Then, move into the VOEIS directory and build the database (this step may take a few minutes):

```bash
cd VOEIS
python data/build_voeis_db.py
```

After the database is built, run our application:

```bash
python run.py
```

The application should be available on http://0.0.0.0:6060 or [localhost:6060](localhost:6060). If the above does not work, you can also run the application with:

```bash
flask run
```

The applicaiton will be available on http://0.0.0.0:5000 or [localhost:5000](localhost:5000).

## Requirements

The applicaiton requires [Flask](https://flask.palletsprojects.com/en/1.1.x/) and [PycURL](http://pycurl.io/). The application also requires a working internet connection.
