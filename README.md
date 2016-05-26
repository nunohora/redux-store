# README #

Repository that hosts common components used in web and mobile.

For now it holds the redux store and utils, such as api handling and form/regex field validation.

To use it in your project just import it like you would usually do.

Add it to your project

```
#!bash

$ npm install --save @come/redux-store

```

and then import it:

```
#!javascript

import { modules, validation } from '@come/redux-store'
```


### NOTE ###
You need to add the private registry to your npm for this to work

```
#!bash

npm adduser --registry http://npm.come.pt:4873

```