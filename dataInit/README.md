# dataInit

These are my database init scripts (.sql and .js (mongo)) and the actual original TSV files.

## tsv

Zip file containing the TSV files to be imported.

## mongodb

Two files here:

- mongoimport.sh - bash script to run the mongoimport commands to bring in the TSV files
- mongo.js - mongodb shell scripts to mangle the data into shape once imported

## Importing data

Unzip the tsv.zip file and run the mongoimport.sh script from the directory you extracted them
to.

## Coming Soon

I'll be creating Postgres init stuff soon* and possibly MariaDB.