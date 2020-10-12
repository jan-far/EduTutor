# EduTutor *:rocket:*
Learn, Teach and Interact with students: Education Tutor 


### Instructions

#### General

-  Create a branch off the **develop** branch and do not push directly to it (the **develop** branch)
-  Always raise a PR against the **develop** branch and during each PR, please include comments or descriptions. A template is given below:

> **ABOUT PR**
>
> This PR gives users the ability to register as farmers or as customers/consumers.
>
> **RELEVANT FILES**
>
> auth.js
>
> **ISSUE**
>
> $Issue_Number

### Coding conventions

###### Classes

Classes should be defined and implemented in the following format:

**Generally**

```js
export class SomeClass {
 someFunction() {
  console.log("This is some function. Some function I tell thee.");
 }
}
```

**Controller Classes**

```js
export class SomeControllerClass {
 static async someControllerFunction() {
  try {
   console.log("some controller function.");
  } catch (error) {
   console.log("Error message.");
  }
 }
}
```

**NB:** 

* Controller functions should be `async` (i.e Promises within a controller function would be resolved using `await`)
* Controller functions should be static (i.e They should be directly called with no need to create an instance of the implementing class).

###### Exports and modules

* Classes should not be exported as default
* A function should be exported as default only if it is the only member of a Javascript file. Example is given below.

```js
// function.js
export default () => {
 console.log("I am a lonely function. Care to cuddle me to happiness?");
};
```
* The members of each files within a folder should all be exported via an `index.js` file within that folder so they can be imported elsewhere from the root (the containing folder). Example below

```js
// folder > file1.js
export class File1Class {
}
```

```js
// folder > file2.js
export class File2Class {
}
```

```js
// folder > index.js
export * from "./file1";
export * from "./file2";
```

```js
// anotherfolder > file.js
import { File1Class, File2Class } from "../folder";
```

###### API Responses

API responses should be in the following format:

```js
res.status(200).json({
 statusCode: 200,
 response: "Hello Earth!"
});
```

* #### Happy coding! 