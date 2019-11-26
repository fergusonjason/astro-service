
export interface IMongoQuery {
    sort?: ISort;
    filter?: IFilter;
    limit?: number;
    offset?: number;
}

/**
 * Simple interface to make Typescript stop bitching when it doesn't recognize a key on an object
 */
export interface IKeyValue {
    [property : string] : any ;
}

export interface IFilter {
    [property : string] : IKeyValue;
}

export interface ISort {
    [property : string] : number;
    // sort: IKeyValue;
}