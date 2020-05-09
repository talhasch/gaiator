# Gaiator

Bulk <a href="https://github.com/blockstack/gaia">gaia</a> operations.

## Installation 

`npm install -g gaiator`

### Usage

`gaiator --if /path/to/input/file.json --of /path/to/output/file.json --cc 2`

#### CLI Arguments

<table>
<tr>
<td>--if</td>
<td>path of input file</td>
<td>-</td>
</tr>
<tr>
<td>--if</td>
<td>path of output file</td>
<td>-</td>
</tr>
<tr>
<td>--cc</td>
<td>concurrency</td>
<td>2</td>
</tr>
</table>


### Input file template

Currently there are 2 types of operations are supported. `putFile` and `deleteFile`.

```
{
   "privateKey":"app-private-key",
   "tasks":[
      {
         "action":"put",
         "name":"foo.jpg",
         "path":"/Users/talhasch/Desktop/images/foo.jpg",
         "encrypt":false,
         "sign":false,
         "contentType":"image/jpeg"
      },
      {
         "action":"put",
         "name":"bar.txt",
         "path":"/Users/talhasch/Desktop/images/bar.txt",
         "encrypt":true,
         "sign":false,
         "contentType":"text/plain"
      },
      {
         "action":"del",
         "name":"baz.png",
         "wasSigned":false
      }
   ]
}
```

### Output file example

```
{
   "publicKey": "public-key-from-private-key-given",
   "address": "address-from-public-key",
    result: {
        "foo.jpg":"https://gaia.blockstack.org/hub/1KsEq6grFXXXX7LzoMU9tzSrFUTxaN6di9/foo.jpg",
        "bar.txt":"https://gaia.blockstack.org/hub/1KsEq6grFXXXX7LzoMU9tzSrFUTxaN6di9/bar.txt",
        "baz.png":true
    }
}
```

**if value of a result item is "false", that means operation wasn't successful.**
