# Student-portal-es6

## • Setting up babel

#### 1. Create css(style.css), js(main.js) and index.html and 'dist'(a directory where babel will compile the es6 file to javascript file)
#### 2. Add babel as a transpiler for converting es6 to javascript.
      - npm init (add all intial info and save into package.json in your project)
      - npm install babel-cli babel-core --save-dev (to install Babel CLI locally in the project)
      - npm install babel-preset-es2015 --save-dev 
#### 3. Add build command to scripts in package.json 
      - "build": "babel js -d dist"
   This will set the project so that babel can convert any code written in es6(**js/**) to javascript code(**dist/**).

#### 4.Create .babelrc and add contents as: { "presets": ["es2015"] } to specify the version of es6
      - This will set *preset* plugin of babel to es2015.
      
Now, you can check if your **babel** is working or not. Add some es6 code in **js/main.js** and run **npm run build** in your project's root directory. A vanilla javascript file will be created by babel in your **dist** directory after converting es6 file.

------
## How to run the project:
      - Download the zip or fork the porject
      - run index.html
------

## Live here : https://ashutosh-sharma.github.io/student-portal-es6
