import mongoose from "mongoose";
import winston, { format } from "winston";
import fs from "fs";
import AdmZip from "adm-zip";
import stream from "stream";
import papaparse from "papaparse";

const logger : winston.Logger = winston.createLogger({
    level : "debug",
    format : format.combine(format.colorize(), format.simple()),
    transports : [new winston.transports.Console()]
});

const hdFile : string = "../resources/hd.tsv.zip";

const mongoUri : string = "mongodb://localhost:27017/astro";
mongoose.connect(mongoUri);

const importHd = async () : Promise<void> => {

    logger.debug("Importing HD Catalog");

    interface IHd  {

        RAJ2000 : number;
        DEJ2000 : number;
        HD : number;
        DM : string;
        RAB1900 : string;
        DEB1900 : string;
        qPtm : string;
        Ptm : number;
        nPtm : string;
        qPtg : number;
        Ptg : number;
        nPtg : string;
        SpT : string;
        intensity : number;
        Rem : string | null;
        RAicrs : string;
        DEicrs : string;
    }

    const schema : mongoose.Schema = new mongoose.Schema({
        RAJ2000    :  {type : Number, required : true},
        DEJ2000    :  {type : Number, required : true},
        HD         :  {type : Number, required : true, unique: true, index: true},
        DM         :  {type : String, required : true},
        RAB1900    :  {type : String, required : true},
        DEB1900    :  {type : String, required : true},
        qPtm       :  {type : String, required : true},
        Ptm        :  {type : Number, required : true},
        nPtm       :  {type : String, required : true},
        qPtg       :  {type : Number, required : true},
        Ptg        :  {type : Number, required : true},
        nPtg       :  {type : String, required : true},
        SpT        :  {type : String, required : true},
        intensity  :  {type : Number, required : true},
        Rem        :  {type : String, required : false},
        RAicrs     :  {type : String, required : true},
        DEicrs     :  {type : String, required : true},
    });

    const hdModel : mongoose.Model<mongoose.Document> = mongoose.model("hd", schema);

    const startTime : number = Date.now();

    const hdFileExists : boolean = fs.existsSync(hdFile);
    if (hdFileExists === false) {
        logger.debug("Hd file does not exist, aborting");
        return;
    } else {
        logger.debug("Found hd file, continuing");
    }

    const originalCollectionSize : number = await hdModel.collection.countDocuments();
    logger.debug(`HD Collection size: ${originalCollectionSize}`);
    if (originalCollectionSize > 0) {
        logger.debug("Collection already exists, dropping and starting over");
        await hdModel.collection.drop();
    } else {
        logger.debug("No collection found, importing");
    }

    let zip : AdmZip;

    try {
        zip = new AdmZip(hdFile);
    } catch (err) {
        logger.error(`Caught error creating AdmZip: ${JSON.stringify(err)}`);
        return;
    }

    let hdArray : IHd[] = [];

    const zipEntries : AdmZip.IZipEntry[] = zip.getEntries();
    zipEntries.forEach((item : AdmZip.IZipEntry) => {

        const buffer : Buffer = item.getData();
        const bufferStream : stream.PassThrough = new stream.PassThrough();
        bufferStream.end(buffer);

        papaparse.parse(bufferStream, {
            worker: true,
            step: (result : papaparse.ParseResult) : void => {
                const entry : string[] = result.data;
                const hd : IHd = {
                    RAJ2000: Number(entry[0]),
                    DEJ2000: Number(entry[1]),
                    HD : parseInt(entry[2], 10),
                    DM : entry[3].trim(),
                    RAB1900 : entry[4],
                    DEB1900 : entry[5],
                    qPtm : entry[6],
                    Ptm: Number(entry[7]),
                    nPtm: entry[8],
                    qPtg: Number(entry[9].trim()),
                    Ptg: Number(entry[10].trim()),
                    nPtg: entry[11],
                    SpT: entry[12].trim(),
                    intensity : Number(entry[13].trim()),
                    Rem : entry[14].trim() === "" ? null : entry[14],
                    RAicrs : entry[15],
                    DEicrs : entry[16]
                };

                hdArray.push(hd);
            },
            complete: (results : papaparse.ParseResult, file : File) : void => {

                hdModel.collection.insertMany(hdArray, (err : any, docs : any) => {
                    if (err) {
                        logger.error(`Error inserting documents: ${err}`);
                        logger.error(`HD array size: ${hdArray.length}`);
                    } else {

                        const endTime : Date = new Date();
                        const totalTime : number = endTime.valueOf() - startTime.valueOf();
                        logger.debug(`Documents successfully stored, total: ${docs.length}, total time (ms): ${totalTime}`);
                        process.exit(1);
                    }
                });
            }
        });
    });

};

importHd();