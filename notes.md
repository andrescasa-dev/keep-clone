# Communicate between functions of different event

# 1 throw html
see the functions open modal and close modal
the modal works as a bridge between the to functions.
  1. click note => the modal is opened
     1. the information of the note is set with dataSet in the modal in order to work later
  2. click close => edit the note with the using the modal information.
     1. the note can be found using modal.dataSet.id

# ++ is a modifier function
when we use `object.prop++` we are incrementing the property,

## avoid modifying a property
we need to use `object.prop + 1`.

# working with local storage
## save information
ge save information as string using 

```js
windows.localstorage.setItem('key', JSON.stringify(object))
```

> if the object is an instance of a class, stringify covert the instance into a object literal, it means, we only have the own properties.

## pull information

```js
const myVar = JSON.parse(windows.localstorage.getItem('key')) || []
```
if we have stored instances of classes we need to create them again

```js
const myVar = JSON.parse(windows.localstorage.getItem('key')).map(objeLiter => new MyObject(objeLiter)) || [];
```