# Gaiator

Bulk gaia operations.

## Installation 

`npm install -g gaiator`

### Usage

`gaiator --pk APPPRIVATEKEY --of /path/to/input/file.json --op /path/to/output/file.json`

### Input file template

Currently there are 2 types of operations are supported. `putFile` and `deleteFile`.

```
[
   {
      "id":1,
      "action":"put",
      "path":"/Users/talhasch/Desktop/images/foo.jpg",
      "name":"foo.jpg",
      "encrypt":false,
      "sign":false
   },
   {
      "id":2,
      "action":"put",
      "path":"/Users/talhasch/Desktop/images/bar.txt",
      "name":"bar.txt",
      "encrypt":true,
      "sign":false
   },
   {
      "id":3,
      "action":"del",
      "name":"baz.png",
      "wasSigned":false
   }
]
```

### Output file example

```
[
   {
      "id":1,
      "rv":"https://gaia.blockstack.org/hub/1KsEq6grFXXXX7LzoMU9tzSrFUTxaN6di9/foo.jpg"
   },
   {
      "id":2,
      "rv":"https://gaia.blockstack.org/hub/1KsEq6grFXXXX7LzoMU9tzSrFUTxaN6di9/bar.txt"
   },
   {
      "id":3,
      "rv":true
   }
```

**rv represents operation result. if rv is false this means operation wasn't successful.**
