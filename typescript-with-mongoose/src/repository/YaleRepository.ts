import { IYale, YALE_MODEL } from "../model/Yale";
import { BaseRepository } from "./BaseRepository";
import { IQueryObj } from "./QueryObj";
import { logger } from "../util/winston";

export class YaleRepository extends BaseRepository<IYale> {

    constructor() {
        super(YALE_MODEL, "YaleRepository");
    }

    public getByNaturalId = async (id : string | number): Promise<IYale | null> => {

        logger.debug(`YaleRepository: entered getById(), id: ${id}`);

        return await this._model.findOne({HR : id});
    }

    // public getPage = async (start : number, pageSize : number, field? : string, sortDir? : number,
    //                         filterOp? : string, filterVal? : string | number) : Promise<IYale[]> => {

    //     logger.debug(`YaleRepository: entered getPage(): start: ${start}, pageSize: ${pageSize},
    //         field: ${field}, sortDir: ${sortDir}`);

    //     if (!field) {
    //         logger.debug("No field specified, using HR");
    //         field = "HR";
    //     }

    //     if (!sortDir) {
    //         sortDir = 1;
    //     }

    //     const findObj : IQueryObj = {};
    //     const sortObj : IQueryObj = {};
    //     const mongoOp : string = "$" + filterOp;
    //     if (filterOp && filterVal) {

    //         sortObj[field] = sortDir;

    //         switch (filterOp) {
    //             case "startsWith" :
    //                 const regexp : RegExp = new RegExp("^" + filterVal);
    //                 findObj[field] = { $regex : regexp};
    //                 break;
    //             default:
    //                 findObj[field] = { [mongoOp] : filterVal };
    //         }
    //     }

    //     // logger.debug(`Findobj: ${JSON.stringify(findObj)}, sortobj: ${JSON.stringify(sortObj)}`);

    //     return await this._model.find(findObj).sort(sortObj).skip(start)
    //         .limit(pageSize).exec();
    // }
}
