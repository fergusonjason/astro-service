import {IMongoQuery} from "../model/MongoQuery";


export const getQueryString = (url : string) : string => {

    const pos : number = url.indexOf("?") + 1;
    const queryString : string = url.slice(pos);

    return queryString;
};

// this is based on https://github.com/vasansr/query-params-mongo, but I felt that
// the filter variables should be the ones to have the prefix, which is the reverse
// of that library
export const parseUrl = (input : string) : IMongoQuery => {

    const params : string[] = input.split("&");
    const result : IMongoQuery = {};

    params.forEach((item) => {
        if (item.startsWith("sort")) {
            const op : string[] = item.split("=");
            let sortDir : number = 1;
            if (op[1].startsWith("-")) {
                sortDir = -1;
                op[1] = op[1].slice(1);
            }

            result.sort = {
                [op[1]] : sortDir
            };
        }

        if (item.startsWith("limit")) {
            const op : string[] = item.split("=");
            result.limit = parseInt(op[1], 10);
        }

        if (item.startsWith("offset")) {
            const op : string[] = item.split("=");
            result.offset = parseInt(op[1], 10);
        }

        // format of filter: filter_(field)_(op)_(value)
        if (item.startsWith("filter")) {

            if (typeof result.filter === "undefined") {
                result.filter = {};
            }

            let op : string[] = item.split("_");
            op = op.slice(1); // cut off "filter"

            if (!op[1].startsWith("$")) {
                op[1] = "$" + op[1];
            }

            if (op[1] === "$eq" || op[1] === "$=") {
                const convOp : number = +op[2];
                if (!isNaN(convOp)) {
                    result.filter[op[0]] = convOp;
                } else {
                    result.filter[op[0]] = op[2];
                }

            } else {
                result.filter[op[0]] = {[op[1]] : op[2] };
            }

        }
    });
    return result;
};