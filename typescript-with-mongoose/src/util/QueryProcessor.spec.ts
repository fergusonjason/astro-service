import { parseUrl } from "./QueryProcessor";
import { IMongoQuery} from "../model/MongoQuery";
import { expect } from "chai";
import mocha from "mocha";

describe("Query Processor", () => {

    it("correctly processes a sort", () => {

        const urlString : string = "sort=name";
        const result : IMongoQuery = parseUrl(urlString);

        expect(typeof result).to.equal("object");

        expect(result.sort).to.eql({name: 1});

    });

    it("correctly processes a limit", () => {

        const urlString : string = "limit=20";
        const result : IMongoQuery = parseUrl(urlString);

        expect(typeof result).to.equal("object");
        expect(result.limit).to.equal(20);

    });

    it("correctly processes an offset", () => {

        const urlString : string = "offset=20";
        const result : IMongoQuery = parseUrl(urlString);

        expect(typeof result).to.equal("object");
        expect(result.offset).to.equal(20);
    });

    it ("correctly processes a query string without a filter", () => {

        const urlString : string = "sort=name&limit=20&offset=20";
        const result : IMongoQuery = parseUrl(urlString);

        expect(typeof result).to.equal("object");

        expect(result.sort).to.eql({name: 1});
        expect(result.limit).to.equal(20);
        expect(result.offset).to.equal(20);
    });

    it("correctly processes a filter", () => {

        const urlString : string = "filter_name_eq_John";
        const result : IMongoQuery = parseUrl(urlString);

        expect(typeof result).to.equal("object");

        expect(typeof result.filter).to.equal("object");
        expect(result.filter.name).to.equal("John");
    });

    it("correctly processes multiple filters", () => {

        const urlString : string = "filter_name_eq_John&filter_age_eq_21";
        const result : IMongoQuery = parseUrl(urlString);

        expect(typeof result).to.equal("object");
        expect(result.filter.name).to.equal("John");
        expect(result.filter.age).to.equal(21);
    });

    it("correctly processes a complex string", () => {

        const urlString : string = "sort=name&limit=20&offset=20&filter_name_eq_John&filter_age_eq_21";
        const result : IMongoQuery = parseUrl(urlString);

        expect(typeof result).to.equal("object");

        expect(result.sort).to.eql({name: 1});
        expect(result.limit).to.equal(20);
        expect(result.offset).to.equal(20);
        expect(result.filter.name).to.equal("John");
        expect(result.filter.age).to.equal(21);

    });

    it("corrected processes a descending sort", () => {
        const urlString : string = "sort=-name";
        const result : IMongoQuery = parseUrl(urlString);

        expect(typeof result).to.equal("object");

        expect(result.sort).to.eql({name: -1});
    });
});