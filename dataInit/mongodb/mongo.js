"use strict";

// I like "yes" more than "no", so I like this better than !isNaN()
function isNumeric(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

// okay, yes, I know, one function, one job, this should be "trimCollection()"
// and convertBlankStringsToNull()
function fixCollection(collectionName) {
    let counter = 0;
    let opArray = [];
    db[collectionName].find().forEach((doc) => {

        let docId = doc._id;
        let fields = Object.keys(doc);

        fields.forEach((field) => {
            if (typeof doc[field] === "string") {
                doc[field] = doc[field].trim();
            }

            if (isNumeric(doc[field])) {
                doc[field] = parseFloat(doc[field]);
            }

            // this converts to null b/c if I want to write a service with an ORM tool,
            // I don't want it to blow up if a field doesn't exist
            if (doc[field] === "") {
                doc[field] = null;
            }

            if (doc.Simbad) {
                delete doc.Simbad;
            }

            if (doc.Tycho) {
                delete doc.Tycho;
            }
        });

        // strip the id from the version I'm going to replace with to avoid
        // potential conflict
        let newDoc = doc;
        delete newDoc._id;

        let op = { replaceOne: {
            "filter" : { "_id" : docId},
            "replacement" : newDoc
        } };

        opArray.push(op);
        counter++;

        // group into batches for efficiency, but not TOO big of a batch so that I don't
        // run out of memory
        if (counter % 1000 === 0) {
            db[collectionName].bulkWrite(opArray);
            opArray = [];
        }
    });
    db[collectionName].bulkWrite(opArray);
    opArray = [];
}



// group all of the RA/Dec fields into a single object
function groupLocations(collectionName, epoch, raField, deField) {

    if (!collectionName || collectionName == null) {
        return;
    }

    if (!epoch || epoch == null) {
        return;
    }

    if (!raField || raField == null) {
        return;
    }

    if (!deField || deField == null) {
        return;
    }

    var opArray = [];
    var counter = 0;
    db[collectionName].find().forEach((doc) => {

        var docId = doc._id;

        if (!doc.coordinates) {
            doc.coordinates = {};
        }

        if (!doc.coordinates[epoch]) {
            doc.coordinates[epoch] = {};
        }

        doc.coordinates[epoch].RA = doc[raField];
        doc.coordinates[epoch].DE = doc[deField];

        var newDoc = doc;
        delete newDoc._id;

        delete newDoc[raField];
        delete newDoc[deField];

        let op = { replaceOne: {
            "filter" : { "_id" : docId},
            "replacement" : newDoc
        } };

        opArray.push(op);

        if (counter % 1000 === 0) {
            if (counter % 1000 === 0) {
                db[collectionName].bulkWrite(opArray);
                opArray = [];
            }
        }
    });
    db[collectionName].bulkWrite(opArray);
    opArray = [];
}

function createCrossReference(collectionName, fields) {

    if (!collectionName || collectionName == null) {
        return;
    }

    if (!fields || fields === null || !Array.isArray(fields)) {
        return;
    }

    var opArray = [];
    var counter = 0;
    db[collectionName].find().forEach((doc) => {

        let docId = doc._id;

        if (!doc.xref) {
            doc.xref = {};
        }

        let newDoc = doc;
        delete newDoc._id;

        fields.forEach((field) => {
            if (doc[field] !== null) {
                newDoc.xref[field] = doc[field];
            }
            delete newDoc[field];
        });

        let op = { replaceOne: {
            "filter" : { "_id" : docId},
            "replacement" : newDoc
        } };

        opArray.push(op);
        counter++;

        if (counter % 1000 === 0) {
            if (counter % 1000 === 0) {
                db[collectionName].bulkWrite(opArray);
                opArray = [];
            }
        }
    });
    db[collectionName].bulkWrite(opArray);
    opArray = [];
}

function fixDm(collectionName) {

    let opArray = [];
    let counter = 0;
    db[collectionName].find().forEach((doc) => {

        if (doc.DM) {
            let docId = doc._id;

            let newDoc = doc;
            delete newDoc._id;

            newDoc.DM = newDoc.DM.replace(/\s+/g," ");

            let op = { replaceOne: {
                "filter" : { "_id" : docId},
                "replacement" : newDoc
            } };

            opArray.push(op);
            counter++;

            if (counter % 1000 === 0) {
                db[collectionName].bulkWrite(opArray);
                opArray = [];
            }
        }

    });

    db[collectionName].bulkWrite(opArray);
    opArray = [];
}


// commands

// hd (has no cross ref fields)
fixCollection("hd");
groupLocations("hd", "B1900", "RAB1900", "DEB1900");
groupLocations("hd", "ICRS", "_RAicrs", "_DEicrs");
db.hd.createIndex({"HD":1});

db.hd.update({}, {$unset: {q_Ptm: 1}}, false, true);
db.hd.update({}, {$unset: {n_Ptm: 1}}, false, true);
db.hd.update({}, {$unset: {n_Ptg: 1}}, false, true);
db.hd.update({}, {$rename : {"SpT":"SpectralType"}}, false, true);
db.hd.update({}, {$rename : {"Int":"intensity"}}, false, true);

// yale
fixCollection("yale");
groupLocations("yale", "J2000", "RAJ2000", "DEJ2000");
createCrossReference("yale",["HD","SAO","ADS","VarID"]);
db.yale.update({}, {$rename : {"SpType":"SpectralType"}}, false, true); // standardize Sp field name to SpT
db.yale.update({}, {$rename : {"Vmag":"VisualMagnitude"}}, false, true);
db.yale.update({}, {$rename : {"Name":"name"}}, false, true);
db.yale.createIndex({"HR":1});

// ngc2000
fixCollection("ngc2000");
groupLocations("ngc2000", "B2000", "RAB2000", "DEB2000");
db.ngc2000.update({}, {$rename : {"Name":"name"}}, false, true);
db.ngc2000.update({}, {$rename : {"Const":"constellation"}}, false, true);
db.ngc2000.update({}, {$rename : {"Type":"type"}}, false, true);
db.ngc2000.update({}, {$rename : {"mag":"magnitude"}}, false, true);
db.ngc2000.update({}, {$rename : {"Source":"source"}}, false, true);
db.ngc2000.update({}, {$unset: {l_size: 1}}, false, true);
db.ngc2000.createIndex({"Name" : 1});

// gliese
fixCollection("gliese");
groupLocations("gliese", "B1950", "RAB1950", "DEB1950");
groupLocations("gliese", "ICRS", "_RAicrs", "_DEicrs");
db.gliese.update({}, {$rename : {"Sp":"SpectralType"}}, false, true); // standardize Sp field name to SpT
db.gliese.update({}, {$rename : {"VMag":"VisualMagnitude"}}, false, true);
db.gliese.update({}, {$rename : {"RV":"RadialVelocity"}}, false, true);
db.gliese.createIndex({"Name" : 1});

// hipparcos
fixCollection("hipparcos");
groupLocations("hipparcos","ICRS","RAicrs","DEicrs");
db.hipparcos.update({}, {$rename: {"HIP":"ID"}}, false, true);
db.hipparcos.update({}, {$rename: {"B-V":"BV"}}, false, true);
db.hipparcos.update({}, {$rename: {"SpType":"SpectralType"}}, false, true);
db.hipparcos.update({}, {$rename : {"VMag":"VisualMagnitude"}}, false, true);
db.hipparcos.createIndex({"ID":1});

// boss
fixCollection("boss");
groupLocations("boss","B1950","RA1950","DE1950");
groupLocations("boss","ICRS","RAicrs","DEicrs");
db.boss.update({}, {$rename: {"GC":"ID"}}, false, true);
db.boss.createIndex({"ID":1});

// sao
fixCollection("sao");
groupLocations("sao","B1950","RAB1950","DEB1950");
groupLocations("sao","ICRS","RAicrs","DEicrs");
db.sao.update({}, {$rename: {"SAO":"ID"}}, false, true);
db.sao.update({}, {$rename: {"SpType":"SpectralType"}}, false, true);
db.sao.createIndex({"ID":1});

db.runCommand({compact: "hd"});
db.runCommand({compact: "yale"});
db.runCommand({compact: "ngc2000"});
db.runCommand({compact: "gliese"});
db.runCommand({compact: "hipparcos"});
db.runCommand({compact: "boss"});
db.runCommand({compact: "sao"});