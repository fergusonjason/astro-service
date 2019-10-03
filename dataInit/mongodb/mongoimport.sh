#!/bin/bash
mongoimport --db astro --collection ngc2000 --type tsv ngc2000.tsv --headerline
mongoimport --db astro --collection hd --type tsv hd.tsv --headerline
mongoimport --db astro --collection yale --type tsv yale.tsv --headerline
mongoimport --db astro --collection gliese --type tsv gliese.tsv --headerline
mongoimport --db astro --collection crossindex --type tsv crossindex.tsv --headerline