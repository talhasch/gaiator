# Gaiator

Order based gaia operations.

## Installation 

npm install -g gaiator

### Usage

`gaiator --pk APPPRIVATEKEY --of /path/to/order/file.json `

### Order file template

Currently there are 2 types of operations are supported. `putFile` and `deleteFile`.

### Order file template

```
[
 {
    "id": 1,
    "action": "put",
    "path": "/Users/talhasch/Desktop/images/foo.jpg",
    "name": "foo.jpg",
    "encrypt": false,
    "sign": false
  },
  {
    "id": 2,
    "action": "put",
    "path": "/Users/talhasch/Desktop/images/bar.txt",
    "name": "bar.txt",
    "encrypt": true,
    "sign": false
  },
  {
    "id": 3,
    "action": "del",
    "name": "baz.png",
    "wasSigned": false
  }
]
```
