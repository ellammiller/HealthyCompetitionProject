import {NextFunction, Request, Response} from "express";
import {
    findOneWrapper,
    findWrapper,
    insertOneWrapper,
    mongoConnectWrapper,
    updateManyWrapper,
    updateOneWrapper,
    MongoCRUDFunction,
    MongoManyCRUDParams,
    MongoSingleCRUDParams
} from "../database/mongo";



export async function gameController(req: Request, res: Response, next: NextFunction) {
    const {
        data,
        type,
        user
    } = req.body;



    let params = <MongoSingleCRUDParams | MongoManyCRUDParams> {
        collection: 'games',
    };


    let f: MongoCRUDFunction;
    if (type === 'insert-one') {
        f = insertOneWrapper;
        params = {
            ...params,
            data,
            filter: {},
        }
    } else if (type === 'find-one') {
        f = findOneWrapper;
        params = {
            ...params,
            data: {},
            filter: {
                id: data.id
            },
            options: {
                '_id': 0
            }
        }
    } else if (type === 'update-one') {
        //we use this to update the userEntries for a user
        f = updateOneWrapper;
        params = {
            ...params,
            data: {
                $push: {
                    'users.$.values': data.newEntry
                }
            },
            filter: {
                id: data.id,
                'users.id': user
            }
        }
    } else if (type === 'find-many') {
        f = findWrapper;
        params = {
            ...params,
            filter: {
                id: {
                    $in: data //this is an array of strings of game ids
                }
            },
            options: {
                '_id': 0
            }
        }

    } else {
        res.sendStatus(400);
        throw new Error('Invalid type in request');
    }



    const result = await mongoConnectWrapper({
        CRUDFunction: f,
        params
    });


    res.status(200).send({data: result});
}
