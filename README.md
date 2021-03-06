# Cup O Joe
![Badge of Honor](https://img.shields.io/badge/Built%20at-Fullstack-green.svg?style=flat-square)
> Testing students in a fullstack environment

We made this application after seeing how much a hassle it was for instructors at Fullstack Academy of Code to run assessments for each cohort. The process involved cloning their Github repository and running the tests on our local computers. We decided we could do better and run the tests written by the instructors remotely.

You can find the Github page for the docker server at https://github.com/vincenzomerolla/cupojoe-docker.

## Table of Contents

- [Summary](#summary)
- [Examples](#examples)
- [Usage](#usage)
- [Installation](#installation)
- [Known Bugs](#known-bugs)
- [Contributors](#contributors)
- [License](#license)

## Summary

We run all tests securely using Docker images. Whenever an instructor creates a test, we spawn a new Docker image off a remote base MEAN stack Docker repository and initially populate it with an associated Github repository. Afterwards, when users begin running their individual assessments, we build Docker containers off the base test image, run their unique files, then immediately destroy those containers. Lastly, once the test is completed, we delete the Docker image to free up space for future tests. This whole process allows us to emulate a full stack without running any potentially malicous code on our own server.

## Examples
### Demo

There is no current demo *yet*.

### Screenshot
![Landing Page](https://farm8.staticflickr.com/7641/16826077710_e6ea21a0cd_o.png)
_Above: Landing Page_

![Dashboard Page](https://farm8.staticflickr.com/7654/16806259977_af27628903_o.png)
_Above: Sample Dashboard View_

![Test Page](https://farm9.staticflickr.com/8686/16987672386_d80a87f507_o.png)
_Above: Sample Test View_


## Usage

1.  Make sure that you have MongoDB installed correctly and running on your machine

    ```bash
    mongod
    ```
2. Serve the application with `grunt`

    ```bash
    grunt build
    ```
3. Start the server locally with `npm`

    ```bash
    npm start
    ```
     
## Installation

1. Clone the repository

  ```bash
  git clone https://github.com/vincenzomerolla/cupojoe.git
  ```
2.  Install dependencies

  ```bash
  npm install    # installs node packages
  bower install  # installs bower dependencies
  ```

__Note:__ If you encounter errors in the installation process for npm, it is recommended that you try running the install command with `sudo`

## Known Bugs

- Sockets haven't been set up yet.
- Group edit forms in a modal incorrectly line up.
- Output occasionally will show Docker errors.
- Jasmine tests sometimes have trouble dealing with "" quotes vs. '' quotes.

## Contributors
* __Colin VanLang__ - [LinkedIn](https://www.linkedin.com/in/colinvanlang) | [GitHub](https://github.com/covlllp)
* __Vincenzo Merolla__ - [LinkedIn](https://www.linkedin.com/in/vincenzomerolla) | [GitHub](https://github.com/vincenzomerolla)

## License

This projected is licensed under the terms of the [MIT license](/LICENSE)