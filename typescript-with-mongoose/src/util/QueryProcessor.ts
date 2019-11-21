import {IMongoQuery} from "../model/MongoQuery";
import { logger } from "./winston";
import querystring, { ParsedUrlQuery } from "querystring";


export const getQueryString = (url : string) : string => {

    const pos : number = url.indexOf("?") + 1;
    const queryString : string = url.slice(pos);

    return queryString;
};

// this is based on https://github.com/vasansr/query-params-mongo, but I felt that
// the filter variables should be the ones to have the prefix, which is the reverse
// of that library
//
// sample filter: http://localhost:3000/v1/hd/page?filter=id_eq_1
export const parseUrl = (url : string) : IMongoQuery => {

    logger.debug(`Entered parseUrl(), url: ${url}`);

    // process the URL into a ParsedUrlQuery
    const mongoQuery: IMongoQuery = {};
    let queryParams: ParsedUrlQuery;
    if (url.indexOf("?") > -1) {
        queryParams = querystring.parse(url.replace(/^.*\?/, ""));
    } else {
        return {};
    }

    // convert filter=(n)
    let filter : string | string[] = queryParams.filter;
    const allowedOperators : string[] = ["$eq", "$lt", "$lte", "$gt", "$gte"];
    if (filter) {
        // TODO: support > 1 filter
        if (Array.isArray(filter)) {
            filter = filter[0];
        }

        filter = filter.split("_");

        if (allowedOperators.indexOf(filter[1]) === -1) {
            // throw an exception
        }

        if (filter[2].match(/^[0-9]+/)) {
            mongoQuery.filter = {[filter[0]]: {[filter[1]] : parseInt(filter[2], 10)}};
        } else {
            mongoQuery.filter = {[filter[0]]: {[filter[1]] : filter[2]}};
        }

        logger.debug(`Filter: ${JSON.stringify(mongoQuery.filter)}`);

    }

    // convert sort=FIELD
    let sort : string | string[] = queryParams.sort;

    if (sort) {

        // for now, only allow one sort parameter
        if (Array.isArray(sort)) {
            sort = sort[0];
        }

        logger.debug(`Sort string: ${sort}`);
        let sortDir: number = 1;
        if (sort.startsWith("-")) {
            sortDir = -1;
            sort = sort.replace("-", "");
        }

        mongoQuery.sort = { [sort] : sortDir};
    } else {
        logger.debug("Using default sort");
        mongoQuery.sort = {ID : 1};
    }

    // convert limit=n
    let limit : string | string[] = queryParams.limit;
    if (limit) {
        // this should always only be one, but ignore all
        // but the first to be safe
        if (Array.isArray(limit)) {
            limit = limit[0];
        }

        mongoQuery.limit = +limit;
    } else {
        mongoQuery.limit = 20;
    }

    let offset : string | string[] = queryParams.offset;
    if (offset) {
        // again, there should one be one of these, but
        // to be safe just take the first
        if (Array.isArray(offset)) {
            offset = offset[0];
        }

        mongoQuery.offset = +offset;
    } else {
        mongoQuery.offset = 0;
    }

    return mongoQuery;
};

// export const parseUrl = (input : string) : IMongoQuery => {

//     const params : string[] = input.split("&");
//     logger.debug(`Params: ${JSON.stringify(params)}`);
//     const result : IMongoQuery = {};

//     params.forEach((item) => {

//         logger.debug(`Param: ${item}`);
//         // format: sort=(-)fieldname
//         if (item.startsWith("sort")) {
//             const op : string[] = item.split("=");
//             let sortDir : number = 1;
//             if (op[1].startsWith("-")) {
//                 sortDir = -1;
//                 op[1] = op[1].slice(1);
//             }

//             result.sort = {
//                 [op[1]] : sortDir
//             };
//         }

//         // format: limit=n
//         if (item.startsWith("limit")) {
//             const op : string[] = item.split("=");
//             result.limit = parseInt(op[1], 10);
//         }

//         // format: offset=n
//         if (item.startsWith("offset")) {
//             const op : string[] = item.split("=");
//             result.offset = parseInt(op[1], 10);
//         }

//         // format of filter: filter=(field)_(op)_(value)
//         if (item.startsWith("filter")) {

//             if (typeof result.filter === "undefined") {
//                 result.filter = {};
//             }

//             // break by =
//             let filterParams: string[] = item.split("=");
//             if (filterParams.length < 2) {
//                 return;
//             }

//             filterParams = filterParams.slice(1); // remove "filter";
//             const op: string[] = filterParams[0].split("_"); // split into components
//             if (!op[1].startsWith("$")) {
//                 op[1] = "$" + op[1];
//             }
//             result.filter[op[0]] = {[op[1]] : op[2] };

//             // let op : string[] = item.split("_");
//             // op = op.slice(1); // cut off "filter"

//             // if (!op[1].startsWith("$")) {
//             //     op[1] = "$" + op[1];
//             // }

//             // if (op[1] === "$eq" || op[1] === "$=") {
//             //     const convOp : number = +op[2];
//             //     if (!isNaN(convOp)) {
//             //         result.filter[op[0]] = convOp;
//             //     } else {
//             //         result.filter[op[0]] = op[2];
//             //     }

//             // } else {
//             //     result.filter[op[0]] = {[op[1]] : op[2] };
//             // }

//         }
//     });
//     return result;
// };