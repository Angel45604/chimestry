# alquimestry-db

## Usage

``` js
const setupDatabase = require('alquimestry-db')

setupDatabase(config).then(db => {
    const { User, Compound } = db

}).catch(err => console.error(err))
```