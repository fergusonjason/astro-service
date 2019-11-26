import { IFilter, ISort } from "../model/MongoQuery";
import { logger } from "./Logger";

const filterRegex : RegExp = new RegExp(/^([A-Za-z0-9]+)_(\$[A-Za-z0-9]+)_([A-Za-z0-9.-]+)/);
const numericRegex : RegExp = new RegExp(/^[0-9]+/);
const alphaNumbericRegex: RegExp = new RegExp(/^[+-]?[0-9A-Za-z]+$/);

const allowedNumericOps : string[] = ["$eq", "$ne", "$gt", "$gte", "$lt", "$lte"];
const allowedStringOps : string[] = ["$eq", "$ne"];

/**
 * Test if a filter parameter is in the format:
 *
 *     param_$op_value
 *
 * @param filterToTest single filter parameter to test
 * @returns   whether the filter parameter is valid
 */
export const isValidFilterParam = (filterToTest : string) : boolean => {

    if (filterToTest === "") {
        return false;
    }

    const matchesFormat : boolean = filterRegex.test(filterToTest);
    if (!matchesFormat) {
        return false;
    }

    const components : string[] = filterToTest.split("_");
    if (components.length !== 3) {

        return false;
    }

    let validOp: boolean = false;
    if (isNaN(+components[2])) {
        validOp = (allowedStringOps.indexOf(components[1]) > -1);
    } else {
        validOp = (allowedNumericOps.indexOf(components[1]) > -1);
    }

    if (!validOp) {
        return false;
    }

    return true;

};

/**
 * Test if a sort parameter is valid
 *
 * @param sortParam single sort parameter to test
 * @returns true if valid, false otherwise
 */
export const isValidSortParam = (sortParam: string) : boolean => {

    return alphaNumbericRegex.test(sortParam);

};

/**
 * Convert a filter from a URL query parameter to the IFilter interface
 *
 * @param filterParam a single, validated filter parameter to convert to a MongoDB operation
 * @returns  an IFilter object which can be used as part of a MongoDB query
 */
export const convertFilterParamToIFilter = (filterParam : string | string[]) : IFilter => {

    let filter: string[];
    if (Array.isArray(filterParam)) {
        filter = filterParam[0].split("_");
    } else {
        filter = filterParam.split("_");
    }

    let result : IFilter;
    if (numericRegex.test(filter[2])) {
        result = {[filter[0]]: {[filter[1]] : parseInt(filter[2], 10)}};
    } else {
        result = {[filter[0]]: {[filter[1]] : filter[2]}};
    }

    return result;
};

/**
 * Convert a sort param to the ISort interface
 *
 * @param sortParam a single, validated sort parameter
 * @returns an ISort object which can be used as part of a MongoDB query
 */
export const convertSortParamToISort = (sortParam : string | string[]) : ISort  => {

    let result: ISort = {};

    let sort: string;
    if (Array.isArray(sortParam)) {
        sort = sortParam[0];
    } else {
        sort = sortParam;
    }

    let sortDir: number = 1;
    if (sort.startsWith("-")) {
        sortDir = -1;
        sort = sort.replace("-", "");
    } else if (sort.startsWith("+")) {
        sort = sort.replace("+", "");
    }

    result = { [sort] : sortDir};

    logger.debug(`Sort object: ${JSON.stringify(result)}`);
    return result;

};