import ClassificationResult from "./ClassificationResult";
import VerbatimStatus from "./VerbatimStatus";

export default interface Verbatim {
    _id : string;
    content : string;
    status : VerbatimStatus;
    year : number;
    created_at : Date;
    result? : ClassificationResult;
}