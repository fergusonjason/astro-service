import { IYale, YALE_MODEL } from "../model/Yale";
import { BaseRepository } from "./BaseRepository";
import { IQueryObj } from "./QueryObj";
import { logger } from "../util/winston";

export class YaleRepository extends BaseRepository<IYale> {

    constructor() {
        super(YALE_MODEL);
    }

    public getById = async (id : string | number): Promise<IYale | null> => {

        logger.debug(`YaleRepository: entered getById(), id: ${id}`);
        return await this._model.findOne({HR : id});
    }

    public getPage = async (start : number, pageSize : number, field? : string, sortDir? : number)
        : Promise<IYale[]> => {

        logger.debug(`YaleRepository: entered getPage(), start: ${start}, pageSize: ${pageSize}, field: ${field}, sortDir: ${sortDir}`);

        if (!field) {
            field = "HR";
        }

        if (!sortDir) {
            sortDir = 1;
        }

        let findObj : IQueryObj = {};
        let sortObj : IQueryObj = {};
        switch (field) {
            case "HR":
                findObj = {
                    HR : { $gte : start }
                };
                sortObj = {
                    HR : sortDir
                };
                break;
            case "VMag":
                findObj = {
                    VMag : { $gte : start }
                };
                sortObj = {
                    VMag : sortDir
                };
                break;
            case "BV":
                findObj = {
                    BV : { $gte : start }
                };
                sortObj = {
                    BV : sortDir
                };
                break;
        }

        return await this._model.find(findObj).sort(sortObj).skip(start)
            .limit(pageSize).exec();
    }
}
