import { ObjectId } from "mongoose";

class CampusModel {
    constructor(
        public cidade: string,
        public telefone: string,
        public curso?: ObjectId[],
        public _id?: string
    ){}
}

export default CampusModel;