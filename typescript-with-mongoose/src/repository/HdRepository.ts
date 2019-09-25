// import {BaseRepository} from "./BaseRepository";
// import { HD, HdSchema } from "../model/HD";
// import { PagedDataRequest } from "../model/PagedDataRequest";
// import {logger} from "../util/winston";
// import AdmZip from "adm-zip";
// import * as stream from "stream";
// import * as readline from "readline";
// import * as config from "../../config/dev.json";
// import * as mongoose from "mongoose";
// import * as express from "express";
// import * as admZip from "adm-zip";
// import * as fs from "fs";
// import * as appRoot from "app-root-path";
// import * as papa from "papaparse";


// export class HdRepository extends BaseRepository<HD>  {

//     private static collectionName : string = "HD";
//     // private static dataSource : string = globalAny.__basedir + "/resources/hd.tsv.zip";
//     private static dataSource : string = appRoot + "/dist/resources/hd.tsv.zip";

//     private model = mongoose.model("HD", HdSchema);

//     private hdModel : mongoose.Model<HD & mongoose.Document>;

//     constructor() {
//         super();

//         this.hdModel = mongoose.model<HD & mongoose.Document>("HD", HdSchema);

//         this.initializeData();
//     }

//     public initializeData = async () : Promise<void> => {

//         let startTime : number = Date.now();

//         fs.exists(HdRepository.dataSource, (exists) => {
//             logger.debug(`Resource (${HdRepository.dataSource}) exists: ${exists}`);
//         });
//         const collectionSize : number = await this.count();
//         if (collectionSize === 0) {

//             logger.debug("Unzipping hd catalog (could take awhile)");

//             // this is gonna be a huge fricking array
//             const hdArray : HD[] = [];

//             let zip : AdmZip;

//             try {
//                 zip = new AdmZip(HdRepository.dataSource);
//             } catch (err) {
//                 logger.error(`Caught error creating AdmZip: ${JSON.stringify(err)}`);
//                 return;
//             }

//             // there should only be one zip entry
//             const zipEntries : AdmZip.IZipEntry[] = zip.getEntries();
//             zipEntries.forEach((item : AdmZip.IZipEntry) => {

//                 const buffer : Buffer = item.getData();
//                 const bufferStream : stream.PassThrough = new stream.PassThrough();
//                 bufferStream.end(buffer);

//                 papa.parse(bufferStream, {
//                     worker: true,
//                     step: (result : papa.ParseResult) : void => {
//                         const entry : string[] = result.data;
//                         const hd : HD = new HD({
//                             RAJ2000: entry[0],
//                             DEJ2000: entry[1],
//                             HD : parseInt(entry[2], 10),
//                             DM : entry[3],
//                             RAB1900 : entry[4],
//                             DEB1900 : entry[5],
//                             qPtm : entry[6],
//                             Ptm: entry[7],
//                             nPtm: entry[8],
//                             qPtg: entry[9],
//                             Ptg: entry[10],
//                             nPtg: entry[11],
//                             SpT: entry[12],
//                             intensity : entry[13],
//                             Rem : entry[14],
//                             RAicrs : entry[15],
//                             DEicrs : entry[16]
//                         });

//                         hdArray.push(hd);
//                     },
//                     complete: (results : papa.ParseResult, file : File) : void => {

//                         logger.debug(`Completed reading file, total results: ${hdArray.length}`);
//                         this.model.collection.insertMany(hdArray, (err : any, docs : any) => {
//                         if (err) {
//                             logger.error(`Error inserting documents: ${err}`);
//                             logger.error(`HD array size: ${hdArray.length}`);
//                         } else {
//                             logger.debug(`Documents successfully stored, total: ${docs.length}`);
//                         }
//                     });
//                     }
//                 });

//             });

//             const endTime : number = Date.now();
//             const totalTime : number = endTime - startTime;

//             logger.debug(`Total time: ${totalTime}`);
//         } else {
//             logger.debug("Not unzipping documents, collection exists");
//         }
//     }

//     public get = async (id : number): Promise<HD>  => {


//         const result : HD = await this.hdModel.find({HD: id});

//         return result;
//     }

//     public count =  async () => {

//         logger.debug("HdRepository: entered count()");

//         let count : number = 0;
//         try {
//             count = await this.hdModel.countDocuments({});
//         } catch (err) {
//             logger.error(`Error in count(): ${JSON.stringify(err)}`);
//             process.exit(1);
//         }

//         logger.info(`Total count: ${count}`);
//         return count;

//     }

//     public getAll(): HD[] {
//         throw new Error("Method not implemented.");
//     }

//     public getPage(pageRequest: PagedDataRequest): HD[] {
//         throw new Error("Method not implemented.");
//     }

// }