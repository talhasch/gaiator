# Gaiator

Bulk <a href="https://github.com/blockstack/gaia">gaia</a> operations.

## Installation 

`npm install -g gaiator`

### Usage

`gaiator --pk APPPRIVATEKEY --if /path/to/input/file.json --of /path/to/output/file.json --cc 2`

#### CLI Arguments

<table>
<tr>
<th>Name</th>
<th>Explanation</th>
<th>Default value</th>
</tr>
<tr>
<td>--pk</td>
<td>app private key</td>
<td>-</td>
</tr>
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
[
   {
      "action":"put",
      "name":"foo.jpg",
      "path":"/Users/talhasch/Desktop/images/foo.jpg",
      "encrypt":false,
      "sign":false
   },
   {
      "action":"put",
      "name":"bar.txt",
      "path":"/Users/talhasch/Desktop/images/bar.txt",
      "encrypt":true,
      "sign":false
   },
   {
      "action":"del",
      "name":"baz.png",
      "wasSigned":false
   }
]
```

### Output file example

```
{
   "foo.jpg":"https://gaia.blockstack.org/hub/1KsEq6grFXXXX7LzoMU9tzSrFUTxaN6di9/foo.jpg",
   "bar.txt":"https://gaia.blockstack.org/hub/1KsEq6grFXXXX7LzoMU9tzSrFUTxaN6di9/bar.txt",
   "baz.png":true
}
```

**rv represents operation result. if rv is false that means operation wasn't successful.**
