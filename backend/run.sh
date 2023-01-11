#!/bin/bash
# ./run.sh <env file suffix>
filename=".env.$1"
echo "reading $filename"
while read line; do
    # reading each line
    echo "exporting $line"
    export $line
done < $filename

echo "starting server"
go run cmd/api/main.go
