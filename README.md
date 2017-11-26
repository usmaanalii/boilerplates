# boilerplates

Holds different boilerplates to kickstart projects

- **Flask Babel** - Flask with babel transpiler via webpack, includes airbnb linting and async await on the frontend. Also has blueprints for better flask architecture, uses an older mysqlclient (due to work)
- **Flask Babel CSS** - Builds on `Flask Babel`, but has support for CSS modules, including the ability to handle multiple blueprint entries/exists for the CSS
- **Flask Babel SASS** - Builds on `Flask Babel CSS`, but has uses SASS instead of CSS, any CSS should be included via into the html templates via jinja (as I have done for `normalize.css`)