import ElemType from "@/core/foundation/ElemType";
import CalcContext from "@/core/foundation/CalcContext";

export default abstract class SkillOption {
    abstract getName(): String;
    abstract getSkillElemType(): ElemType;
    
    abstract prepare(ctx: CalcContext);
    abstract apply(ctx: CalcContext);
}